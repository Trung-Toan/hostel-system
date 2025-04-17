import React, { memo, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Form,
  Button,
  Spinner,
  Container,
  Row,
  Col,
  Card,
  Image,
} from "react-bootstrap";
import "./EditHostel.css";
import { FaTrash } from "react-icons/fa";
import useProcessFile from "../../ultil/processFile";
import Swal from "sweetalert2";
import { updateHostel } from "../../controller/HostelController";

const EditHostel = () => {
  const navigate = useNavigate();
  const [img, setImg] = useState("");

  const { state } = useLocation();

  const hostelDetail = state?.hostel || null;
  const page = state?.page || null;

  console.log(hostelDetail);
  

  const queryClient = useQueryClient();
  const { mutate, isLoading: updatingHostel } = useMutation({
    mutationFn: (payload) => updateHostel(payload),
    onSuccess: (data) => {
      const hostelUpdate = data?.result || null;
      queryClient.setQueriesData(
        [`hostels_${page.currentPage}_${page.size}_${page.search}_${page.sort}_${page.direction}`],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: {
              ...oldData.data,
              result: {
                ...oldData.data.result,
                content: oldData.data.result.content.map((hostel) =>
                  hostel?.id === hostelUpdate?.id ? hostelUpdate : hostel
                ),
              },
            },
          };
        }
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Hostel updated successfully!",
        timer: 3000,
        showConfirmButton: true,
      }).then(() => {
        navigate(-1);
      });
    },
    onError: (error) => {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "An error occurred!",
        timer: 3000,
        showCancelButton: true,
      });
    },
  });

  const { handleFiles } = useProcessFile();

  const formik = useFormik({
    initialValues: {
      id: hostelDetail?.id || "",
      name: hostelDetail?.name || "",
      address: hostelDetail?.address || "",
      description: hostelDetail?.description || "",
      status: hostelDetail?.status || 1,
      image: hostelDetail?.image ? hostelDetail?.image.split("|") : [],
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().trim().required("Hostel name is required."),
      address: Yup.string().trim().required("Address is required."),
      description: Yup.string(),
      status: Yup.number().required("Status is required."),
    }),
    onSubmit: (values) => {
      const data = {
        ...hostelDetail,
        ...values,
        status: Number(values.status),
      };
      const payload = { ...data, image: data.image.join("|") };
      mutate(payload);
    },
  });

  useEffect(() => {
    if (formik.values.image.length > 0) {
      setImg(formik.values.image[0]);
    }
  }, [formik.values.image]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const { objectURLs } = handleFiles(files);
    formik.setFieldValue("image", [
      ...formik.values.image,
      ...objectURLs,
    ]);
  };

  const handleImageRemove = (index) => {
    const updatedImages = [...formik.values.image];
    updatedImages.splice(index, 1);
    formik.setFieldValue("image", updatedImages);
  };

  return (
    <Container fluid>
      <Row className="mt-4 justify-content-center">
        <Col md={8}>
          <h2 className="text-center text-primary">Edit Hostel Information</h2>
          <Form onSubmit={formik.handleSubmit} className="mt-4">
            <Card className="shadow-sm">
              <Card.Body>
                <Row>
                  <Col md={6} className="mb-4">
                    <Form.Group controlId="images">
                      <Form.Label className="fw-bold">Images</Form.Label>
                      <Card>
                        <Card.Body className="text-center">
                          <Image
                            src={img || "https://via.placeholder.com/300"}
                            alt="Hostel"
                            fluid
                            rounded
                            className="mb-3 border"
                            style={{ height: "300px", objectFit: "contain" }}
                          />
                          <div
                            className="d-flex flex-wrap gap-3 justify-content-center p-2"
                            style={{ borderTop: "1px solid black" }}
                          >
                            {formik.values.image.map((i, index) => (
                              <div
                                key={index}
                                className="position-relative thumbnail-container"
                              >
                                <Image
                                  src={i}
                                  alt={`Hostel ${index}`}
                                  onClick={() => setImg(i)}
                                  thumbnail
                                  style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "contain",
                                    border:
                                      i === img
                                        ? "2px solid red"
                                        : "1px solid #ddd",
                                    cursor: "pointer",
                                  }}
                                />
                                <div
                                  className="delete-button"
                                  onClick={() => handleImageRemove(index)}
                                >
                                  <FaTrash />
                                </div>
                              </div>
                            ))}
                          </div>
                          <Form.Control
                            type="file"
                            multiple
                            accept="image/*"
                            className="mt-2"
                            onChange={handleImageUpload}
                          />
                        </Card.Body>
                      </Card>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="name" className="mb-3">
                      <Form.Label className="fw-bold">Hostel Name</Form.Label>
                      <Form.Control
                        type="text"
                        {...formik.getFieldProps("name")}
                        isInvalid={formik.touched.name && formik.errors.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="address" className="mb-3">
                      <Form.Label className="fw-bold">Address</Form.Label>
                      <Form.Control
                        type="text"
                        {...formik.getFieldProps("address")}
                        isInvalid={
                          formik.touched.address && formik.errors.address
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.address}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="status" className="mb-3">
                      <Form.Label className="fw-bold">Status</Form.Label>
                      <Form.Select {...formik.getFieldProps("status")}>
                        <option value={1}>Active</option>
                        <option value={0}>Inactive</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.status}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="description" className="mb-3">
                      <Form.Label className="fw-bold">Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        {...formik.getFieldProps("description")}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <div className="mt-4 text-center">
              <Button
                type="submit"
                variant="primary"
                className="me-3"
                disabled={updatingHostel}
              >
                {updatingHostel ? (
                  <Spinner animation="border" size="sm" className="me-2" />
                ) : null}
                Update
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate(-1)}
                disabled={updatingHostel}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default memo(EditHostel);
