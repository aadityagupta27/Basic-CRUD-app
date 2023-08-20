import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
// import { variables } from "./Variables";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./index.css";

const CRUD = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //   Adding New Char
  const [name, setName] = useState("");
  const [Class, setClass] = useState("");

  // Editing Char
  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");
  const [editClass, setEditClass] = useState("");

  // const empdata = [
  //   {
  //     id: 1,
  //     name: "Aaditya",
  //     Class: "Knight",
  //   },
  //   {
  //     id: 2,
  //     name: "abcd",
  //     Class: "Pawn",
  //   },
  //   {
  //     id: 3,
  //     name: "qwerty",
  //     Class: "Mage",
  //   },
  // ];

  const [data, setData] = useState([]); // api response of all characters

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("http://localhost:5265/api/Character/GetAll")
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
   
  // Modal --Getid link-- 
  const handleEdit = (id) => {
    // alert(id);
    handleShow();
    axios
      .get(`http://localhost:5265/api/Character/${id}`)
      .then((result) => {
        setEditName(result.data.name);
        setEditClass(result.data.class);
        setEditId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this character") === true) {
      axios
        .delete(`http://localhost:5265/api/Character/${id}`)
        .then((result) => {
          if (result.status === 200) {
            toast.success("Character has been deleted");
            getData();
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };
   
  // PUT
  const handleUpdate = () => {
    const url = "http://localhost:5265/api/Character";
    const data = {
      "id": editId,
      "name": editName,
      "class": editClass,
    };
    axios
      .put(url, data)
      .then((result) => {
        handleClose();
        getData();
        clear();
        toast.success("Character has been updated");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

    // POST
  const handleSave = () => {
    const url = "http://localhost:5265/api/Character";
    const data = {
      "name": name,
      "class": Class,
    };
    axios
      .post(url, data)
      .then((result) => {
        getData();
        clear();
        toast.success("Character has been added");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const clear = () => {
    setName("");
    setClass("");
    setEditName("");
    setEditClass("");
    setEditId("");
  };

  return (
    <Fragment>
      <ToastContainer />
      <Container>
        <div className="navbar">
          <Navbar fixed="top" bg="dark" variant="dark">
            <Container className="nbtext">
              <Navbar.Brand><h3>Character CRUD</h3></Navbar.Brand>
            </Container>
          </Navbar>
        </div>
        <Row>
          <h5>Create a Character</h5>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Class"
              value={Class}
              onChange={(e) => setClass(e.target.value)}
            />
          </Col>
          <Col>
            <button className="btn btn-primary" onClick={() => handleSave()}>
              Submit
            </button>
          </Col>
        </Row>
      </Container>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S.No</th>
            {/* <th>ID</th> */}
            <th>Name</th>
            <th>Class</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0
            ? data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    {/* <td>{item.id}</td> */}
                    <td>{item.name}</td>
                    <td>{item.class}</td>
                    <td colSpan={2}>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEdit(item.id)}
                      >
                        Edit
                      </button>
                      &nbsp;
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            : "Loading ..."}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Class"
                value={editClass}
                onChange={(e) => setEditClass(e.target.value)}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default CRUD;
