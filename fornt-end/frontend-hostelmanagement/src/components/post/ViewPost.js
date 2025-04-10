import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { memo, useEffect, useState } from "react";
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
import { useGetPostList } from "../../controller/PostController";
import { useSessionStorage } from "../../ultil/useSessionStorage";

const ViewPort = () => {
  const { data, isLoading: loadingPost } = useGetPostList();
  const posts = data?.data?.result;
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => axios.delete(),
    onSuccess: () => {

      queryClient.invalidateQueries("post");
    },
    onError: () => {},
  });

  const user = useSessionStorage("user");

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
                <Link className="btn btn-warning" to={`/manager/edit/${p.id}`}>
                  Chỉnh sửa
                </Link>
                <Button variant="danger" size="sm" onClick={() => mutate(p.id)}>
                  {isLoading ? "Đang xoá..." : "Xóa"}
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
