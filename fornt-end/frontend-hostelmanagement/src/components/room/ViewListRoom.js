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
import Swal from "sweetalert2";
import {
  updateRoom,
  useGetRoomByHostelId,
} from "../../controller/RoomController";

const ViewListRoom = ({ statusMapping }) => {
  const { state } = useLocation();

  const hostel = state?.hostel;

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data, isLoading } = useGetRoomByHostelId(hostel?.id);

  const roomList = data?.data?.result;

  const { mutate } = useMutation({
    mutationFn: (payload) => updateRoom(payload?.id, payload),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Room status changed successfully!",
        timer: 3000,
        showConfirmButton: true,
      });
      queryClient.refetchQueries([`rooms_hid${hostel?.id}`]);
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

  const changeStatus = (room, status) => {
    const updatedRoom = {
      ...room,
      status: status,
      hostel: hostel,
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
          <div className="d-flex justify-content-between mb-4">
            <Button
              variant="outline-info"
              onClick={() => navigate(-1)}
              className=""
            >
              Back
            </Button>
            <Link
              to={"/owner/create_room/"}
              state={{ hostel }}
              className="btn btn-success"
            >
              Create New Room
            </Link>
          </div>
          <h3 className="text-center mb-4">Room List</h3>
          <Row className="g-4 d-flex justify-content-center">
            {roomList && roomList.length > 0 ? (
              roomList?.map((room) => (
                <Col md={6} lg={3} key={room?.id}>
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
                        <Dropdown.Item as={Link} to={`/owner/room_detail`}>
                          Edit
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
                      src={room?.image?.split("|")[0] || ""}
                      alt={room?.name}
                      style={{ height: "180px", objectFit: "contain" }}
                    />
                    <Card.Body>
                      <Card.Title>{room?.name}</Card.Title>
                      <Card.Text>
                        <strong>Rental Price:</strong>{" "}
                        {formatCurrency(room.price)} <br />
                        <strong>Area:</strong> {room.area} m² <br />
                        <strong>Max occupants:</strong> {room.maxOccupants}{" "}
                        person <br />
                        <strong>Current occupants:</strong>{" "}
                        {room.currentOccupants} person <br />
                        <strong>Status:</strong>{" "}
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
                          state={{ room, hostel }}
                        >
                          View Details
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p className="text-center">List is empty!</p>
            )}
          </Row>
        </Container>
      )}
    </>
  );
};

export default memo(ViewListRoom);
