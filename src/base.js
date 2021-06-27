import Rebase from "re-base";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

export const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBocibr8L9VcGYAtqXOUVTuGb60T6By4v8",
  authDomain: "very-hot-burgers-a370f.firebaseapp.com",
  databaseURL: "https://very-hot-burgers-a370f-default-rtdb.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());
export default base;
