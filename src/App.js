import { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Home from "./components/Home";
import Login from "./components/Login"
import Signup from "./components/Signup"
import { Navbar, Container } from "react-bootstrap";

import AddMovie from "./components/AddMovie";
import MoviesList from "./components/MoviesList";
import User from "./components/User"
import "./App.css";

function App() {
  const [movieId, setMovieId] = useState("");

  const getMovieIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setMovieId(id);
  };
  return (
    <>
          <UserAuthContextProvider>
            <Routes>
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/AddMovie" element={<AddMovie id={movieId} setMovieId={setMovieId} />}></Route>
              <Route path="/Movieslist" element={<MoviesList getMovieId={getMovieIdHandler} />}></Route>
              <Route path="/user" element={<User/>}></Route>
            </Routes>
          </UserAuthContextProvider>


    </>
  );
}

export default App;
