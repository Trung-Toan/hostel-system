import React, { memo } from "react";
import { Route, Routes } from "react-router-dom";
import HomeMangement from "../components/home/HomeMangement";
import AddNewHostel from "../components/hostel/AddNewHostel";
import EditHostel from "../components/hostel/EditHostel";
import ViewListHostel from "../components/hostel/ViewListHostel";
import ViewListRoom from "../components/room/ViewListRoom";
import ViewDetailRoom from "../components/room/ViewDetailRoom";
import AddNewRoom from "../components/room/AddNewRoom";
import ViewListUltility from "../components/utility/ViewListUltility";
import CreateNewUltility from "../components/utility/CreateNewUltility";
import CreateAccount from "../components/user/CreateAccount";
import ViewListAccount from "../components/user/ViewListAccount";

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
        <Route path='view_utilities' element = {<ViewListUltility/>} />
        <Route path='create_utilities' element = {<CreateNewUltility/>} />
        <Route path='view_utilities/edit_utility/:id' element={<CreateNewUltility/>} />
        <Route path='create_account' element = {<CreateAccount/>} />
        <Route path='view_account' element = {<ViewListAccount/>} />
      </Route>
    </Routes>
  );
};

export default memo(RouterOwner);
