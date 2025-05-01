import React, { memo } from "react";
import { Route, Routes } from "react-router-dom";
import HomeMangement from "../components/home/HomeMangement";
import AddNewHostel from "../components/hostel/AddNewHostel";
import EditHostel from "../components/hostel/EditHostel";
import ViewListHostel from "../components/hostel/ViewListHostel";
import ViewListRoom from "../components/room/ViewListRoom";
import ViewDetailRoom from "../components/room/ViewDetailRoom";
import AddNewRoom from "../components/room/AddNewRoom";

const RouterOwner = () => {
  const statusMapping = {
    1: { id: 1, color: "success", label: "Occupied" },
    2: { id: 2, color: "info", label: "Deposited" },
    3: { id: 3, color: "danger", label: "Banned" },
    default: { id: 0, color: "secondary", label: "Vacant" },
  };  
  return (
    <Routes>
      <Route path="/" element={<HomeMangement />}>
        <Route index element={<ViewListHostel />} />
        <Route path="create-hostel" element={<AddNewHostel />} />
        <Route path="edit-hostel" element={<EditHostel />} />
        <Route path='room' element = {<ViewListRoom statusMapping = {statusMapping}/>} />
        <Route path='room_detail' element = {<ViewDetailRoom statusMapping = {statusMapping}/>} />
        <Route path='create_room' element = {<AddNewRoom/>} />
      </Route>
    </Routes>
  );
};

export default memo(RouterOwner);
