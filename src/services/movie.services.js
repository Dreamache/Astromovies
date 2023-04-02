import { db } from "../firebase-config";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const movieCollectionRef = collection(db, "movies");
class MovieDataService {
  addMovies = (newMovie) => {
    return addDoc(movieCollectionRef, newMovie);
  };

  updateMovies = (id, updatedMovie) => {
    const movieDoc = doc(db, "movies", id);
    return updateDoc(movieDoc, updatedMovie);
  };

  deleteMovie = (id) => {
    const movieDoc = doc(db, "movies", id);
    return deleteDoc(movieDoc);
  };

  getAllMovies = () => {
    return getDocs(movieCollectionRef);
  };

  getMovie = (id) => {
    const movieDoc = doc(db, "movies", id);
    return getDoc(movieDoc);
  };
}

export default new MovieDataService();
