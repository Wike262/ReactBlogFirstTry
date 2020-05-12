var admin = require("firebase-admin");
var functions = require("firebase-functions");

var nodemailer = require("nodemailer");
var firebase = require("firebase");

admin.initializeApp({
 credential: admin.credential.applicationDefault(),
 databaseURL: "https://my-app-dd6a6.firebaseio.com",
 storageBucket: "my-app-dd6a6.appspot.com",
});

firebase.initializeApp({
 apiKey: "AIzaSyAjyavp9xjnfj6mXmb9GfuQlSx64xaVl_Q",
 authDomain: "my-app-dd6a6.firebaseapp.com",
 projectId: "my-app-dd6a6",
});
let db = firebase.firestore();

exports.author = functions.https.onCall((data, context) => {
 const id = data.id;

 return admin
  .auth()
  .getUser(id)
  .then((userRecord) => userRecord)
  .catch((error) => error);
});

exports.posts = functions.https.onCall((data, context) => {
 const postID = data.postID || null;
 const all = data.all || false;

 if (postID !== null) {
  return db
   .collection("posts")
   .doc(`${postID}`)
   .get()
   .then((doc) => doc.data())
   .catch((error) => error);
 }
 if (all === true) {
  let posts = {};
  return db
   .collection("posts")
   .get()
   .then((querySnapshot) =>
    querySnapshot.forEach((doc) => (posts[`${doc.id}`] = doc.data()))
   )
   .then(() => {
    return posts;
   })
   .catch((error) => error);
 }
 return { error: 'NotSpecifietCalling' }
});



exports.updateUserInformation = functions.https.onCall((data, context) => {
 const callingUserID = context.auth.uid
 const userID = data.uid
 return admin.auth().getUser(userID).then((userRecord) => {
  const ProfileDisplayName = data.name || userRecord.displayName
  const ProfilePhoneNumber = data.phone || userRecord.phoneNumber
  const ProfileEmail = data.email || userRecord.email
  const ProfilePhotoURL = data.avatarURL || userRecord.photoURL
  const ProfileDisabled = data.disabled || userRecord.disabled
  return admin.auth()
   .updateUser(userID, {
    displayName: ProfileDisplayName,
    email: ProfileEmail,
    phoneNumber: ProfilePhoneNumber,
    photoURL: ProfilePhotoURL,
    disabled: ProfileDisabled
   })
   .then(userRecord => {
    return userRecord
   })
   .catch(error => error);


 }).catch(error => { return error })
})


exports.administration = functions.https.onRequest(async (req, res) => {
 const userID = req.query.id;

 return cors(req, res, () => {
  admin.auth().setCustomUserClaims(userID, { admin: true });
  res.status(200).send("Success");
 });
});


exports.AllUsers = functions.https.onRequest(async (req, res) => {
 var users = [];

 var i = 0;

 return cors(req, res, () => {
  return admin
   .auth()
   .listUsers()
   .then((listUsersResult) => {
    listUsersResult.users.map((user) => {
     users[i] = user;
     i++;
    });
    res.status(200).send(users);
    return res.status(200).send(users);
   })
   .catch((error) => {
    console.log(error);
   });
 });
});
