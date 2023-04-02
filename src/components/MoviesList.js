import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import MovieDataService from "../services/movie.services";
import Modal from 'react-bootstrap/Modal';
import {Link} from 'react-router-dom';
import { Container, Navbar, Nav } from "react-bootstrap";
import "../App.css";


const MoviesList = ({ getMovieId }) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getMovie();
  }, []);

  const getMovie = async () => {
    const data = await MovieDataService.getAllMovies();
    console.log(data.docs);
    setMovies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await MovieDataService.deleteMovie(id);
    getMovie();
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

      <div className="mb-2">
        <Button variant="dark edit" onClick={getMovie}>
          Refresh List
        </Button>
      </div>

      {/* <pre>{JSON.stringify(movies, undefined, 2)}</pre>} */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Movie Title</th>
            <th>Movie Director</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.title}</td>
                <td>{doc.director}</td>
                <td>{doc.status}</td>
                <td>
                <Link to="/AddMovie">
                  <Button
                    variant="secondary"
                    className="edit"
                    onClick={(e) => getMovieId(doc.id)}
                  >
                    Edit
                  </Button>
                  </Link>

      <Button variant="danger" onClick={handleShow}>
        Delete
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this movie?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary"onClick={(e) => deleteHandler(doc.id)}>Delete</Button>
        </Modal.Footer>
      </Modal>
      
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default MoviesList;
