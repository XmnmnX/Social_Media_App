const functions = require("firebase-functions");

const app = require("express")();

const FBAuth  = require('./util/fbAuth')

const { getAllScreams, postOneScream } = require("./handlers/screams");
const { signup, login, uploadImage } = require('./handlers/user');

// Screams routes
app.get("/screams", getAllScreams);
app.post("/scream", FBAuth, postOneScream);

//User routes
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", FBAuth, uploadImage);


exports.api = functions.region("asia-southeast2").https.onRequest(app);