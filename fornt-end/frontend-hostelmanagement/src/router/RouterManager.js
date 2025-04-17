import React, { memo } from "react";
import { Route, Routes } from "react-router-dom";
import HomeMangement from "../components/home/HomeMangement";
import ViewPost from "../components/post/ViewPost";
import CreatePost from "../components/post/CreatePost";
import EditPost from "../components/post/EditPost";

const RouterManager = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeMangement />}>
        <Route index element={<ViewPost />} />
        <Route path="add-new-post" element={<CreatePost/>} />
        <Route path="edit-post" element={<EditPost/>} />
      </Route>
    </Routes>
  );
};

export default memo(RouterManager);
