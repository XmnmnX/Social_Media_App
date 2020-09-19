const admin = require("firebase-admin"); //admin import

admin.initializeApp();

const db = admin.firestore();

module.exports = { admin,db };