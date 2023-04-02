import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import React, { useState } from "react";
import UserDataService from "../services/user.services";
import {Link} from 'react-router-dom';
import { Container, Navbar, Nav } from "react-bootstrap";


const User = ({ id, setUserId }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [message, setMessage] = useState({ error: false, msg: "" });

const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (email === "" || password === "") {
    setMessage({ error: true, msg: "All fields are mandatory!" });
    return;
    }

    const newUser = {
    email,
    password,
    address,
    address2,
    city,
    zip,
    };
    console.log(newUser);

    try {
        if (id !== undefined && id !== "") {
          await UserDataService.updateUser(id, newUser);
          setUserId("");
          setMessage({ error: false, msg: "Updated successfully!" });
        } else {
          await UserDataService.addUsers(newUser);
          setMessage({ error: false, msg: "New Book added successfully!" });
        }
      } catch (err) {
        setMessage({ error: true, msg: err.message });
      }
  
    setEmail("");
    setPassword("");
    setAddress("");
    setAddress2("");
    setCity("");
    setZip("");
}; 
  return (
    <>
    <div>
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

    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control 
          type="email" 
          placeholder="Enter email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Address</Form.Label>
        <Form.Control 
        placeholder="1234 Main St" 
        value={address}
        onChange={(e) => setAddress(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control 
        placeholder="Apartment, studio, or floor" 
        value={address2}
        onChange={(e) => setAddress2(e.target.value)}/>
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control 
          value={city}
          onChange={(e) => setCity(e.target.value)}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control 
          value={zip}
          onChange={(e) => setZip(e.target.value)}/>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      
      <div class="col-md-12 text-center">
      <Button variant="primary" type="submit">
        Submit
      </Button>
      </div>
    </Form>

    </>
  );
}

export default User;