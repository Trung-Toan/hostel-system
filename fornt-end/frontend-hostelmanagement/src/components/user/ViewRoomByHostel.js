import React, { memo } from "react";
import { Container, Form, Spinner } from "react-bootstrap";
import { useGetRoomByHostelId } from "../../controller/RoomController";
import Swal from "sweetalert2";

const ViewRoomByHostel = ({
  handleChangeRoom,
  onBlur,
  isInvalid,
  rId,
  hId,
  mess,
}) => {
  // Fetch danh sách phòng dựa trên hostelId
  const {
    data: roomData,
    isLoading,
    error,
  } = useGetRoomByHostelId(hId, {
    enabled: !!hId,
  });
  const room = roomData?.data?.result;

  // Lọc ra danh sách phòng có trạng thái "active"
  const fiterRoom = room?.filter((r) => r.status === 1);

  if (isLoading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
        <p>Loading account list...</p>
      </Container>
    );
  }

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error || "An error occurred.",
      timer: 3000,
      showConfirmButton: true,
    });
  }

  return (
    <Form.Group>
      <Form.Select
        value={rId || ""}
        onBlur={onBlur}
        isInvalid={isInvalid}
        onChange={(e) => {
          const selectedRoomId = e.target.value;
          if (selectedRoomId !== rId) {
            handleChangeRoom(selectedRoomId);
          }
        }}
      >
        <option value="">Select a room</option>
        {fiterRoom?.map((r) => (
          <option key={r.id} value={r.id}>
            {r.name}
          </option>
        ))}
      </Form.Select>
      <Form.Control.Feedback type="invalid">{mess}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default memo(ViewRoomByHostel);
