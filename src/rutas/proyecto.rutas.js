const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middlewares/autenticacion');
const { requireCreador, requireMiembroProyecto } = require('../middlewares/autorizacionProyecto');
const projectController = require('../controladores/proyecto.controlador');

router.get('/', requireAuth, projectController.listProjects);
router.get('/:id', requireAuth, projectController.getProject);
router.post('/', requireAuth, projectController.createProject);
router.put('/:id', requireAuth, requireCreador, projectController.updateProject);
router.delete('/:id', requireAuth, requireCreador, projectController.deleteProject);

router.post('/:id/postulaciones', requireAuth, projectController.applyToProject);
router.get('/:id/postulaciones', requireAuth, requireCreador, projectController.getProjectApplications);
router.patch('/:id/postulaciones/:postulacionId', requireAuth, requireCreador, projectController.updateApplicationStatus);

router.get('/:id/mensajes', requireAuth, requireMiembroProyecto, projectController.listMessages);
router.post('/:id/mensajes', requireAuth, requireMiembroProyecto, projectController.sendMessage);

module.exports = router;
