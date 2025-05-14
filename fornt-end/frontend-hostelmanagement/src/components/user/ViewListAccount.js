import React, { memo, useCallback, useState } from "react";
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
} from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import ViewRoomByHostel from "./ViewRoomByHostel";
import { Link } from "react-router-dom";
import { useSessionStorage } from "../../ultil/useSessionStorage";
import { useGetAllUserByRole } from "../../controller/UserController";
import { useGetAllHostel } from "../../controller/HostelController";

const ViewListAccount = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isLoadRoom, setIsLoadRoom] = useState();
  const [selectedHostel, setSelectedHostel] = useState("");
  const [filteredAccounts, setFilteredAccounts] = useState([]);

  const [page, setPage] = useState({
    currentPage: 0,
    size: 12,
    search: "",
    sort: "name",
    direction: "asc",
  });

  const handleChangeLoadingRoom = useCallback((stateLoading) => {
    setIsLoadRoom(stateLoading);
  }, []);

  const userLogin = useSessionStorage("user");

  const targetRole =
    userLogin.role === "owner"
      ? "manager"
      : userLogin.role === "manager"
      ? "customer"
      : null;

  const { data:accountData, isLoading:loadingAccount} = useGetAllUserByRole(page?.currentPage, page.size, page.search, page.sort, page.direction, targetRole);
  const {data:hostelData, isLoading:loadingHostel} = useGetAllHostel();

  const accountList = accountData?.data?.result || []; 
  const hostelList = hostelData?.data?.result || []; 

  console.log(hostelList);
  

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setSelectedHostel("");
    const results = accounts?.filter(
      (account) =>
        account.fullName.toLowerCase().includes(term.trim()) ||
        account.id.toString().includes(term.trim()) ||
        account.email.toLowerCase().includes(term.trim()) ||
        account.phoneNumber.includes(term.trim())
      // ||
      // hostel?.data?.some(
      //   (h) =>
      //     h.id === account.hostelID &&
      //     h.name.toLowerCase().includes(term.trim())
      // )
    );
    // setFilteredAccounts(results);
  };

  // Sort
  const handleSort = (field) => {
    const newSortOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newSortOrder);

    const sorted = [].sort((a, b) => {
      let aValue, bValue;

      if (field === "hostel") {
        // const hostelA = hostel?.data?.find((h) => h.id === a.hostelID);
        // const hostelB = hostel?.data?.find((h) => h.id === b.hostelID);
        // aValue = hostelA ? hostelA.name.toLowerCase() : "";
        // bValue = hostelB ? hostelB.name.toLowerCase() : "";
      } else {
        aValue = a[field] ? a[field].toString().toLowerCase() : "";
        bValue = b[field] ? b[field].toString().toLowerCase() : "";
      }

      if (newSortOrder === "asc") {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });
    // setFilteredAccounts(sorted);
  };

  const handleFilterByHostel = (e) => {
    const hostelId = e.target.value;
    setSelectedHostel(hostelId);
    setSearchTerm("");

    if (hostelId === "") {
      // setFilteredAccounts(accounts);
    } else {
      const filtered = accounts.filter(
        (account) => account.hostelID.toString() === hostelId
      );
      // setFilteredAccounts(filtered);
    }
  };

  const handleUpdateStatus = async (accountId, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    try {
      // Find the account in the current list
      const accountToUpdate = accounts.find(
        (account) => account.id === accountId
      );

      // Send PUT request to update status, keeping all other fields unchanged
      // await axios.put(`http://localhost:9999/user/${accountId}`, {
      //   ...accountToUpdate, // Retain all existing fields
      //   status: newStatus, // Only change status
      // });

      // Update status in state without changing other fields
      const updatedAccounts = accounts.map((account) =>
        account.id === accountId ? { ...account, status: newStatus } : account
      );

      // Update state with the modified account list
      setAccounts(updatedAccounts);
      // setFilteredAccounts(updatedAccounts);
    } catch (error) {}
  };

  const handleChangeHostel = (account, accountId, newHostelId) => {
    // axios
    //   .put(`http://localhost:9999/user/${accountId}`, {
    //     ...account,
    //     hostelID: newHostelId,
    //     updatedAt: getCurrentDateTime(),
    //   })
    //   .then(() => {
    //     const updatedAccounts = accounts.map((account) =>
    //       account.id === accountId
    //         ? { ...account, hostelID: newHostelId }
    //         : account
    //     );
    //     setUpdateMessage({
    //       type: "success",
    //       text: "Hostel changed successfully!",
    //     });
    //     setAccounts(updatedAccounts);
    //     setFilteredAccounts(updatedAccounts);
    //   })
    //   .catch(() => {
    //     setUpdateMessage({
    //       type: "error",
    //       text: "An error occurred while updating hostel!",
    //     });
    //   });
  };

  const handleChangeRoom = (acc, accountId, newRoomId) => {
    // axios
    //   .put(`http://localhost:9999/user/${accountId}`, {
    //     ...acc,
    //     roomID: newRoomId,
    //     updatedAt: getCurrentDateTime(),
    //   })
    //   .then(() => {
    //     const updatedAccounts = accounts.map((account) =>
    //       account.id === accountId ? { ...account, roomID: newRoomId } : account
    //     );
    //     setUpdateMessage({
    //       type: "success",
    //       text: "Room changed successfully!",
    //     });
    //     setAccounts(updatedAccounts);
    //     setFilteredAccounts(updatedAccounts);
    //   })
    //   .catch(() => {
    //     setUpdateMessage({
    //       type: "error",
    //       text: "An error occurred while updating room!",
    //     });
    //   });
  };

  if (loadingAccount || isLoadRoom) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
        <p>Loading account list...</p>
      </Container>
    );
  }

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
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <Button
                variant="outline-secondary"
                onClick={() => {
                  setSearchTerm("");
                  // setFilteredAccounts(accounts);
                }}
              >
                Clear Search
              </Button>
            </InputGroup>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="filterHostel">
            <Form.Label className="fw-bold">Filter by Hostel</Form.Label>
            <InputGroup className="mb-3">
              <Form.Select
                value={selectedHostel}
                onChange={handleFilterByHostel}
                aria-label="Filter by hostel"
              >
                <option value="">All Hostels</option>
                {hostelList?.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.name}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>
      {/* Account List */}
      { 1 > 0 ? (
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
              <th className="col-md-1 text-center d-flex justify-content-center align-items-center">
                Avatar
              </th>
              <th
                className="col-md-2 text-center d-flex justify-content-center align-items-center"
                onClick={() => handleSort("fullName")}
                style={{ cursor: "pointer" }}
              >
                Full Name{" "}
                {sortField === "fullName" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="col-md-2 text-center d-flex justify-content-center align-items-center"
                onClick={() => handleSort("email")}
                style={{ cursor: "pointer" }}
              >
                Email{" "}
                {sortField === "email" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>

              <th
                className="col-md-1 text-center d-flex justify-content-center align-items-center"
                onClick={() => handleSort("phoneNumber")}
                style={{ cursor: "pointer" }}
              >
                Phone Number{" "}
                {sortField === "phoneNumber" &&
                  (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="col-md text-center d-flex justify-content-center align-items-center"
                onClick={() => handleSort("hostel")}
                style={{ cursor: "pointer" }}
              >
                Hostel{" "}
                {sortField === "hostel" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>

              <th
                className={`${
                  userLogin.role !== "manager" ? "d-none" : ""
                } col-md text-center d-flex justify-content-center align-items-center`}
              >
                Room
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
                <td className="col-md-1 d-flex text-center justify-content-center align-items-center">
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
                <td className="col-md-2 text-center d-flex justify-content-center align-items-center">
                  {account.fullName}
                </td>
                <td className="col-md-2 text-center d-flex justify-content-center align-items-center">
                  {account.email}
                </td>
                <td className="col-md-1 text-center d-flex justify-content-center align-items-center">
                  {account.phoneNumber}
                </td>
                <td className="col-md d-flex text-center justify-content-center align-items-center">
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) =>
                      handleChangeHostel(account, account.id, e.target.value)
                    }
                  >
                    {hostelList?.map((h) => (
                      <option
                        key={h.id}
                        value={h.id}
                        selected={h?.manager?.id === account.id}
                      >
                        {h.name}
                      </option>
                    ))}
                  </Form.Select>
                </td>
                <td
                  className={`${
                    userLogin.role !== "manager" ? "d-none" : ""
                  } col-md d-flex text-center justify-content-center align-items-center`}
                >
                  <ViewRoomByHostel
                    hId={account.hostelID}
                    handleChangeLoadingRoom={handleChangeLoadingRoom}
                    // handleChangeErrorRoom={handleChangeErrorRoom}
                    rId={account.roomID}
                    accountId={account.id}
                    account={account}
                    handleChangeRoom={handleChangeRoom}
                  />
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
                    onClick={() =>
                      handleUpdateStatus(account.id, account.status)
                    }
                  >
                    {account.status === 1 ? "Ban" : "Active"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div className="text-center mt-5">
          <p>No accounts have been created yet. Add a new account now!</p>
          <Link to={"/manager/create_account"} className="btn btn-primary">
            Add New Account
          </Link>
        </div>
      )}
    </Container>
  );
};

export default memo(ViewListAccount);
