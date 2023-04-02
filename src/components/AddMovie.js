import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup, Carousel } from "react-bootstrap";
import MovieDataService from "../services/movie.services";
import {Link} from 'react-router-dom';
import {Container, Navbar, Nav} from "react-bootstrap";
import "../App.css";


const AddMovie = ({ id, setMovieId }) => {
  const [title, setTitle] = useState("");
  const [director, setdirector] = useState("");
  const [status, setStatus] = useState("Available");
  const [flag, setFlag] = useState(true);
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (title === "" || director === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newMovie = {
      title,
      director,
      status,
    };
    console.log(newMovie);

    try {
      if (id !== undefined && id !== "") {
        await MovieDataService.updateMovies(id, newMovie);
        setMovieId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await MovieDataService.addMovies(newMovie);
        setMessage({ error: false, msg: "New Movie added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setTitle("");
    setdirector("");
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await MovieDataService.getMovie(id);
      console.log("the record is :", docSnap.data());
      setTitle(docSnap.data().title);
      setdirector(docSnap.data().director);
      setStatus(docSnap.data().status);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);
  return (
    <>
    <div className="ml-1">
      <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Astromovies</Navbar.Brand>
        <Nav className="me-auto">
        <Nav.Link as={Link} to="/AddMovie">Insert Movies</Nav.Link>
        <Nav.Link as={Link} to="/MoviesList">Search</Nav.Link>
        <Nav.Link as={Link} to="/user">User</Nav.Link>
        </Nav>
      </Container>
      </Navbar>
      </div>
      
      <div className="p-4 box">
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formMovieTitle">
            <InputGroup>
              <InputGroup.Text id="formMovieTitle">M</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Movie Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="fromMoviedirector">
            <InputGroup>
              <InputGroup.Text id="fromMoviedirector">D</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Movie Director"
                value={director}
                onChange={(e) => setdirector(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <div class="col-md-12 text-center">
          <ButtonGroup aria-label="Basic example" className="mb-3">
            <Button
              disabled={flag}
              variant="success"
              onClick={(e) => {
                setStatus("Available");
                setFlag(true);
              }}
            >
              Available
            </Button>
            <Button
              variant="danger"
              disabled={!flag}
              onClick={(e) => {
                setStatus("Not Available");
                setFlag(false);
              }}
            >
              Not Available
            </Button>
          </ButtonGroup>
          </div>
          <div>
          <div class="col-md-12 text-center">
            <Button variant="primary" type="Submit">
              Add/ Update
            </Button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddMovie;
