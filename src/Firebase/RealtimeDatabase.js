import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  onValue,
  child,
  push,
  update,
  remove,
} from "firebase/database";

const firebaseConfig = {
  databaseURL:
    " https://store-52177-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig, "otherApp");

const db = getDatabase(app);

// create database
export const createNewUserDataBase = (userId) => {
  const reference = ref(db, "users/" + userId);
  set(reference, {
    orders: ""
  });
};

// get user data by id
export const getUserData = (userId) => {
  const res = []
  const starCountRef = ref(db, "users/" + userId);
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    res.push(data);
  });
  return res[0];
};

// update user data
export function upDateUserOrders(id, data) {
  const newPostKey = push(child(ref(db), "orders")).key;
  const updates = {};
  updates["/users/" + id + "/orders/" + newPostKey] = data;
  return update(ref(db), updates);
}
