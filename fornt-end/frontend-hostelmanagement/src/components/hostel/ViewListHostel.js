import React, { memo, useState } from "react";
import {
  Spinner,
  Card,
  Row,
  Col,
  Badge,
  Dropdown,
  Button,
  Form,
  InputGroup,
  Pagination,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  updateHostel,
  useGetHostelList,
} from "../../controller/HostelController";
import "./non-arrow.css";
import Swal from "sweetalert2";

const ViewListHostel = () => {
  const [page, setPage] = useState({
    currentPage: 0,
    size: 12,
    search: "",
    sort: "name",
    direction: "asc",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();

  const { data, isLoading } = useGetHostelList(page.currentPage, page.size, page.search, page.sort, page.direction);

  const hostel = data?.data?.result?.content || [];
  const totalPages = data?.data?.result?.page?.totalPages || 1;

  const { mutate } = useMutation({
    mutationFn: (payload) => {
      return updateHostel(payload);
    },
    onSuccess: (data) => {
      const hostelUpdate = data?.result || null;
      queryClient.setQueriesData(
        [
          `hostels_${page.currentPage}_${page.size}_${page.search}_${page.sort}_${page.direction}`,
        ],
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
      });
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

  const changeStatus = (hostel) => {
    const updatedHostel = { ...hostel, status: hostel.status === 1 ? 0 : 1 };
    mutate(updatedHostel);
  };

  const handleSearch = () => {
    setPage((prev) => ({
      ...prev,
      currentPage: 0,
      search: searchTerm,
    }));
  };

  const handlePageChange = (newPage) => {
    setPage((prev) => ({
      ...prev,
      currentPage: newPage,
    }));
  };

  const handleSortChange = (e) => {
    setPage((prev) => ({
      ...prev,
      direction: e.target.value,
      currentPage: 0,
    }));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">Manage Hostel List</h2>
        <Link to={"create-hostel"} className="btn btn-success" state={{ page }}>
          Create New Hostel
        </Link>
      </div>

      {/* Search and Sort */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* Search Bar */}
        <InputGroup style={{ width: "40%" }}>
          <Form.Control
            className="search-input"
            type="search"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>
        </InputGroup>

        {/* Sort Options */}
        <Form.Group controlId="sortOrder" className="d-flex align-items-center">
          <Form.Label className="mb-0 me-2">Sort by name:</Form.Label>
          <Form.Select
            value={page.direction}
            onChange={handleSortChange}
            className="w-auto"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Form.Select>
        </Form.Group>
      </div>

      {/* Hostel List */}
      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : hostel.length > 0 ? (
        <>
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {hostel.map((hostel) => (
              <Col key={hostel.id}>
                <Card className="h-100 shadow">
                  {/* Dropdown */}
                  <Dropdown className="position-absolute top-0 end-0 m-2">
                    <Dropdown.Toggle
                      as="span"
                      id={`dropdown-hostel-${hostel.id}`}
                      role="button"
                      className="p-0 border-0"
                      style={{
                        cursor: "pointer",
                        boxShadow: "none",
                        fontSize: "1.5rem",
                        lineHeight: "0.5",
                      }}
                    >
                      ...
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        as={Link}
                        to={`edit-hostel`}
                        state={{ hostel, page }}
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => changeStatus(hostel)}
                        className={`${
                          hostel.status === 1 ? "text-danger" : "text-success"
                        }`}
                      >
                        {hostel.status === 1 ? "Deactivate" : "Activate"}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  {/* Image */}
                  <Card.Img
                    variant="top"
                    src={
                      hostel?.image
                        ? hostel.image.split("|")[0] ||
                          "https://via.placeholder.com/300"
                        : "https://via.placeholder.com/300"
                    }
                    alt={hostel?.image?.split("|")[0]}
                    style={{
                      height: "180px",
                      objectFit: "contain",
                      padding: "5px",
                    }}
                  />

                  {/* Content */}
                  <Card.Body>
                    <Card.Title>{hostel.name}</Card.Title>
                    <Card.Text>
                      <strong>Address:</strong> {hostel?.address}
                    </Card.Text>
                    <Card.Text>
                      <small className="text-muted">
                        {hostel?.description?.length > 60
                          ? `${hostel.description.substring(0, 60)}...`
                          : hostel.description}
                      </small>
                    </Card.Text>
                    <Badge bg={hostel.status === 1 ? "success" : "secondary"}>
                      {hostel.status === 1 ? "Active" : "Inactive"}
                    </Badge>
                  </Card.Body>

                  {/* Footer */}
                  <Card.Footer className="d-flex justify-content-between align-items-center">
                    <Link
                      to={`edit-hostel`}
                      className="btn btn-warning btn-sm"
                      state={{ hostel, page }}
                    >
                      Edit
                    </Link>
                    <Button variant="primary" size="sm" as={Link} to={`room`} state={{hostel}}>
                      View Rooms
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Pagination */}
          <Pagination className="mt-4 justify-content-center">
            {[...Array(totalPages).keys()].map((pageIndex) => (
              <Pagination.Item
                key={pageIndex}
                active={pageIndex === page.currentPage}
                onClick={() => handlePageChange(pageIndex)}
              >
                {pageIndex + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </>
      ) : (
        <div className="text-center">
          <p>No hostels found!</p>
        </div>
      )}
    </div>
  );
};

export default memo(ViewListHostel);
