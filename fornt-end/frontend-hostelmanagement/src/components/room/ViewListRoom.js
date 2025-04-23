import React, { memo } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Badge,
  Button,
  Spinner,
  Dropdown,
} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { useGetRoomByHostelId } from "../../controller/RoomController";

const ViewListRoom = ({ statusMapping }) => {
  const { state } = useLocation();

  const hostel = state?.hostel;

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data, isLoading } = useGetRoomByHostelId(hostel?.id);

  const roomList = data?.data?.result;

  const { mutate } = useMutation({
    mutationFn: (payload) =>
      axios.put(`http://localhost:9999/room/${payload.id}`, payload),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Change status room is successfully!",
        timer: 3000,
        showConfirmButton: true,
      });
      queryClient.refetchQueries(["room"]);
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.message || "An error occurred!",
        timer: 3000,
        showConfirmButton: true,
      });
    },
  });

  const changeStatus = (room, toId) => {
    const updatedRoom = {
      ...room,
      status: toId,
    };
    mutate(updatedRoom);
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);

  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Container className="mt-5">
          <div className=" d-flex justify-content-between mb-4">
            <Button
              variant="outline-info"
              onClick={() => navigate(-1)}
              className=""
            >
              Trở về
            </Button>
            <Link to={"/owner/create_room/"} state={{hostel}} className="btn btn-success ">
              Tạo phòng trọ mới
            </Link>
          </div>
          <h3 className="text-center mb-4">Danh sách phòng</h3>
          <Row className="g-4 d-flex justify-content-center">
            {roomList && roomList.length > 0 ? (
              roomList?.map((room) => (
                <Col md={6} lg={3} key={room.id}>
                  <Card className="shadow-sm position-relative">
                    <Dropdown className="position-absolute top-0 end-0 m-2">
                      <Dropdown.Toggle
                        as="span"
                        id={`dropdown-room-${room.id}`}
                        role="button"
                        className="p-0 border-0"
                        style={{
                          cursor: "pointer",
                          boxShadow: "none",
                          fontSize: "1.5rem",
                          lineHeight: "0.5",
                        }}
                      >
                        ...
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          as={Link}
                          to={`/admin/room_detail/${room.id}`}
                        >
                          Chỉnh sửa
                        </Dropdown.Item>
                        {Object.values(statusMapping)?.map((s) => {
                          return (
                            <Dropdown.Item
                              onClick={() => changeStatus(room, s.id)}
                              className={`text-${s.color}`}
                            >
                              {s.label}
                            </Dropdown.Item>
                          );
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                    <Card.Img
                      variant="top"
                      src={room?.images[0]}
                      alt={room?.name}
                      style={{ height: "180px", objectFit: "cover" }}
                    />
                    <Card.Body>
                      <Card.Title>{room.name}</Card.Title>
                      <Card.Text>
                        <strong>Giá thuê:</strong> {formatCurrency(room.price)}{" "}
                        <br />
                        <strong>Diện tích:</strong> {room.area} m² <br />
                        <strong>Trạng thái:</strong>{" "}
                        <Badge
                          bg={
                            statusMapping[room.status]?.color ||
                            statusMapping.default.color
                          }
                        >
                          {statusMapping[room.status]?.label ||
                            statusMapping.default.label}
                        </Badge>
                      </Card.Text>
                      <div className="d-flex justify-content-center">
                        <Button
                          variant="primary"
                          size="sm"
                          as={Link}
                          to={`/owner/room_detail`}
                        >
                          Xem chi tiết
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p className="text-center">Danh sách trống!</p>
            )}
          </Row>
        </Container>
      )}
    </>
  );
};

export default memo(ViewListRoom);
