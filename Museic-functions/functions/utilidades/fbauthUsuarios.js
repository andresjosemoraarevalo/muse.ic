const { admin, db } = require('./administrador');

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
    admin.auth().verifyIdToken(idToken)
        .then((decodedToken) => {
            request.user = decodedToken;
            return db
                .collection('Usuarios')
                .where('userId', '==', request.user.uid)
                .limit(1)
                .get();
        })
        .then((data) => {
            request.user.username = data.docs[0].data().username;
            request.user.Fotolink = data.docs[0].data().Fotolink;
            request.user.nombre = data.docs[0].data().nombre;
            return next();
        })
        .catch((err) => {
            console.error('Error mientras se verificaba el token ', err);
            return response.status(403).json(err);
        });
};
