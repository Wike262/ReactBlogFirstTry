const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({
 origin: true,
});
const firebase = require('firebase')
var serviceAccount = require('c:/Users/kiril/Downloads/my-app-dd6a6-firebase-adminsdk-7dpy0-6b99140b7d.json');

admin.initializeApp({
 credential: admin.credential.cert(serviceAccount),
 databaseURL: "https://my-app-dd6a6.firebaseio.com",
 storageBucket: 'my-app-dd6a6.appspot.com',
});
const path = require('path');

firebase.initializeApp({
 apiKey: 'AIzaSyAjyavp9xjnfj6mXmb9GfuQlSx64xaVl_Q',
 authDomain: 'my-app-dd6a6.firebaseapp.com',
 projectId: 'my-app-dd6a6'
})
let db = firebase.firestore();
var bucket = admin.storage().bucket();

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
 const postID = req.query.id

 return cors(req, res, () => {
  db.collection('posts').doc('' + postID)
   .get()
   .then((response) => {
    res.status(200).send(response.data())
   })
   .catch((error) => {
    res.status(406).send(error)
   })
 })
})

exports.administration = functions.https.onRequest(async (req, res) => {
 const userID = req.query.id;

 return cors(req, res, () => {
  admin.auth().setCustomUserClaims(userID, { admin: true });
  res.status(200).send('Success');
 });
});

function updateName(id, status) {
 admin.auth().updateUser(id, {
  displayName: status,
 })
  .then(() => {
   return
  })
  .catch((error) => {
   console.log(error)
   return error
  })
}

function updateAvatar(id, status) {
 status = 'https://firebasestorage.googleapis.com/v0/b/my-app-dd6a6.appspot.com/o/profilePictures%2F' + status + '?alt=media';
 admin.auth().updateUser(id, {
  photoURL: status,
 })
  .then(() => {
   return
  })
  .catch((error) => {
   console.log(error)
   return error
  })
}

function updateEmail(id, status) {
 admin.auth().updateUser(id, {
  email: status,
 })
  .then(() => {
   return
  })
  .catch((error) => {
   console.log(error)
   return error
  })
}

function updatePhone(id, status) {
 if (status[0] === '8' || status[0] === '7') {
  status = '+7' + status.slice(1)
  console.log(status)
 }
 admin.auth().updateUser(id, {
  phoneNumber: status,
 })
  .then(() => {
   return
  })
  .catch((error) => {
   console.log(error)
   return error
  })
}

exports.updateUserInformation = functions.https.onRequest(async (req, res) => {
 const userID = req.query.id;
 const name = req.query.name;
 const phone = req.query.phone;
 const email = req.query.email;
 console.log(req.query.email)

 const avatar = req.query.avatarURL;
 return cors(req, res, () => {
  if (name === '0' ? false : true) { updateName(userID, name) }
  if (email === '0' ? false : true) { updateEmail(userID, email) }
  if (avatar === '0' ? false : true) { updateAvatar(userID, avatar) }
  if (phone === '0' ? false : true) { updatePhone(userID, phone) }
 })
})