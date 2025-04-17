import React, { memo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { useSessionStorage } from "../../ultil/useSessionStorage";
import { createPost } from "../../controller/PostController";
import Swal from "sweetalert2";

const CreatePost = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = useSessionStorage("user");

  const { mutate: addNew, isLoading: loadingCreatePost } = useMutation({
    mutationFn: ({ userId, title, content, image }) =>
      createPost(userId, title, content, image),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "New post created successfully!",
        timer: 3000,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries(["posts"]);
      navigate("/post");
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.message,
        timer: 3000,
        showConfirmButton: false,
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      userId: user.id,
      title: "",
      content: "",
      image: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().trim().required("Title cannot be empty."),
      content: Yup.string().trim().required("Content cannot be empty."),
    }),
    onSubmit: (values) => {
      addNew(values);
    },
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const acceptedFormats = ["image/jpeg", "image/jpg", "image/png"];
    if (file && acceptedFormats.includes(file.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue("image", reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file (JPEG, JPG, or PNG).");
    }
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        padding: "40px 20px",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "30px",
            fontSize: "28px",
          }}
        >
          Create a New Post
        </h2>

        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label
              style={{ fontWeight: "600", color: "#555", fontSize: "16px" }}
            >
              Title
            </Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              isInvalid={formik.touched.title && !!formik.errors.title}
              style={{
                borderRadius: "8px",
                padding: "12px",
                fontSize: "16px",
                borderColor: "#ddd",
              }}
            />
            <Form.Control.Feedback type="invalid" style={{ fontSize: "14px" }}>
              {formik.errors.title}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label
              style={{ fontWeight: "600", color: "#555", fontSize: "16px" }}
            >
              Content
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="content"
              value={formik.values.content}
              onChange={formik.handleChange}
              isInvalid={formik.touched.content && !!formik.errors.content}
              style={{
                borderRadius: "8px",
                padding: "12px",
                fontSize: "16px",
                borderColor: "#ddd",
                resize: "vertical",
              }}
            />
            <Form.Control.Feedback type="invalid" style={{ fontSize: "14px" }}>
              {formik.errors.content}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label
              style={{ fontWeight: "600", color: "#555", fontSize: "16px" }}
            >
              Image
            </Form.Label>
            {formik.values.image && (
              <div
                style={{
                  marginBottom: "15px",
                  textAlign: "center",
                }}
              >
                <img
                  src={formik.values.image}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    maxHeight: "300px",
                    borderRadius: "8px",
                    objectFit: "cover",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </div>
            )}
            <Form.Control
              type="file"
              accept="image/jpeg, image/jpg, image/png"
              onChange={handleImageUpload}
              style={{
                borderRadius: "8px",
                padding: "10px",
                fontSize: "16px",
                borderColor: "#ddd",
              }}
            />
          </Form.Group>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              marginTop: "30px",
            }}
          >
            <Link
              to={"/"}
              style={{
                padding: "10px 25px",
                backgroundColor: "#f8c107",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "8px",
                fontWeight: "600",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#e0a800")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#f8c107")}
            >
              Back
            </Link>
            <Button
              type="submit"
              disabled={loadingCreatePost}
              style={{
                padding: "10px 25px",
                backgroundColor: "#28a745",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) =>
                !loadingCreatePost &&
                (e.target.style.backgroundColor = "#218838")
              }
              onMouseOut={(e) =>
                !loadingCreatePost &&
                (e.target.style.backgroundColor = "#28a745")
              }
            >
              {loadingCreatePost ? "Creating..." : "Post"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default memo(CreatePost);
