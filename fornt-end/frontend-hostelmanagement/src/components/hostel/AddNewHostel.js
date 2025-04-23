import React, { memo } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createHostel } from "../../controller/HostelController";
import Swal from "sweetalert2";
import useProcessFile from "../../ultil/processFile";
import { useSessionStorage } from "../../ultil/useSessionStorage";

const AddNewHostel = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { handleFiles } = useProcessFile();

  const {state} = useLocation();
  const page = state?.page || null;

  const owner = useSessionStorage("user");

  const { mutate, isLoading: creatingHostel } = useMutation({
    mutationFn: (payload) => {
      return createHostel(payload);
    },
    onSuccess: (newHostel) => {
      console.log(newHostel);
      
      queryClient.invalidateQueries([`hostels_${page.currentPage}_${page.size}_${page.search}_${page.sort}_${page.direction}`]);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Hostel created successfully!",
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
        text: error?.message || "An error occurred.",
        timer: 3000,
        showConfirmButton: true,
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      description: "",
      status: 1,
      image: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().trim().required("Hostel name is required."),
      address: Yup.string().trim().required("Address is required."),
      description: Yup.string().trim().required("Description is required."),
      status: Yup.number().required("Status is required."),
    }),
    onSubmit: (values) => {
      const data = { ...values, status: Number(values.status), owner: owner};
      const payload = { ...data, image: data.image.join("|") };
      mutate(payload);
    },
  });

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const { objectURLs } = handleFiles(files);
    formik.setFieldValue("image", [...formik.values.image, ...objectURLs]);
  };

  const handleImageRemove = (index) => {
    const updatedImages = [...formik.values.image];
    updatedImages.splice(index, 1);
    formik.setFieldValue("image", updatedImages);
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-center fw-bold">Add New Hostel</h2>
          <Form onSubmit={formik.handleSubmit} className="mt-4">
            <Form.Group controlId="name">
              <Form.Label className="fw-bold">
                Hostel Name<span className="fw-bold text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                {...formik.getFieldProps("name")}
                isInvalid={formik.touched.name && formik.errors.name}
                placeholder="Enter hostel name"
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="address" className="mt-3">
              <Form.Label className="fw-bold">
                Address<span className="fw-bold text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                {...formik.getFieldProps("address")}
                isInvalid={formik.touched.address && formik.errors.address}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.address}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="description" className="mt-3">
              <Form.Label className="fw-bold">
                Description<span className="fw-bold text-danger">*</span>
              </Form.Label>
              <Form.Control
                placeholder="Enter description"
                as="textarea"
                rows={3}
                {...formik.getFieldProps("description")}
                isInvalid={
                  formik.touched.description && formik.errors.description
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.description}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="status" className="mt-3">
              <Form.Label className="fw-bold">Status</Form.Label>
              <Form.Select {...formik.getFieldProps("status")}>
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="images" className="mt-3">
              <Form.Label className="fw-bold">Images</Form.Label>
              <div className="d-flex flex-wrap gap-3">
                {formik.values.image.map((img, index) => (
                  <div key={index} className="position-relative">
                    <img
                      src={img}
                      alt={`Hostel ${index}`}
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "contain",
                        borderRadius: "8px",
                      }}
                    />
                    <div
                      className="delete-button"
                      onClick={() => handleImageRemove(index)}
                    >
                      x
                    </div>
                  </div>
                ))}
              </div>
              <Form.Control
                type="file"
                multiple
                accept="image/*"
                className="mt-2"
                onChange={(event) => handleImageUpload(event)}
              />
            </Form.Group>

            <div className="text-center mt-4">
              <Button variant="primary" type="submit" disabled={creatingHostel}>
                {creatingHostel ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Add Hostel"
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
    </Container>
  );
};

export default memo(AddNewHostel);
