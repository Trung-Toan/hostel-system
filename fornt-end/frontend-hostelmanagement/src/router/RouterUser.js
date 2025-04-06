import React, { memo } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/authentication/login/Login";
import FindEmail from "../components/authentication/findAccountByEmail/FindEmail";
import ForgetPassword from "../components/authentication/forgetPassword/ForgetPassword";
import Home from "../components/user/Home";
import ViewPost from "../components/post/ViewPost";

const RouterUser = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<ViewPost />} />
        <Route path="login" element={<Login />} />
        <Route path="find_email" element={<FindEmail />} />
        <Route path="forgot_password" element={<ForgetPassword />} />
      </Route>
    </Routes>
  );
};

export default memo(RouterUser);
