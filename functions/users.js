const admin = require('firebase-admin');
const db = admin.firestore();
const { collections } = require('./constants');

function setUser(data) {
    const user = {
        name: data.name,
        desc: data.desc,
    }

    if (data.image !== undefined) user.image = data.image;

    user.timestamp = admin.firestore.Timestamp.fromDate(new Date());

    return user;
}

module.exports.add = async (req, res) => {
    const user = setUser(req.body);
    const doc = await db.collection(collections.keys.users).add(user);

    res.json({ id: doc.id });
}

module.exports.get = async (req, res) => {
    const docRef = await db.collection(collections.keys.users).doc(req.params.id);
    const doc = await docRef.get();
    
    if (!doc.exists) {
        res.json({});
    } else {
        res.json(doc.data());
    }
}

module.exports.getAll = async (req, res) => {
    const docs = await db.collection(collections.keys.users).get();

    if (docs.empty) {
        res.json({});
    } else {
        const users = [];

        docs.forEach(doc => {
            const data = doc.data();
            data.id = doc.id;
            users.push(data);
        });

        res.json(users);
    }
}

module.exports.update = async (req, res) => {
    const user = setUser(req.body);
    const doc = await db.collection(collections.keys.users).doc(req.params.id).set(user);

    res.json({ id: req.params.id });
}

module.exports.delete = async (req, res) => {
    const doc = await db.collection(collections.keys.users).doc(req.params.id).delete();

    res.json({ id: req.params.id });
}