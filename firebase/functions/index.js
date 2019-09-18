const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({
 origin: true,
});
const firebase = require('firebase')
let db = firebase.firestore();
var serviceAccount = require('c:/Users/kiril/Downloads/my-app-dd6a6-firebase-adminsdk-7dpy0-443397d60c.json');

var app = admin.initializeApp({
 credential: admin.credential.cert(serviceAccount),
 databaseURL: "https://my-app-dd6a6.firebaseio.com"
});


exports.author = functions.https.onRequest(async (req, res) => {
 const id = req.query.id;

 return cors(req, res, () => {
  admin.auth().getUser(id)
   .then((userRecord) => {
    res.send(userRecord.toJSON())
   })
   .catch((error) => {
    res.status(406).send(error)
   })
 })
})

exports.post = functions.https.onRequest(async (req, res) => {
 const postId = req.query.id
 return cors(req, res, () => {
  db.collection('posts').doc('' + postID)
   .get()
   .then((Post) => {
    res.status(200).send(Post.toJSON())
   })
   .catch((error) => {
    res.status(406).send(error)
   })
 })
})