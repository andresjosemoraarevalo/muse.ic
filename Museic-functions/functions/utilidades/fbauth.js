const admin = require('./administrador');
const firebase = require('firebase-admin');

module.exports = (request, response, next) => {
    let idToken;
    if (
        request.headers.authorization &&
        request.headers.authorization.startsWith('Bearer ')
    ) {
        idToken = request.headers.authorization.split('Bearer ')[1];
    } else {
        console.error('No se encontro Token');
        return response.status(403).json({ error: 'Sin autorizacion' });
    }
    firebase.auth().verifyIdToken(idToken)
        .then((decodedToken) => {
            request.usuario = decodedToken;
            return db
                .collection('Usuarios')
                .where('userId', '==', request.usuario.userId)
                .limit(1)
                .get();
        })
        .then((data) => {
            request.usuario.username = data.docs[0].data().usuario;
            return next();
        })
        .catch((err) => {
            console.error('Error mientras se verificaba el token ', err);
            return response.status(403).json(err);
        });
};
