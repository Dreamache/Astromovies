import React from "react";
import { Button, Navbar, Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import { Link } from "react-router-dom"

const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Welcome to Astromovies</Navbar.Brand>
        </Container>
      </Navbar>

      <div className="p-4 box mt-3 text-center">
        Hello, Welcome to Astromovies! <br />
        {user && user.email}
      </div>
      <div class="col-md-12 text-center">
      <Link to="/AddMovie">
        <Button variant="primary">
          Entrar
        </Button>
      </Link>
      </div>
    </>
  );
};

export default Home;
