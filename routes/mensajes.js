//api/mensajes
const { Router } = require('express');
const { obtenerChat } = require('../controlllers/mensajes');
const { validarJwt } = require('../middlewares/validar-jwt');
const router = Router();

router.get('/:de', validarJwt, obtenerChat);

module.exports = router;