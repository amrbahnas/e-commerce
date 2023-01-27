// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

// authentication

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHA--LWpjxVnO__6SWi-_cigfe-uzgBrI",
  authDomain: "store-52177.firebaseapp.com",
  projectId: "store-52177",
  storageBucket: "store-52177.appspot.com",
  messagingSenderId: "324994067751",
  appId: "1:324994067751:web:551a5a55a3f88ebf91cd02",
};

// Initialize Firebase
initializeApp(firebaseConfig);

// init services
export const db = getFirestore();
const auth = getAuth();

// get collection from db
export const products = collection(db, "products");
export const category = collection(db, "categories");

// add new product
export const addProduct = (data) => {
  addDoc(products, {
    title: data.title,
    des: data.des,
    img: data.img,
    img2: data.img2,
    price: data.price,
    category: data.category,
    sub_category: data.sub_category,
    isNew: data.isNew,
    type: data.type,
    createdAt: serverTimestamp(),
  });
};

// update product
export const updataProduct = (id, newData) => {
  let docRef = doc(db, "products", id);
  updateDoc(docRef, newData);
};

// delete product
export const deleteProduct = (id) => {
  let docRef = doc(db, "products", id);
  deleteDoc(docRef);
};

/**********************auth */

//sign up
export const signup = (email, password, firstName) => {
  const result = createUserWithEmailAndPassword(
    auth,
    email,
    password,
    firstName
  );
  return result;
};

// sign in
export const signIn = (email, password) => {
  const result = signInWithEmailAndPassword(auth, email, password);
  return result;
};

// reset password request
export const resetPassword = (email) => {
 const result=  sendPasswordResetEmail(auth, email)
    return result;
};
// logout

export const logOut = () => {
  signOut(auth)
    .then(() => {
      console.log("user logged out");
    })
    .catch((err) => {
      console.log(err);
    });
};
