
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyBHA--LWpjxVnO__6SWi-_cigfe-uzgBrI",
  authDomain: "store-52177.firebaseapp.com",
  projectId: "store-52177",
  storageBucket: "store-52177.appspot.com",
  messagingSenderId: "324994067751",
  appId: "1:324994067751:web:551a5a55a3f88ebf91cd02",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

// Create a storage reference from our storage service

// 'file' comes from the Blob or File API
export const uploadUserImage = (file, randomString) => {
  const ImgRef = ref(
    storage,
    "users-Profiles-Images/" + file.name + randomString
  );
  uploadBytes(ImgRef, file).then((snapshot) => {
    console.log("Uploaded a blob or file!", snapshot);
  });
};

export const dowunloadUserImage = (imageName) => {
  const result = getDownloadURL(
    ref(storage, "users-Profiles-Images/" + imageName)
  );
  return result;
};
