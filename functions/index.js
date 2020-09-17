const functions = require("firebase-functions");
const admin = require("firebase-admin"); //admin import
const app = require("express")();
admin.initializeApp(); //usually pass the project id in parameter but in fitebaserc project default id already given

const config = {
  apiKey: "AIzaSyD79FIgh2C4t9ivPulviWk6ICPZwDzgosI",
  authDomain: "socialape-fff4a.firebaseapp.com",
  databaseURL: "https://socialape-fff4a.firebaseio.com",
  projectId: "socialape-fff4a",
  storageBucket: "socialape-fff4a.appspot.com",
  messagingSenderId: "960780037836",
  appId: "1:960780037836:web:0bd0852b8f6d0978f49c69",
  measurementId: "G-W7N3EX04JG",
};

const firebase = require("firebase");
const { json } = require("express");
firebase.initializeApp(config);

const db = admin.firestore();

app.get("/screams", (req, res) => {
  db.collection("screams")
    .orderBy("createdAt", "desc")
    .get() //in order to access to database we have use admin.
    .then((data) => {
      let screams = [];
      data.forEach((doc) => {
        screams.push({
          screamId: doc.id,
          ...doc.data(),
        });
      });
      return res.json(screams);
    })
    .catch((err) => console.error(err));
});

app.post("/scream", (req, res) => {
  //this function will post data to the database

  const newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString(),
  };

  db.collection("screams")
    .add(newScream)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: "somethings went wrong" });
      console.error(err);
    });
});

//Signup route
app.post("/signup", (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  };

  // TODO: validate data
  let token, userId;
  db.doc(`/users/${newUser.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ handle: "this handle is already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId
      };
      return db.doc(`/users/${newUser.handle}`).set(userCredentials)    //handle as a document ID
    })
    .then(() => {
      return res.status(201).json({token});
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: "email is already in use" });
      } else {
        return res.status(500).json({ error: err.code });
      }
    });
});

exports.api = functions.region("asia-southeast2").https.onRequest(app);
