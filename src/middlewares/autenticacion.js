const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Token no enviado' });
    }

    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findById(decoded.id).select('-contrasena');

    if (!usuario) {
      return res.status(401).json({ success: false, message: 'Usuario no válido' });
    }

    req.user = usuario;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token inválido o expirado' });
  }
}

function requireRole(rol) {
  return function (req, res, next) {
    if (req.user.rol !== rol) {
      return res.status(403).json({ success: false, message: 'No tienes permisos para esta acción' });
    }
    next();
  };
}

module.exports = { requireAuth, requireRole };
