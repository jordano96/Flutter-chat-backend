//api/usuarios
const { Router } = require('express');
const { getUsuarios } = require('../controlllers/usuarios');
const { validarJwt } = require('../middlewares/validar-jwt');
const router = Router();

router.get('/', validarJwt, getUsuarios);

module.exports = router;