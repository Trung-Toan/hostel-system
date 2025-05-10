import React, { memo } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createUtility,
  updateUtility,
  useGetUtilityById,
} from "../../controller/UtilityController";
import Swal from "sweetalert2";

const CreateNewUtility = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { id } = useParams();
  const location = useLocation();
  const isEditUtility = location.pathname.includes("edit_utility");

  const { state: filter } = useLocation();

  const { data, isLoading } = useGetUtilityById(id);

  const utility = data?.data?.result || null;

  const loading = isLoading || false;

  const { mutate, isLoading: creatingUtility } = useMutation({
    mutationFn: (payload) =>
      isEditUtility ? updateUtility(id, payload) : createUtility(payload),
    onSuccess: () => {
      isEditUtility
        ? queryClient.refetchQueries([`utility_id${id}`])
        : queryClient.refetchQueries([
            `utilities_search${filter?.search}_sort${filter?.sort}_direction${filter?.direction}`,
          ]);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Utility ${isEditUtility ? "updated" : "created"} successfully!`,
        timer: 3000,
        showConfirmButton: true,
      }).then(() => {
        navigate(-1);
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.message || "An error occurred!",
        timer: 3000,
        showConfirmButton: true,
      });
    },
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: utility?.name || "",
      description: utility?.description || "",
      status: utility?.status ?? 1,
    },
    validationSchema: Yup.object({
      name: Yup.string().trim().required("Utility name cannot be empty."),
      description: Yup.string().trim(),
      status: Yup.number().required("Status cannot be empty."),
    }),
    onSubmit: (values) => {
      const payload = {
        ...values,
        status: Number(values.status),
      };
      mutate(payload);
    },
  });

  return (
    <Container>
      {loading && isEditUtility ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Row className="mt-4">
          <Col md={{ span: 6, offset: 3 }}>
            <h2 className="text-center">
              {isEditUtility ? "Edit Utility" : "Add New Utility"}
            </h2>
            <Form onSubmit={formik.handleSubmit} className="mt-4">
              <Form.Group controlId="name">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Utility Name<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  placeholder="Enter utility name"
                  type="text"
                  {...formik.getFieldProps("name")}
                  isInvalid={formik.touched.name && formik.errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="description" className="mt-3">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Description
                </Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter utility description"
                  rows={3}
                  {...formik.getFieldProps("description")}
                />
              </Form.Group>

              <Form.Group controlId="status" className="mt-3">
                <Form.Label style={{ fontWeight: "bold" }}>Status</Form.Label>
                <Form.Select {...formik.getFieldProps("status")}>
                  <option value={1} selected = {formik.values.status === 1}>Active</option>
                  <option value={0} selected = {formik.values.status === 0}>Inactive</option>
                </Form.Select>
              </Form.Group>

              <div className="text-center mt-4">
                <Button
                  variant={isEditUtility ? "warning" : "primary"}
                  type="submit"
                  disabled={creatingUtility}
                >
                  {creatingUtility ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    `${!isEditUtility ? "Add New" : "Update"}`
                  )}
                </Button>
                <Button
                  variant="secondary"
                  className="ms-3"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default memo(CreateNewUtility);
