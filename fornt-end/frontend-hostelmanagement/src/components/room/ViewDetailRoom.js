import React, { memo, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Spinner,
  Card,
  Image,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaTrash } from "react-icons/fa";
import { AiOutlineSave, AiOutlineRollback } from "react-icons/ai";
import { useGetAllUtilityByStatus } from "../../controller/UtilityController";
import { getUtilityUsedByRoom } from "../../controller/RoomUtility";
import useProcessFile from "../../ultil/processFile";
import { updateRoom } from "../../controller/RoomController";
import Swal from "sweetalert2";

const ViewDetailRoom = ({ statusMapping }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [img, setImg] = useState("");
  const [utilityUsedList, setUtilityUsedList] = useState([]);

  const { data } = useGetAllUtilityByStatus(1);
  const utilities = data?.data?.result;

  const { handleFiles } = useProcessFile();
  const { state } = useLocation();
  const hostel = state?.hostel;
  const room = state?.room;

  useEffect(() => {
    const fetchUtility = async () => {
      const utilityUsed = await getUtilityUsedByRoom(room?.id);
      setUtilityUsedList(utilityUsed?.result || []);
    };
    if (room?.id) {
      fetchUtility();
    }
  }, [room?.id]);

  const formatNumber = (value) => {
    if (!value) return "";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const { mutate, isLoading: updatingRoom } = useMutation({
    mutationFn: (payload) => updateRoom(payload?.id, payload),
    onSuccess: () => {
      queryClient.refetchQueries([`rooms_hid${hostel?.id}`]);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Room update successfully!",
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
        text: error?.message,
        timer: 3000,
        showConfirmButton: true,
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      name: room?.name || "",
      price: room?.price || 0,
      description: room?.description || "",
      status: room?.status || 1,
      image: room?.image?.split("|") || [],
      area: room?.area || 0,
      utilities: utilityUsedList || [],
      maxOccupants: room?.maxOccupants || 0,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().trim().required("Room name cannot be empty."),
      price: Yup.number().required("Room price cannot be empty."),
      area: Yup.number().required("Room area cannot be empty."),
      description: Yup.string(),
      status: Yup.number().required("Room status cannot be empty."),
      utilities: Yup.array()
        .min(1, "You must select at least one utility.")
        .required("This field is required."),
      maxOccupants: Yup.number()
        .required("This field cannot be empty.")
        .min(1, "Max occupants must be at least 1."),
    }),
    onSubmit: (values) => {
      const payload = {
        ...room,
        ...values,
        hostel: hostel,
        image: values.image.join("|"),
        status: Number(values.status),
      };
      mutate(payload);
    },
  });

  useEffect(() => {
    if (formik?.values?.image.length > 0) {
      setImg(formik.values.image[0]);
    }
  }, [formik.values.image]);

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
        <Col md={{ span: 8, offset: 2 }}>
          <h2 className="text-center text-primary">Edit Room Details</h2>
          <Form
            onSubmit={formik.handleSubmit}
            className="mt-4 border p-4 rounded shadow-sm bg-light"
          >
            <Row>
              <Col md={6}>
                <Form.Group controlId="images" className="mb-4">
                  <Form.Label className="fw-bold">Images</Form.Label>
                  <Card className="p-3">
                    <Image
                      src={img || "https://via.placeholder.com/300"}
                      alt="Room"
                      fluid
                      rounded
                      className="mb-3 border"
                      style={{ height: "300px", objectFit: "contain" }}
                    />
                    <div className="d-flex flex-wrap gap-3 justify-content-center border-top pt-3">
                      {formik.values.image.map((i, index) => (
                        <div key={index} className="position-relative">
                          <Image
                            src={i}
                            alt={`room ${index}`}
                            onClick={() => setImg(i)}
                            thumbnail
                            className="border"
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "contain",
                              border:
                                i === img ? "2px solid red" : "1px solid #ddd",
                              cursor: "pointer",
                            }}
                          />
                          <div
                            className="position-absolute top-0 start-100 translate-middle badge bg-danger"
                            style={{ cursor: "pointer" }}
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
                      className="mt-3"
                      onChange={handleImageUpload}
                    />
                  </Card>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="name" className="mb-3">
                  <Form.Label className="fw-bold">Room Name</Form.Label>
                  <Form.Control
                    type="text"
                    {...formik.getFieldProps("name")}
                    isInvalid={formik.touched.name && formik.errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="price" className="mb-3">
                  <Form.Label className="fw-bold">Room Price</Form.Label>
                  <Form.Control
                    type="text"
                    value={formatNumber(formik.values.price)}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/\./g, "");
                      formik.setFieldValue("price", rawValue);
                    }}
                    isInvalid={formik.touched.price && formik.errors.price}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.price}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="area" className="mb-3">
                  <Form.Label className="fw-bold">Room Area</Form.Label>
                  <Form.Control
                    type="text"
                    value={formatNumber(formik.values.area)}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/\./g, "");
                      formik.setFieldValue("area", rawValue);
                    }}
                    isInvalid={formik.touched.area && formik.errors.area}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.area}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="utilities" className="mb-3">
                  <Form.Label style={{ fontWeight: "bold" }}>
                    Utilities <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <div>
                    {utilities?.map((utility) => (
                      <Form.Check
                        key={utility.id}
                        type="checkbox"
                        label={utility.name}
                        value={utility.id}
                        className="form-check"
                        checked={formik.values?.utilities?.includes(
                          utility?.id
                        )}
                        onChange={(e) => {
                          const { checked } = e.target;
                          const value = Number(e.target.value);
                          const currentUtilities = formik.values.utilities;

                          if (checked) {
                            formik.setFieldValue("utilities", [
                              ...currentUtilities,
                              value,
                            ]);
                          } else {
                            formik.setFieldValue(
                              "utilities",
                              currentUtilities.filter((item) => item !== value)
                            );
                          }
                        }}
                      />
                    ))}
                  </div>
                  {formik.touched.utilities && formik.errors.utilities && (
                    <Form.Text className="text-danger">
                      {formik.errors.utilities}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group controlId="description" className="mb-3">
                  <Form.Label className="fw-bold">Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    {...formik.getFieldProps("description")}
                  />
                </Form.Group>

                <Form.Group controlId="status" className="mb-3">
                  <Form.Label className="fw-bold">Status</Form.Label>
                  <Form.Select {...formik.getFieldProps("status")}>
                    {Object.keys(statusMapping)?.map((s) => {
                      const status = statusMapping[s];
                      return (
                        <option key={status.id} value={status.id}>
                          {status.label}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="maxOccupants" className="mb-3">
                  <Form.Label className="fw-bold">Max Occupants</Form.Label>
                  <Form.Control
                    type="text"
                    value={formatNumber(formik.values.maxOccupants)}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/\./g, "");
                      formik.setFieldValue("maxOccupants", rawValue);
                    }}
                    isInvalid={
                      formik.touched.maxOccupants && formik.errors.maxOccupants
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.maxOccupants}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <div className="text-center mt-4">
              <Button
                variant="primary"
                type="submit"
                disabled={updatingRoom}
                className="me-3"
              >
                {updatingRoom ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  <>
                    <AiOutlineSave className="me-1" />
                    Save Changes
                  </>
                )}
              </Button>
              <Button variant="secondary" onClick={() => navigate(-1)}>
                <AiOutlineRollback className="me-1" />
                Cancel
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default memo(ViewDetailRoom);
