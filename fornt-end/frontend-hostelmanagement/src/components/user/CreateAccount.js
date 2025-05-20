import React, { memo, useCallback, useState } from "react";
import {
  Form,
  Button,
  InputGroup,
  Container,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import ViewRoomByHostel from "./ViewRoomByHostel";
import { useSessionStorage } from "../../ultil/useSessionStorage";
import { useGetAllHostelByStatus } from "../../controller/HostelController";
import Swal from "sweetalert2";
import { createAccount } from "../../controller/UserController";

const CreateAccount = () => {
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const userLogin = useSessionStorage("user");

  const {
    data,
    isLoading: loadingHostel,
    error: errorHostel,
  } = useGetAllHostelByStatus(1);

  const resetUserByRoleQueries = () => {
    // Làm mới tất cả các query bắt đầu bằng 'user_by_role'
    queryClient.invalidateQueries({ queryKey: ["user_by_role"] });
  };

  const hostel = data?.data?.result || [];

  // Mutation to send data to the server
  const { mutate, isLoading: creatingAccount } = useMutation({
    mutationFn: (payload) => createAccount(payload),
    onSuccess: () => {
      resetUserByRoleQueries();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Create new account successfully!",
        timer: 3000,
        showConfirmButton: true,
      }).then(() => navigate(-1));
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.message || "An error occurred.",
        timer: 3000,
        showConfirmButton: true,
      });
    },
  });

  // Formik and Yup for validation
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: "",
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
      dob: "",
      address: "",
      personalAuth: "",
      roomID: "",
      hostelID: hostel?.[0]?.id || "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().trim().required("Full name cannot be empty."),
      username: Yup.string().trim().required("Username cannot be empty."),
      email: Yup.string()
        .email("Invalid email.")
        .required("Email cannot be empty."),
      phoneNumber: Yup.string()
        .matches(/^\d+$/, "Phone number must contain only digits.")
        .required("Phone number cannot be empty."),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters.")
        .required("Password cannot be empty."),
      dob: Yup.date()
        .required("Date of birth cannot be empty.")
        .test("dob-range", "Age must be between 16 and 100.", function (value) {
          if (!value) return false;
          const today = new Date();
          const birthDate = new Date(value);
          const age = today.getFullYear() - birthDate.getFullYear();
          const monthDifference = today.getMonth() - birthDate.getMonth();

          if (
            monthDifference < 0 ||
            (monthDifference === 0 && today.getDate() < birthDate.getDate())
          ) {
            return age - 1 >= 16 && age - 1 <= 100;
          }

          return age >= 16 && age <= 100;
        }),
      address: Yup.string().trim().required("Address cannot be empty."),
      personalAuth: Yup.string()
        .trim()
        .required("Personal identification code cannot be empty.")
        .matches(
          /^[0-9a-zA-Z]+$/,
          "Personal ID must contain only letters and numbers."
        )
        .min(12, "Personal ID must be 12 characters.")
        .max(12, "Personal ID must be 12 characters."),
      roomID: Yup.string().when(userLogin.role, {
        is: "manager",
        then: (schema) => schema.required("Room cannot be empty."),
        otherwise: (schema) => schema.optional(),
      }),
    }),
    onSubmit: (values) => {
      const payload = {
        ...values,
        roomId: values.roomID,
        hostelId: values.hostelID,
        role: userLogin.role === "owner" ? "manager" : "customer",
        status: 1,
      };
      delete payload.roomID;
      delete payload.hostelID;
      mutate(payload);
    },
  });

  const handleChangeRoom = useCallback((newRoomId) => {
    formik.setFieldValue("roomID", newRoomId);
  }, []);

  if (loadingHostel) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
        <p>Loading account list...</p>
      </Container>
    );
  }

  if (errorHostel) {
    return Swal.fire({
      icon: "error",
      title: "Error",
      text: errorHostel || "An error occurred.",
      timer: 3000,
      showConfirmButton: true,
    });
  }

  return (
    <Container className="mt-4">
      <h2 className="text-center fw-bold mb-5">
        Create Account {userLogin.role === "owner" ? "Manager" : "Customer"}
      </h2>
      <Form onSubmit={formik.handleSubmit}>
        {/* Full Name */}
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="username">
              <Form.Label className="fw-bold">
                Username <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.username && !!formik.errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.username}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="fullName">
              <Form.Label className="fw-bold">
                Full Name <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                placeholder="Enter full name"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.fullName && !!formik.errors.fullName}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.fullName}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Email */}
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="email">
              <Form.Label className="fw-bold">
                Email <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.email && !!formik.errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="phoneNumber">
              <Form.Label className="fw-bold">
                Phone Number <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                placeholder="Enter phone number"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.phoneNumber && !!formik.errors.phoneNumber
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.phoneNumber}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Password */}
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="password">
              <Form.Label className="fw-bold">
                Password <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.password && !!formik.errors.password
                  }
                />
                <InputGroup.Text onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeSlashFill /> : <EyeFill />}
                </InputGroup.Text>
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="dob">
              <Form.Label className="fw-bold">
                Date of Birth <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={formik.values.dob}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.dob && !!formik.errors.dob}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.dob}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Address */}
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="personalAuth">
              <Form.Label className="fw-bold">
                Personal Identification Code (ID Number)
                <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="personalAuth"
                placeholder="Enter personal identification code"
                value={formik.values.personalAuth}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.personalAuth && !!formik.errors.personalAuth
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.personalAuth}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="address">
              <Form.Label className="fw-bold">
                Address <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Enter address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.address && !!formik.errors.address}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.address}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Hostel and Room Selection */}
        <Row className="mb-4">
          {/* select hostel */}
          <Col>
            <Form.Group controlId="hostel">
              <Form.Label className="fw-bold">
                Select Hostel <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="hostelID"
                value={formik.values.hostelID}
                onChange={formik.handleChange}
              >
                {hostel?.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          {/* select room by hostel */}
          <Col className={`${userLogin.role !== "manager" ? "d-none" : ""}`}>
            <Form.Group controlId="room">
              <Form.Label className="fw-bold">
                Select Room <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <ViewRoomByHostel
                handleChangeRoom={handleChangeRoom}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.roomID && !!formik.errors.roomID}
                mess={formik.errors.roomID}
                rId={formik.values.roomID}
                hId={formik.values.hostelID}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Submit Button */}
        <Button type="submit" disabled={creatingAccount} className="w-100">
          Create Account
        </Button>
      </Form>
    </Container>
  );
};

export default memo(CreateAccount);
