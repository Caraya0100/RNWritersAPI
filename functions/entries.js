const admin = require('firebase-admin');
const db = admin.firestore();
const { collections } = require('./constants');

function setEntry(data) {
    const entry = {
        title: data.title,
        uid: data.uid,
        text: data.text,
    }

    if (data.image !== undefined) entry.image = data.image;
    if (data.cat !== undefined) entry.cat = data.cat;

    entry.timestamp = admin.firestore.Timestamp.fromDate(new Date());

    return entry;
}

module.exports.add = async (req, res) => {
    const entry = setEntry(req.body);
    const doc = await db.collection(collections.keys.entries).add(entry);

    res.json({ id: doc.id });
}

module.exports.get = async (req, res) => {
    const docRef = await db.collection(collections.keys.entries).doc(req.params.id);
    const doc = await docRef.get();
    
    if (!doc.exists) {
        res.json({});
    } else {
        res.json(doc.data());
    }
}

module.exports.getAll = async (req, res) => {
    const docs = await db.collection(collections.keys.entries).get();

    if (docs.empty) {
        res.json({});
    } else {
        const entries = [];

        docs.forEach(doc => {
            const data = doc.data();
            data.id = doc.id;
            entries.push(data);
        });

        res.json(entries);
    }
}

module.exports.update = async (req, res) => {
    const entry = setEntry(req.body);
    const doc = await db.collection(collections.keys.entries).doc(req.params.id).set(entry);

    res.json({ id: req.params.id });
}

module.exports.delete = async (req, res) => {
    const doc = await db.collection(collections.keys.entries).doc(req.params.id).delete();

    res.json({ id: req.params.id });
}

/*
exports.addMessage = async (req, res) => {
    const original = data.text;
    const writeResult = await admin.firestore().collection('messages').add({original: original});
    res.json({result: `EXPRESS!!!! Message with ID: ${writeResult.id} added.`});
}

exports.helloWorld = async (req, res) => {
    res.json({result: `SOME MESSAGE HERE!!!!.`});
}
*/