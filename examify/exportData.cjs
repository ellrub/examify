const admin = require('firebase-admin');
const serviceAccount = require('../../../../Development/Examify/ExamifyFirebaseAdmin.json');
const data = require('./src/questions.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

data.forEach((item, index) => {
  db.collection('info132h20').doc(`question${index}`).set(item)
    .then(() => console.log(`Document question${index} successfully written!`))
    .catch((error) => console.error("Error writing document: ", error));
});