// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-DQ4FB-kL5kEBSCzs4QpTI_t_Tr9YiMA",
  authDomain: "flora-3e4ba.firebaseapp.com",
  databaseURL: "https://flora-3e4ba-default-rtdb.firebaseio.com",
  projectId: "flora-3e4ba",
  storageBucket: "flora-3e4ba.appspot.com",
  messagingSenderId: "826796194369",
  appId: "1:826796194369:web:bbb2a6e731c518ec1f64c0",
  measurementId: "G-NK64JRC44E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
