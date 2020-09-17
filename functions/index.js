const functions = require("firebase-functions");
const admin = require("firebase-admin"); //admin import

admin.initializeApp(); //usually pass the project id in parameter but in fitebaserc project default id already given

const express = require("express");
const app = express();

app.get("/screams", (req, res) => {
  admin
    .firestore()
    .collection("screams")
    .orderBy('createdAt', 'desc')
    .get() //in order to access to database we have use admin.
    .then((data) => {
      let screams = [];
      data.forEach((doc) => {
        screams.push({
          screamId: doc.id,
          ...doc.data()
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

  admin
    .firestore()
    .collection("screams")
    .add(newScream)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: "somethings went wrong" });
      console.error(err);
    });
});

// https://baseurl.com/api/

exports.api = functions.region('asia-southeast2').https.onRequest(app);
