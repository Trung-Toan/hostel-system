import React, { memo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { updatePost } from "../../controller/PostController";
import Swal from "sweetalert2";

const EditPost = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { state } = useLocation();
  const id = state?.post?.id || null;
  const userId = state?.post?.userId || null;

  const post = state?.post || null;

  // Mutation to update the post
  const { mutate: handleUpdatePost, isLoading: updatingPost } = useMutation({
    mutationFn: (payload) => updatePost(id, payload.title, payload.content, payload.image, userId),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Post updated successfully!",
        timer: 3000,
        showConfirmButton: true,
      }).then(() => {
        navigate(-1);
      });
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (error) => {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message || "An error occurred!",
            timer: 3000,
            showCancelButton: true,
        });
    },
  });

  // Formik to manage the form
  const formik = useFormik({
    initialValues: {
      title: post?.title || "",
      content: post?.content || "",
      image: post?.image || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().trim().required("Title is required."),
      content: Yup.string().trim().required("Content is required."),
    }),
    onSubmit: (values) => {
      handleUpdatePost(values);
    },
    enableReinitialize: true, // Allow reinitialization of formik values when post data is loaded
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue("image", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ margin: "0 auto", width: "50%" }}>
      <div className="edit-post">
        <h2 className="text-center">Edit Post</h2>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              isInvalid={formik.touched.title && !!formik.errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.title}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="content"
              value={formik.values.content}
              onChange={formik.handleChange}
              isInvalid={formik.touched.content && !!formik.errors.content}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.content}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Image</Form.Label>
            {formik.values.image && (
              <div className="mb-3 text-center">
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
            />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button
              variant="secondary"
              className="me-3"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
            <Button type="submit" disabled={updatingPost}>
              {updatingPost ? "Updating..." : "Save Changes"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default memo(EditPost);