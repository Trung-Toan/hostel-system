import React, { memo, useCallback, useEffect, useState } from "react";
import {
  Form,
  Button,
  InputGroup,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import ViewRoomByHostel from "./ViewRoomByHostel";

const CreateAccount = ({ userLogin }) => {
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();
  const [isLoadRoom, setIsLoadRoom] = useState();
  const [errorRoom, setErrorRoom] = useState(null);

  const handleChangeLoadingRoom = useCallback((stateLoading) => {
    setIsLoadRoom(stateLoading);
  }, []);

  const handleChangeErrorRoom = useCallback((stateError) => {
    setErrorRoom(stateError);
  }, []);

  const {
    data: hostel,
    isLoading: loadingHostel,
    error: errorHostel,
  } = useQuery({
    queryFn: () => [],
    queryKey: ["hostel"],
    staleTime: 10000,
    cacheTime: 1000 * 60,
  });

  // Mutation to send data to the server
  const { mutate: createAccount, isLoading: creatingAccount } = useMutation({
    mutationFn: (payload) => [],
    onSuccess: () => {
      alert("Account created successfully!");
      queryClient.invalidateQueries(["accounts"]);
      setTimeout(() => {
        navigate("/admin/view_account");
      }, 1000);
    },
    onError: () => {
      alert("An error occurred while creating the account!");
    },
  });

  // Formik and Yup for validation
  const formik = useFormik({
    initialValues: {
      fullName: "",
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
      dob: "",
      address: "",
      personalAuth: "",
      hostelID: hostel?.data[0]?.id || "",
      roomID: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().trim().required("Full name cannot be empty."),
      username: Yup.string()
        .trim()
        .required("Username cannot be empty."),
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
        .matches(/^[0-9a-zA-Z]+$/, "Personal ID must contain only letters and numbers."),
    }),
    onSubmit: (values) => {
      const payload = {
        ...values,
        role: userLogin.role === 1 ? 2 : 0,
        status: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      createAccount(payload);
    },
  });

  const handleChangeRoom = (acc, accountId, newRoomId) => {
    formik.setFieldValue("roomID", newRoomId);
  };

  useEffect(() => {
    if (hostel?.data?.[0]?.id) {
      formik.setFieldValue("hostelID", hostel.data[0].id);
    }
  }, [hostel]);

  if (loadingHostel || isLoadRoom) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
        <p>Loading account list...</p>
      </Container>
    );
  }

  if (errorHostel || errorRoom) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          The system is experiencing an issue. Please try again later!
        </Alert>
      </Container>
    );
  }

  if (userLogin.role !== 1 && userLogin.role !== 2) {
    return <p>You do not have permission to create an account.</p>;
  }

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">
        Create Account {userLogin.role === 1 ? "Manager" : "Customer"}
      </h2>
      <Form onSubmit={formik.handleSubmit}>
        {/* Full Name */}
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
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
              <Form.Label>Full Name</Form.Label>
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
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
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
              <Form.Label>Phone Number</Form.Label>
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
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
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
              <Form.Label>Date of Birth</Form.Label>
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
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="personalAuth">
              <Form.Label>Personal Identification Code (ID Number)</Form.Label>
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
              <Form.Label>Address</Form.Label>
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
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="hostel">
              <Form.Label>Select Hostel</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="hostelID"
                value={formik.values.hostelID}
                onChange={formik.handleChange}
              >
                {hostel?.data?.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col className={`${userLogin.role !== 2 ? "d-none" : ""}`}>
            <Form.Group controlId="room">
              <Form.Label>Select Room</Form.Label>
              <ViewRoomByHostel
                handleChangeRoom={handleChangeRoom}
                handleChangeLoadingRoom={handleChangeLoadingRoom}
                handleChangeErrorRoom={handleChangeErrorRoom}
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