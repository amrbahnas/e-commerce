import { toast } from "react-toastify";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  updateEmail,
  updatePassword,
  deleteUser,
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
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
  const result = updateProfile(user, updatedData);
  return result;
};

// update user email
export const updateUserEmail = (newEmail) => {
  const user = getAuth().currentUser;
  const result = updateEmail(user, newEmail);
  return result;
};

// update user password
export const updateUserPassword = (Newpassword) => {
  const user = getAuth().currentUser;
  updatePassword(user, Newpassword)
    .then((res) => {
      toast.success("password Updated successfully ", {
        autoClose: 3000,
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        theme: "colored",
      });
    })
    .catch((err) => {
      toast.error(err.message, {
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "colored",
      });
    });
};

// delete user
export const deleteUserAccount = () => {
  const user = getAuth().currentUser;
  const result = deleteUser(user);
  return result;
};

/********* new features ******* */

// facebook Login

export const facebookLogin = () => {
  const provider = new FacebookAuthProvider();
  provider.addScope("user_birthday");
  auth.languageCode = "it";
  provider.setCustomParameters({
    display: "popup",
  });
  const result = signInWithPopup(auth, provider);
  return result;
};

// google Login
export const googleLogin = () => {
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  auth.languageCode = "it";
  provider.setCustomParameters({
    login_hint: "user@example.com",
  });
  const result = signInWithPopup(auth, provider);
  return result;
};
