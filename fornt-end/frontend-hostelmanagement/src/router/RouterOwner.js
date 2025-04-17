import React, { memo } from "react";
import { Route, Routes } from "react-router-dom";
import HomeMangement from "../components/home/HomeMangement";
import AddNewHostel from "../components/hostel/AddNewHostel";
import EditHostel from "../components/hostel/EditHostel";
import ViewListHostel from "../components/hostel/ViewListHostel";

const RouterOwner = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeMangement />}>
        <Route index element={<ViewListHostel />} />
        <Route path="create-hostel" element={<AddNewHostel />} />
        <Route path="edit-hostel" element={<EditHostel />} />
      </Route>
    </Routes>
  );
};

export default memo(RouterOwner);
