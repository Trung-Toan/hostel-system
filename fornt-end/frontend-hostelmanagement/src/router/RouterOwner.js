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
  return (
    <Routes>
      <Route path="/" element={<HomeMangement />}>
        <Route index element={<ViewListHostel />} />
        <Route path="create-hostel" element={<AddNewHostel />} />
        <Route path="edit-hostel" element={<EditHostel />} />
        <Route path='room' element = {<ViewListRoom />} />
        <Route path='room_detail' element = {<ViewDetailRoom/>} />
        <Route path='create_room' element = {<AddNewRoom/>} />
      </Route>
    </Routes>
  );
};

export default memo(RouterOwner);
