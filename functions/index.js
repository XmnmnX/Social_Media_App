const functions = require('firebase-functions');
const admin = require('firebase-admin'); //admin import

admin.initializeApp(); //usually pass the project id in parameter but in fitebaserc project default id already given

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

 exports.helloWorld = functions.https.onRequest((request, response) => {
   functions.logger.info("Hello logs!", {structuredData: true});
   response.send("Hello from Firebase!");
 });

 exports.getScreams = functions.https.onRequest((req,res) => {  //this function get data from the database 
  admin.firestore().collection('screams').get() //in order to access to database we have use admin.
  .then(data => {
    let screams = [];
    data.forEach(doc => {
      screams.push(doc.data());
    });
    return res.json(screams);
  })
  .catch(err => console.error(err));
 })

 exports.createScream = functions.https.onRequest((req,res) => { //this function will post data to the database
  if(req.method !== 'POST'){
    return res.status(400).json({error: 'Method not allowed'});
  }
  const newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: admin.firestore.Timestamp.fromDate(new Date())
  };

  admin
  .firestore()
  .collection('screams')
  .add(newScream)
  .then(doc => {
    res.json({message: `document ${doc.id} created successfully`});
  })
  .catch(err => {
    res.status(500).json({error: 'somethings went wrong'});
    console.error(err);
  });
 });