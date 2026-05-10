const authService = require('../servicios/autenticacion.servicio');

async function register(req, res, next) {
  try {
    const result = await authService.register(req.body);
    res.status(result.status).json(result.body);
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const result = await authService.login(req.body);
    res.status(result.status).json(result.body);
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login };
