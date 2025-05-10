import React, { memo } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useGetAllUtilityByStatus } from "../../controller/UtilityController";
import { createNewRoomAtHostelId } from "../../controller/RoomController";
import useProcessFile from "../../ultil/processFile";
import Swal from "sweetalert2";

const AddNewRoom = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data } = useGetAllUtilityByStatus(1);
  const utilities = data?.data?.result;
  const { state } = useLocation();
  const hostel = state?.hostel;

  const { handleFiles } = useProcessFile();

  const { mutate, isLoading: creatingRoom } = useMutation({
    mutationFn: (payload) => createNewRoomAtHostelId(hostel?.id, payload),
    onSuccess: () => {
      queryClient.refetchQueries([`rooms_hid${hostel?.id}`]);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Room added successfully!",
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
    initialValues: {
      name: "",
      price: 0,
      description: "",
      status: 0,
      image: [],
      area: 0,
      maxOccupants: 0,
      currentOccupants: 0,
      utilities: [],
    },

    validationSchema: Yup.object({
      name: Yup.string().trim().required("Room name cannot be empty."),
      price: Yup.number()
        .required("Room price cannot be empty.") // Ensure the field is not empty
        .positive("Room price must be greater than 0.") // Ensure a positive number
        .min(10000, "Room price must be greater than 10,000 VND.") // Minimum value
        .max(20000000, "Room price cannot exceed 20,000,000 VND."), // Maximum value
      description: Yup.string()
        .trim()
        .required("This field cannot be empty."),
      status: Yup.number().required("Status cannot be empty."),
      area: Yup.number("You must enter a valid area.")
        .required("This field cannot be empty.")
        .positive("Room area must be greater than 0.")
        .min(10, "Room area must be greater than 10m².")
        .max(200, "Room area must be less than 200m²."),
      maxOccupants: Yup.number().required("This field cannot be empty.")
        .min(1, "Max occupants must be at least 1."),
      utilities: Yup.array()
        .min(1, "You must select at least one utility.")
        .required("This field is required."),
    }),
    onSubmit: (values) => {
      const payload = {
        ...values,
        image: values.image.join("|"),
        status: Number(values.status),
        area: Number(values.area),
      };
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
          <h2 className="text-center mb-3">Add New Room</h2>
          <Form onSubmit={formik.handleSubmit} className="mb-4">
            {/* Room name */}
            <Form.Group controlId="name" className="mb-3">
              <Form.Label style={{ fontWeight: 'bold' }}>Room Name <span style={{ color: 'red' }}>*</span></Form.Label>
              <Form.Control
                type="text"
                {...formik.getFieldProps("name")}
                placeholder="Enter room name"
                isInvalid={formik.touched.name && formik.errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Row>
              <Col className="mb-3">
                {/* Room price */}
                <Form.Group controlId="price">
                  <Form.Label style={{ fontWeight: 'bold' }}>Room Price <span style={{ color: 'red' }}>*</span></Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="number"
                      {...formik.getFieldProps("price")}
                      isInvalid={formik.touched.price && formik.errors.price}
                      placeholder="Enter room price"
                    />
                    <span className="bg-secondary p-2">VND</span>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.price}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col>
                {/* Room area */}
                <Form.Group controlId="area">
                  <Form.Label style={{ fontWeight: 'bold' }}>Room Area <span style={{ color: 'red' }}>*</span></Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="number"
                      {...formik.getFieldProps("area")}
                      placeholder="Enter room area"
                      isInvalid={formik.touched.area && formik.errors.area}
                    />
                    <span className="bg-secondary p-2">m²</span>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.area}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            {/* Max occupants */}
            <Form.Group controlId="maxOccupants" className="mb-3">
              <Form.Label style={{ fontWeight: 'bold' }}>Max occupants <span style={{ color: 'red' }}>*</span></Form.Label>
              <Form.Control
                type="text"
                {...formik.getFieldProps("maxOccupants")}
                placeholder="Enter max occupants"
                isInvalid={formik.touched.maxOccupants && formik.errors.maxOccupants}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.maxOccupants}
              </Form.Control.Feedback>
            </Form.Group>

            {/* utilities */}
            <Form.Group controlId="utilities" className="mb-3">
              <Form.Label style={{ fontWeight: 'bold' }}>Utilities <span style={{ color: 'red' }}>*</span></Form.Label>
              <div>
                {utilities?.map((utility) => (
                  <Form.Check
                    key={utility.id}
                    type="checkbox"
                    label={utility.name}
                    value={utility.id}
                    className="form-check"
                    onChange={(e) => {
                      const { checked } = e.target;
                      const value = Number(e.target.value);
                      const currentUtilities = formik.values.utilities;

                      if (checked) {
                        formik.setFieldValue("utilities", [...currentUtilities, value]);
                      } else {
                        formik.setFieldValue(
                          "utilities",
                          currentUtilities.filter((item) => item !== value)
                        );
                      }
                    }}
                    checked={formik.values.utilities.includes(utility.id)}
                  />
                ))}
              </div>
              {formik.touched.utilities && formik.errors.utilities && (
                <Form.Text className="text-danger">
                  {formik.errors.utilities}
                </Form.Text>
              )}
            </Form.Group>

            {/* Room description */}
            <Form.Group controlId="description" className="mb-3">
              <Form.Label style={{ fontWeight: 'bold' }}>Description <span style={{ color: 'red' }}>*</span></Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter room description"
                {...formik.getFieldProps("description")}
                isInvalid={
                  formik.touched.description && formik.errors.description
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.description}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Room images */}
            <Form.Group controlId="images" className="mb-3">
              <Form.Label style={{ fontWeight: 'bold' }}>Images</Form.Label>
              <div className="d-flex flex-wrap gap-3">
                {formik.values.image.map((img, index) => (
                  <div key={index} className="position-relative">
                    <img
                      src={img}
                      alt={`Room ${index}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
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
            {/* Room status */}
            <Row>
              <Col>
                <Form.Group controlId="status" className="mb-3">
                  <Form.Label style={{ fontWeight: 'bold' }}>Status</Form.Label>
                  <Form.Select {...formik.getFieldProps("status")}>
                    <option value={0}>Vacant</option>
                    <option value={1}>Occupied</option>
                    <option value={2}>Reserved</option>
                    <option value={3}>Inactive</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            {/* Submit */}
            <div className="text-center mb-4">
              <Button variant="primary" type="submit" disabled={creatingRoom}>
                {creatingRoom ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Add Room"
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

export default memo(AddNewRoom);
