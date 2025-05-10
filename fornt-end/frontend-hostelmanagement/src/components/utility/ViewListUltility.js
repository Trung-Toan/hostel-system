import React, { memo, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import {
  updateUtility,
  useGetAllUtility,
} from "../../controller/UtilityController";
import Swal from "sweetalert2";

const ViewListUtility = () => {
  const [filterData, setFilterData] = useState({
    search: "",
    sort: "name",
    direction: "ASC",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = useGetAllUtility(filterData);

  const utilityList = data?.data?.result || [];

  const queryClient = useQueryClient();
  const location = useLocation();

  const urlPath = location.pathname.includes("manager") ? "manager" : "owner";

  const { mutate } = useMutation({
    mutationFn: (payload) => updateUtility(payload?.id, payload),
    onSuccess: () => {
      queryClient.refetchQueries([
        `utilities_search${filterData?.search}_sort${filterData?.sort}_direction${filterData?.direction}`,
      ]);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Utility status changed successfully!",
        timer: 3000,
        showConfirmButton: true,
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

  const handleSubmitSearch = () => {
    setFilterData((prev) => ({
      ...prev,
      search: searchTerm,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-5 mt-5">
        <h2 className="fw-bold">Utility Management</h2>
        <Link
          to={`/${urlPath}/create_utilities`}
          state={filterData}
          className="btn btn-success"
        >
          Create New Utility
        </Link>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <InputGroup style={{ width: "30%" }}>
          <Form.Control
            type="search"
            name="searchTerm"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="primary" onClick={handleSubmitSearch}>
            Search
          </Button>
        </InputGroup>

        <Form.Group controlId="sortOrder" className="d-flex align-items-center">
          <Form.Label className="mb-0 me-2">Sorted by name:</Form.Label>
          <Form.Select
            value={filterData.direction}
            name="direction"
            onChange={(e) => handleChange(e)}
            className="w-auto"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Form.Select>
        </Form.Group>
      </div>
      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Table
          bordered
          striped
          responsive
          hover
          className="align-middle shadow-sm mt-3"
        >
          <thead className="table-primary text-center">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {utilityList && utilityList.length > 0 ? (
              utilityList?.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>
                    {item.status === 1 ? (
                      <span className="text-success">Active</span>
                    ) : (
                      <span className="text-danger">Inactive</span>
                    )}
                  </td>
                  <td>
                    <Row className="justify-content-center">
                      <Col xs={"auto"} className="justify-content-start">
                        <Button
                          variant={item.status === 1 ? "secondary" : "success"}
                          onClick={() =>
                            mutate({
                              ...item,
                              status: item.status === 1 ? 0 : 1,
                            })
                          }
                        >
                          {item.status === 1 ? "Deactivate" : "Activate"}
                        </Button>
                      </Col>
                      <Col xs={"auto"} className="justify-content-end">
                        <Link
                          state={filterData}
                          className="btn btn-warning"
                          to={`edit_utility/${item.id}`}
                        >
                          Edit
                        </Link>
                      </Col>
                    </Row>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center">
                <td colSpan="5">No utilities available</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default memo(ViewListUtility);
