import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDO5YcqXk5nhPT2OXyCScTamwmedBEFxTE",

  authDomain: "collabrianexus.firebaseapp.com",

  projectId: "collabrianexus",

  storageBucket: "collabrianexus.firebasestorage.app",

  messagingSenderId: "1047185526287",

  appId: "1:1047185526287:web:ada10cb1be8c92c0799d7a",

  measurementId: "G-PNZLHYBXYT"

};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);