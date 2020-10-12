//api/login
const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, login, renewToken } = require('../controlllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');
const router = Router();

router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('telefono', 'El telefono es obligatorio').isLength(({ min: 9, max: 9 })),
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contrasena es obligatorio').isLength(({ min: 10 })),
    validarCampos


], crearUsuario);

router.post('/', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contrasena es obligatorio').not().isEmpty(),
    validarCampos
], login);

router.get('/renew', validarJwt, renewToken);

module.exports = router;