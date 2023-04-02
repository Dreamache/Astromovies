import { db } from "../firebase-config";

import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    doc,
  } from "firebase/firestore";

const userCollectionRef = collection(db, "User");
class UserDataService {
  addUsers = (newUser) => {
    return addDoc(userCollectionRef, newUser);
  };

  updateUser = (id, updatedUser) => {
    const userDoc = doc(db, "User", id);
    return updateDoc(userDoc, updatedUser);
  };

  getAllUsers = () => {
    return getDocs(userCollectionRef);
  };

  getUser = (id) => {
    const userDoc = doc(db, "User", id);
    return getDoc(userDoc);
  };
}

export default new UserDataService();