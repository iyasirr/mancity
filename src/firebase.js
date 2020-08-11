import firebase from "firebase/app";
import "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBF47gSfHzXqRGjC8cbNil8oUlLOJpJt3A",
  authDomain: "react-mcity-c3dd5.firebaseapp.com",
  databaseURL: "https://react-mcity-c3dd5.firebaseio.com",
  projectId: "react-mcity-c3dd5",
  storageBucket: "react-mcity-c3dd5.appspot.com",
  messagingSenderId: "213630662924",
  appId: "1:213630662924:web:33e44e85325686336b3129",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();

const dbMatches = db.ref("matches");
const dbPlayers = db.ref("players");
const dbPositions = db.ref("positions");
const dbPromotions = db.ref("promotions");
const dbTeams = db.ref("teams");

export {
  auth,
  db,
  storage,
  dbMatches,
  dbPlayers,
  dbPositions,
  dbPromotions,
  dbTeams,
};
