import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

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
const auth = getAuth();

/**********************auth */

//sign up (1)
export const signup = (email, password) => {
  const result = createUserWithEmailAndPassword(auth, email, password);
  return result;
};

// signup take userName (2)
export const signupUserName = (user, displayName) => {
  updateProfile(user, displayName);
};



// sign in
export const signIn = (email, password) => {
  const result = signInWithEmailAndPassword(auth, email, password);
  return result;
};

// reset password request
export const resetPassword = (email) => {
  const result = sendPasswordResetEmail(auth, email);
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



// update user profile
export const updateUserData = (updatedData) => {
  const user = getAuth().currentUser;
  updateProfile(user, updatedData);
};
