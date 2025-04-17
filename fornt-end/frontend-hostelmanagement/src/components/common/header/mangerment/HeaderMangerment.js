import React, { memo } from "react";
import { Dropdown, Nav, Navbar } from "react-bootstrap";
import {
  Bell,
  BoxArrowRight,
  ClipboardData,
  LockFill,
  PersonCircle,
} from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { useSessionStorage } from "../../../../ultil/useSessionStorage";

const HeaderMangerment = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/login");
  };

  const user = useSessionStorage("user");
  const role = user?.role;
  return (
    <Navbar style={{ width: "100%" }}>
      {/* Logo */}
      <Navbar.Brand as={Link} to={`/${role}`} className="fw-bold text-warning">
        Hostel management system
      </Navbar.Brand>
      {/* Toggle button for mobile */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" style={{ justifyContent: "end" }}>
        {/* Notifications */}
        <Nav.Link to="#" className="me-3 text-white">
          <Bell size={24} />
        </Nav.Link>

        {/* Admin Dropdown */}
        <Dropdown align="end">
          <Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
            <PersonCircle size={24} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Header>Hi, {user?.fullName || "Admin"}!</Dropdown.Header>
            <Dropdown.Divider />
            <Dropdown.Item as={Link} to={`/${role}/information`}>
              <ClipboardData className="me-2" />
              Information
            </Dropdown.Item>
            <Dropdown.Item as={Link} to={`/${role}/change_password`}>
              <LockFill className="me-2" />
              ChangePassword
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={onLogout}>
              <BoxArrowRight className="me-2" />
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default memo(HeaderMangerment);
