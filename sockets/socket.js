const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controlllers/socket')
    //mensajes de socket
io.on('connection', client => {

    //client.on('event', data => {});

    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);
    //console.log(valido, uid);
    //verificar autenticacion
    if (!valido) { return client.disconnect(); }

    //cliente autenticado
    usuarioConectado(uid);
    //ingresar al usuario a una sala en particular
    //sala global , client.id, 
    client.join(uid);

    //escuchar del cliente el mensaje-personal
    client.on('mensaje-personal', async(payload) => {
        console.log(payload);
        await grabarMensaje(payload);
        io.to(payload.para).emit('mensaje-personal', payload);

    });



    client.on('disconnect', () => {
        usuarioDesconectado(uid);
    });

    /*client.on('mensaje', (payload) => {
        console.log('Mensaje!!!', payload.nombre);
        io.emit('mensaje', { admin: 'Nuevo Mensaje' });
    });*/
});