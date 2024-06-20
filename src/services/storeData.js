import { Firestore } from '@google-cloud/firestore';

const storeData = async (id, data) => {
  const db = new Firestore({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    projectId: 'submission-mlgc-andifadhil',
    databaseId: 'predictions',
  });

  const collections = db.collection('predictions');

  return collections.doc(id).set(data);
};

export default storeData;
