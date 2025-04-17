import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { memo } from "react";
import {
  Card,
  Row,
  Col,
  Image,
  Container,
  Spinner,
  Button,
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { deletePost, useGetPostList } from "../../controller/PostController";
import { useSessionStorage } from "../../ultil/useSessionStorage";
import Swal from "sweetalert2";

const ViewPort = () => {
  const { data, isLoading: loadingPost } = useGetPostList();
  const posts = data?.data?.result;
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (_, id) => {
       // Sử dụng `id` từ tham số truyền vào mutate
      queryClient.setQueryData(["posts"], (oldData) => {
        if (!oldData) return oldData; // Kiểm tra nếu oldData là undefined
        return {
          ...oldData,
          data: {
            ...oldData.data,
            result: oldData.data.result.filter((post) => post.id !== id),
          },
        };
      });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Post deleted successfully!",
        timer: 3000,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.message || "An unexpected error occurred",
        timer: 3000,
        showConfirmButton: false,
      });
    },
  });

  const user = useSessionStorage("user");
  const [deletingId, setDeletingId] = React.useState(null);

  return (
    <Container>
      {/* Nút Thêm mới bài viết */}
      <div
        className={`text-center my-4 ${
          user?.role !== "manager" ? "d-none" : ""
        }`}
      >
        <Link to={"add-new-post"} className="btn btn-success">
          New Post
        </Link>
      </div>
      {loadingPost ? (
        // Hiệu ứng loading khi chờ tải dữ liệu
        <div className="text-center mt-3">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : posts && posts.length > 0 ? (
        posts?.map((p) => (
          <Card
            key={p.id}
            className="my-4 border-0"
            style={{
              maxWidth: "600px",
              margin: "0 auto",
              boxShadow: "0 0 10px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Card.Body className={`p-3 `}>
              {/* Header */}
              <Row className="align-items-center mb-3">
                <Col>
                  <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                    {p.title}
                  </div>
                  <small className="text-muted">{p.createdAt}</small>
                </Col>
                <Col
                  xs="auto"
                  className={`${user?.role !== 2 ? "d-none" : ""}`}
                >
                  <Badge bg={p.status === 1 ? "success" : "secondary"}>
                    {p.status === 1 ? "Hoạt động" : "Không hoạt động"}
                  </Badge>
                </Col>
              </Row>

              {/* Content */}
              <Card.Text className="mb-3" style={{ fontSize: "1rem" }}>
                {p.content}
              </Card.Text>

              {/* Images */}
              {p.image && p.image.length > 0 && (
                <div className="d-flex flex-wrap justify-content-center mb-3">
                  <Image
                    src={p.image}
                    alt={p.title}
                    className="mb-2"
                    style={{
                      height: "300px",
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              )}
              {/* Action Buttons */}
              <div
                className={`d-flex ${
                  user?.role !== "manager" ? "d-none" : ""
                } justify-content-between`}
              >
                <Link
                  className="btn btn-warning" 
                  to="/manager/edit-post"
                  state={{post: p}}
                >
                  Chỉnh sửa
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    setDeletingId(p.id);
                    mutate(p.id, {
                      onSettled: () => setDeletingId(null),
                    });
                  }}
                >
                  {deletingId === p.id ? "Đang xoá..." : "Xóa"}
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p className="text-center mt-3">No have any post!</p>
      )}
    </Container>
  );
};

export default memo(ViewPort);
