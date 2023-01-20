// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
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

// get data base
export const db = getFirestore();

// get collection from db
export const products = collection(db, "products");
export const category = collection(db, "categories");

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
  });
};
