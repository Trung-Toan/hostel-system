import React, { memo, useState } from "react";
import {
  Table,
  Container,
  Spinner,
  Form,
  InputGroup,
  Button,
  Image,
  Row,
  Col,
  Pagination,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSessionStorage } from "../../ultil/useSessionStorage";
import {
  banAccount,
  unbanAccount,
  useGetAllUserByRole,
} from "../../controller/UserController";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ViewListAccount = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const [page, setPage] = useState({
    currentPage: 0,
    size: 12,
    search: "",
    sort: "id",
    direction: "asc",
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (account) =>
      account?.status === 1 ? banAccount(account.id) : unbanAccount(account.id),
    onSuccess: (data) => {
      const accountUpdate = data?.result || null;
      queryClient.setQueriesData(
        [
          `user_by_role_${page.currentPage}_${page.size}_${page.search}_${page.sort}_${page.direction}`,
        ],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: {
              ...oldData.data,
              result: {
                ...oldData.data.result,
                content: oldData.data.result.content.map((account) =>
                  account?.id === accountUpdate?.id ? accountUpdate : account
                ),
              },
            },
          };
        }
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Update account successfully!",
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

  const handleClick = (account) => {
    setSelectedAccount(account);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    if (selectedAccount) {
      mutate(selectedAccount);
    }
    setShowConfirm(false);
  };

  const userLogin = useSessionStorage("user");

  const targetRole =
    userLogin.role === "owner"
      ? "manager"
      : userLogin.role === "manager"
      ? "customer"
      : null;

  const { data: accountData, isLoading: loadingAccount } = useGetAllUserByRole(
    page?.currentPage,
    page.size,
    page.search,
    page.sort,
    page.direction,
    targetRole
  );

  const accountList = accountData?.data?.result?.content || [];
  const totalPages = accountData?.data?.result?.page?.totalPages || 1;

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const handleSort = (field) => {
    const newSortOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newSortOrder);
    setPage({ ...page, sort: field, direction: newSortOrder });
  };

  if (loadingAccount) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
        <p>Loading account list...</p>
      </Container>
    );
  }

  const handlePageChange = (newPage) => {
    setPage((prev) => ({
      ...prev,
      currentPage: newPage,
    }));
  };

  return (
    <Container className="mt-5 p-1">
      <h2 className="text-center mb-4">
        Account List {userLogin.role === 1 ? "User (Manager)" : "Customer"}
      </h2>
      <Row className="mb-4 justify-content-between">
        <Col md={4}>
          <Form.Group controlId="search">
            <Form.Label className="fw-bold">Search</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type="search"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <Button
                variant="outline-primary"
                onClick={() => {
                  setPage({ ...page, search: searchTerm });
                }}
              >
                Search
              </Button>
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>
      {/* Account List */}
      {accountList?.length > 0 ? (
        <>
          <Table striped bordered hover className="">
            <thead>
              <tr className="row">
                <th
                  className="col-md-1 text-center d-flex justify-content-center align-items-center"
                  onClick={() => handleSort("id")}
                  style={{ cursor: "pointer" }}
                >
                  ID {sortField === "id" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th className="col-md-2 text-center d-flex justify-content-center align-items-center">
                  Avatar
                </th>
                <th
                  className="col-md text-center d-flex justify-content-center align-items-center"
                  onClick={() => handleSort("fullName")}
                  style={{ cursor: "pointer" }}
                >
                  Full Name{" "}
                  {sortField === "fullName" &&
                    (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="col-md text-center d-flex justify-content-center align-items-center"
                  onClick={() => handleSort("email")}
                  style={{ cursor: "pointer" }}
                >
                  Email{" "}
                  {sortField === "email" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="col-md text-center d-flex justify-content-center align-items-center"
                  onClick={() => handleSort("phoneNumber")}
                  style={{ cursor: "pointer" }}
                >
                  Phone Number{" "}
                  {sortField === "phoneNumber" &&
                    (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th className="col-md-1 text-center d-flex justify-content-center align-items-center">
                  Status
                </th>
                <th className="col-md-1 text-center d-flex justify-content-center align-items-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {accountList?.map((account) => (
                <tr className="row" key={account.id}>
                  <td className="col-md-1 d-flex text-center justify-content-center align-items-center">
                    {account.id}
                  </td>
                  <td className="col-md-2 d-flex text-center justify-content-center align-items-center">
                    <Image
                      src={account.avatar}
                      alt="User Avatar"
                      roundedCircle
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td className="col-md text-center d-flex justify-content-center align-items-center">
                    {account.fullName}
                  </td>
                  <td className="col-md text-center d-flex justify-content-center align-items-center">
                    {account.email}
                  </td>
                  <td className="col-md text-center d-flex justify-content-center align-items-center">
                    {account.phoneNumber}
                  </td>
                  <td
                    className={`col-md-1 text-center d-flex justify-content-center align-items-center text-${
                      account.status === 1 ? "success" : "danger"
                    }`}
                  >
                    {account.status === 1 ? "Active" : "Inactive"}{" "}
                  </td>
                  <td className="col-md-1 text-center d-flex justify-content-center align-items-center">
                    <Button
                      size="sm"
                      variant={account.status === 1 ? "danger" : "success"}
                      onClick={() => handleClick(account)}
                    >
                      {account?.status === 1 ? "Ban" : "Active"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
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
        <div className="text-center mt-5">
          <p>No accounts have been created yet. Add a new account now!</p>
          <Link to={"/manager/create_account"} className="btn btn-primary">
            Add New Account
          </Link>
        </div>
      )}
      {/* Improved Modal */}
      <Modal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        centered
        className="font-sans"
      >
        <Modal.Header className="bg-gray-100 border-b border-gray-200">
          <Modal.Title className="text-lg font-semibold text-gray-800">
            Confirm Action
          </Modal.Title>
          <Button
            variant="link"
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setShowConfirm(false)}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        </Modal.Header>
        <Modal.Body className="p-6 bg-white">
          <p className="text-base text-gray-600">
            Are you sure you want to{" "}
            <strong className="text-gray-800">
              {selectedAccount?.status === 1 ? "ban" : "activate"}
            </strong>{" "}
            the account of{" "}
            <strong className="text-gray-800">{selectedAccount?.fullName}</strong>
            ?
          </p>
        </Modal.Body>
        <Modal.Footer className="bg-gray-100 border-t border-gray-200">
          <Button
            variant="outline-secondary"
            className="px-4 py-2 text-sm font-medium text-gray-600 border rounded"
            onClick={() => setShowConfirm(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default memo(ViewListAccount);