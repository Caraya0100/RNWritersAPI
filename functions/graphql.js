var { buildSchema } = require('graphql');
const admin = require('firebase-admin');
const db = admin.firestore();
const { collections } = require('./constants');

module.exports.schema = buildSchema(`
  type Query {
    entries: [Entry!]!
  }
  type Entry {
    id: String!
    date: String!
    excerpt: String
    image: String
    title: String!
    text: String!
    uid: String!
    uimg: String
    uname: String!
  }
`);

module.exports.root = {
  entries: async () => {
    const docs = await db.collection(collections.keys.entries).get();

    if (docs.empty) {
      return [];
    } else {
      const entries = [];

      docs.forEach(doc => {
          const data = doc.data();
          data.id = doc.id;
          entries.push(data);
      });

      return entries;
    }
  },
};