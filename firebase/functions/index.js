var admin = require('firebase-admin');
var functions = require('firebase-functions');

var nodemailer = require('nodemailer');
var firebase = require('firebase');

let transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
  user: 'dotblogportal@gmail.com',
  pass: '123321Iq',
 },
});
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
 if (id !== null) {
  return admin
   .auth()
   .getUser(id)
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
exports.deletePost = functions.https.onCall((data, context) => {
 const id = data.id;
 return db
  .collection('posts')
  .doc(`${id}`)
  .get()
  .then((doc) => {
   return db
    .collection('tags')
    .where('name', '==', `${doc.data().tagName}`)
    .get((querySnapshot) => {
     querySnapshot.forEach((doc) => {
      return doc
       .update({ count: firebase.firestore.FieldValue.increment(-1) })

       .then(() => {
        return db
         .collection('posts')
         .doc(`${id}`)
         .delete()
         .then(() => {
          return 'ok';
         });
       });
     });
    });
  })
  .catch((error) => error);
});
exports.deleteTag = functions.https.onCall((data, context) => {
 const id = data.id;
 return db
  .collection('tags')
  .doc(`${id}`)
  .delete()
  .then(() => {
   return 'ok';
  });
});
exports.addTag = functions.https.onCall((data, context) => {
 const background = data.background;
 const count = data.count;
 const description = data.description;
 const img = data.img;
 const name = data.name;
 return db
  .collection('posts')
  .add({
   background,
   count,
   name,
   img,
   description,
  })
  .then(() => {
   return 'ok';
  });
});
exports.editTag = functions.https.onCall((data, context) => {
 const background = data.background;
 const count = data.count;
 const description = data.description;
 const img = data.img;
 const name = data.name;
 const id = data.id;
 return db
  .collection('tags')
  .doc(`${id}`)
  .update({
   background,
   count,
   name,
   img,
   description,
  })
  .then(() => {
   return 'ok';
  });
});
exports.editPost = functions.https.onCall((data, context) => {
 const title = data.title;
 const tag = data.tag;
 const content = data.content;
 const description = data.description;
 const img = data.img;
 const id = data.id;
 return db
  .collection('posts')
  .doc(`${id}`)
  .update({
   content,
   description,
   img,
   tag,
   title,
  })
  .then(() => {
   return 'ok';
  });
});

exports.createTag = functions.https.onCall((data, context) => {
 const background = data.background;
 const count = data.count;
 const description = data.description;
 const img = data.img;
 const name = data.name;
 const id = data.id;
 return db
  .collection('tags')
  .add({
   background,
   count,
   name,
   img,
   description,
  })
  .then(() => {
   return 'ok';
  });
});
exports.sendMail = functions.https.onCall((data, context) => {
 // getting dest email by query string
 const email = data.email;

 const phone = data.phone;
 const name = data.name;
 const message = data.message;
 const mailOptions = {
  from: 'Blog <dotblogportal@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
  to: email,
  subject: 'Получение тех. помощи', // email subject
  html: `<a class="Navigation-Link" href="index.html >
   <div class="Logotype-Name">
    <h1>Blog</h1>
   </div>
  </a>
             <br />
             <p>Вы оставили заявку на сайте Blog на получение тех. поддержки . Это письмо вы получили так как в заявке указали этот почтовый адрес. Пожалуйста проверьте правильность введенных данных, чтобы мы погли с вами связаться.</p>
             <span style="font-weight: bold;">Имя:</span> <p>${name}</p> <br />
     <span style="font-weight: bold;">Телефон:</span> <p>${phone}</p> <br />
     <span style="font-weight: bold;">Сообщение:</span> <p>${message}</p> <br /><br /><br />

     <p>С уважением команда Blog</p>`,
 };
 const mailOptionsSelf = {
  from: 'Blog <dotblogportal@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
  to: 'dotblogportal@gmail.com',
  subject: 'Заявка на тех. поддержку', // email subject
  html: `<a class="Navigation-Link" href="index.html>
   <div class="Logotype-Name">
    <h1>Blog</h1>
   </div>
  </a>
             <br />
             <p></p>
             <span style="font-weight: bold;">Имя:</span> <p>${name}</p> <br />
     <span style="font-weight: bold;">Телефон:</span> <p>${phone}</p> <br />
     <span style="font-weight: bold;">Сообщение:</span> <p>${message}</p> <br /><br /><br />
 
     <p>С уважением команда Blog</p>`,
 };
 // returning result
 transporter.sendMail(mailOptionsSelf, (erro, info) => {
  if (erro) {
   console.log('nosend');
   return res.status(206).send(erro.toString());
  }
  console.log('send');
  this.sendMailtoSelf;
  return 'ok';
 });
 transporter.sendMail(mailOptions, (erro, info) => {
  if (erro) {
   console.log('nosend');
   return res.status(206).send(erro.toString());
  }
  console.log('send');
  this.sendMailtoSelf;
  return 'ok';
 });
});
