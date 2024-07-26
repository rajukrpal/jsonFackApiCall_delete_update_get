

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { deleteData, getData, editData } from "./data";
import { MdEdit, MdDeleteForever, MdVerified } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { IoSearchOutline } from "react-icons/io5";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const User = () => {
  const [allGetData, setAllGetData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ title: "", completed: false });
  const [showModal, setShowModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData();
        setAllGetData(response);
        setFilteredData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const searchResult = allGetData.filter((user) =>
      user.title.toLowerCase().includes(query.toLowerCase()) ||
      user.id.toString().includes(query)
    );
    setFilteredData(searchResult);
  }, [query, allGetData]);

  const handleDelete = async () => {
    try {
      if (userToDelete) {
        const response = await deleteData(userToDelete);
        console.log(response.message);

        if (response.success) {
          setAllGetData((prevData) => prevData.filter((user) => user.id !== userToDelete));
          setFilteredData((prevData) =>
            prevData.filter((user) => user.id !== userToDelete)
          );
          setShowConfirmDelete(false);
        } else {
          console.error(response.message);
        }
      }
    } catch (error) {
      console.error("Error in handleDelete:", error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ title: user.title, completed: user.completed });
    setShowModal(true);
  };

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedUser = { ...editingUser, ...formData };
      const response = await editData(updatedUser);
      console.log(response.message);

      if (response.success) {
        setAllGetData((prevData) =>
          prevData.map((item) =>
            item.id === updatedUser.id ? response.data : item
          )
        );
        setFilteredData((prevData) =>
          prevData.map((item) =>
            item.id === updatedUser.id ? response.data : item
          )
        );
        setShowModal(false);
        setEditingUser(null);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-end px-5">
        <Link to="/">Go To home page</Link>
      </div>
      <center className="py-3 text-3xl">User List</center>

      <div className="flex items-center border border-gray-300 rounded-lg p-2 w-full max-w-md mx-auto bg-white shadow-sm">
        <input
          type="search"
          value={query}
          onChange={handleChange}
          placeholder="Search..."
          className="flex-grow p-2 text-gray-700 border-0 focus:ring-0 outline-none"
        />
        <IoSearchOutline className="text-gray-500 ml-2 text-xl" />
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  name="completed"
                  checked={formData.completed}
                  onChange={handleFormChange}
                  className="form-check-input"
                />
                Completed
              </label>
            </div>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
              <Button variant="primary" type="submit" className="ms-2">
                Save changes
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={showConfirmDelete} onHide={() => setShowConfirmDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this user?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmDelete(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="py-4"></div>
      <div className="h-[78vh] border border-black rounded-lg overflow-scroll">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>UserId</th>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((user, index) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.userId}</td>
                <td>{user.title}</td>
                <td>
                  <div className="flex gap-2">
                    <Button
                      variant="outline-primary"
                      onClick={() => handleEdit(user)}
                    >
                      <MdEdit size={23} />
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={() => {
                        setUserToDelete(user.id); // Set the user ID to delete
                        setShowConfirmDelete(true); // Show the confirmation modal
                      }}
                    >
                      <MdDeleteForever size={23} />
                    </Button>
                    <span>
                      {user.completed ? (
                        <MdVerified color="green" size={23} />
                      ) : (
                        <RxCross2 color="red" size={23} />
                      )}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default User;

