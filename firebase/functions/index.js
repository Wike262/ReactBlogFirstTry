var admin = require('firebase-admin');
var functions = require('firebase-functions');

var nodemailer = require('nodemailer');
var firebase = require('firebase');

admin.initializeApp({
 credential: admin.credential.applicationDefault(),
 databaseURL: 'https://my-app-dd6a6.firebaseio.com',
 storageBucket: 'my-app-dd6a6.appspot.com',
});

firebase.initializeApp({
 apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
 authDomain: 'my-app-dd6a6.firebaseapp.com',
 projectId: 'my-app-dd6a6',
});
let db = firebase.firestore();

exports.author = functions.https.onCall((data, context) => {
 const id = data.id || null;
 const uid = context.auth.uid || null;
 if (id !== null) {
  return admin
   .auth()
   .getUser(id)
   .then((userRecord) => userRecord)
   .catch((error) => error);
 }
 if (uid !== null) {
  return admin
   .auth()
   .getUser(uid)
   .then((userRecord) => userRecord)
   .catch((error) => error);
 }
});

exports.tagInfo = functions.https.onCall((data, context) => {
 const tag = data.tag;
 const all = data.all || null;
 const count = data.count || null;

 if (count === true) {
  let counting = 0;
  return db
   .collection('tags')
   .get()
   .then((querySnapshot) => querySnapshot.forEach((doc) => counting++))
   .then(() => {
    return counting;
   })
   .catch((error) => error);
 }
 if (all !== null) {
  let tags = {};
  return db
   .collection('tags')
   .get()
   .then((querySnapshot) =>
    querySnapshot.forEach((doc) => (tags[`${doc.id}`] = doc.data())),
   )
   .then(() => {
    return tags;
   })
   .catch((error) => error);
 } else {
  return db
   .collection('tags')
   .doc(`${tag.toLowerCase()}`)
   .get()
   .then((doc) => doc.data())
   .catch((error) => error);
 }
});

exports.posts = functions.https.onCall((data, context) => {
 const postID = data.postID || null;
 const all = data.all || false;
 const tag = data.tag || null;
 const count = data.count || null;
 const page = data.page || null;
 if (postID !== null) {
  return db
   .collection('posts')
   .doc(`${postID}`)
   .get()
   .then((doc) => doc.data())
   .catch((error) => error);
 }
 if (tag !== null) {
  let posts = {};
  if (page !== null) {
   let posts = {};
   let i = 0;
   return db
    .collection('posts')
    .where('tag', '==', `${tag}`)
    .get()
    .then((querySnapshot) =>
     querySnapshot.forEach((doc) => {
      if (i < page * 6 && i >= (page === 1 ? 0 : page * 6 - (page - 1) * 6)) {
       posts[`${doc.id}`] = doc.data();
      }
      i++;
     }),
    )
    .then(() => {
     return posts;
    })
    .catch((error) => error);
  } else {
   return db
    .collection('posts')
    .where('tag', '==', `${tag}`)
    .get()
    .then((querySnapshot) =>
     querySnapshot.forEach((doc) => {
      posts[`${doc.id}`] = doc.data();
     }),
    )
    .then(() => {
     return posts;
    })
    .catch((error) => error);
  }
 }
 if (all === true) {
  let posts = {};
  return db
   .collection('posts')
   .get()
   .then((querySnapshot) =>
    querySnapshot.forEach((doc) => (posts[`${doc.id}`] = doc.data())),
   )
   .then(() => {
    return posts;
   })
   .catch((error) => error);
 }
 if (page !== null) {
  let posts = {};
  let i = 0;
  return db
   .collection('posts')
   .get()
   .then((querySnapshot) =>
    querySnapshot.forEach((doc) => {
     if (i < page * 6 && i >= (page - 1) * 6) {
      posts[`${doc.id}`] = doc.data();
     }
     i++;
    }),
   )
   .then(() => {
    return posts;
   })
   .catch((error) => error);
 }
 if (count === true) {
  let counting = 0;
  return db
   .collection('posts')
   .get()
   .then((querySnapshot) => querySnapshot.forEach((doc) => counting++))
   .then(() => {
    return counting;
   })
   .catch((error) => error);
 }
 return { error: 'NotSpecifietCalling' };
});

exports.updateUserClaims = functions.https.onCall((data, context) => {});

exports.updateUserInformation = functions.https.onCall((data, context) => {
 const callingUserID = context.auth.uid;
 const userID = data.uid;
 return admin
  .auth()
  .getUser(userID)
  .then((userRecord) => {
   const ProfileDisplayName = data.name || userRecord.displayName;
   const ProfilePhoneNumber = data.phone || userRecord.phoneNumber;
   const ProfileEmail = data.email || userRecord.email;
   const ProfilePhotoURL = data.avatarURL || userRecord.photoURL;
   const ProfileDisabled = data.disabled || userRecord.disabled;
   return admin
    .auth()
    .updateUser(userID, {
     displayName: ProfileDisplayName,
     email: ProfileEmail,
     phoneNumber: ProfilePhoneNumber,
     photoURL: ProfilePhotoURL,
     disabled: ProfileDisabled,
    })
    .then((userRecord) => {
     return userRecord;
    })
    .catch((error) => error);
  })
  .catch((error) => {
   return error;
  });
});

exports.administration = functions.https.onRequest(async (req, res) => {
 const userID = req.query.id;

 return cors(req, res, () => {
  admin.auth().setCustomUserClaims(userID, { admin: true });
  res.status(200).send('Success');
 });
});

exports.allUsers = functions.https.onCall((data, context) => {
 const count = data.count || null;

 return admin
  .auth()
  .listUsers()
  .then((listUsersResult) => {
   if (count === true) return listUsersResult.users.length;
   else return listUsersResult.users;
  })
  .catch((error) => error);
});

exports.addPost = functions.https.onCall((data, context) => {
 const title = data.title;
 const tag = data.tag;
 const content = data.content;
 const description = data.description;
 const img = data.img;
 const authorID = context.auth.uid;
 const date = data.date;
 const tagName = data.tagName;
 console.log(data);
 return db
  .collection('posts')
  .add({
   authorID,
   content,
   date,
   description,
   img,
   tag,
   title,
  })
  .then(() => {
   return db
    .collection('tags')
    .doc(`${tagName}`)
    .update({ count: firebase.firestore.FieldValue.increment(1) })
    .then(() => {
     return 'ok';
    });
  });
});
