const { db } = require('../util/admin')

exports.getAllScreams = (req, res) => {
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
  }

 exports.postOneScream = (req, res) => {
  //this function will post data to the database
  if (req.body.body.trim() === "") {
    return res.status(400).json({ body: "Body must not be empty" });
  }

  const newScream = {
    body: req.body.body,
    userHandle: req.user.handle,
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
}