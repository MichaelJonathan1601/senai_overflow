var admin = require("firebase-admin");

var serviceAccount = require("../config/firebase-key.json");

const BUCKET = "senai-overflow-cb4eb.appspot.com"

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET,
});

const uploadImage = (req, res, next) => {
    if(!req.file) return next();

    const image = req.file;
    const nomeArquivo = Date.now() + "." + image.originalname.split(".").pop();
}
