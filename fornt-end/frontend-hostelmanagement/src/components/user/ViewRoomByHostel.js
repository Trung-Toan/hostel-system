import React, { memo } from "react";
import { Form } from "react-bootstrap";
import { useGetRoomByHostelId } from "../../controller/RoomController";

const ViewRoomByHostel = ({
  handleChangeRoom,
  account,
  accountId,
  hId,
  rId,
}) => {
  // Fetch danh sách phòng dựa trên hostelId
  const { data: roomData } = useGetRoomByHostelId(hId);
  const room = roomData?.data?.result;
  // Lọc ra danh sách phòng có trạng thái "active"
  const fiterRoom = room?.filter((r) => r.status === 1);

  return (
    <Form.Select
      aria-label="Default select example"
      onChange={(e) => {
        const selectedRoomId = e.target.value;
        if (selectedRoomId !== rId) {
          // Chỉ gọi handleChangeRoom khi ID phòng mới khác ID phòng hiện tại
          handleChangeRoom(account, accountId, selectedRoomId);
        }
      }}
    >
      {fiterRoom?.map((r) => (
        <option selected={r.id === rId} key={r.id} value={r.id}>
          {r.name}
        </option>
      ))}
    </Form.Select>
  );
};

export default memo(ViewRoomByHostel);