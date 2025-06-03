const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const isAdmin = require('../middleware/isAdmin');

// Dashboard
router.get('/dashboard', isAdmin, adminController.dashboard);

// Usuarios
router.get('/users', isAdmin, adminController.listUsers);
router.get('/users/new', isAdmin, adminController.showUserForm);
router.post('/users/new', isAdmin, adminController.createUser);
router.get('/users/edit/:id', isAdmin, adminController.showUserForm);
router.post('/users/edit/:id', isAdmin, adminController.updateUser);
router.post('/users/delete/:id', isAdmin, adminController.deleteUser);

// Roles
router.get('/roles', isAdmin, adminController.listRoles);
router.get('/roles/new', isAdmin, adminController.showRoleForm);
router.post('/roles/new', isAdmin, adminController.createRole);
router.get('/roles/edit/:id', isAdmin, adminController.showRoleForm);
router.post('/roles/edit/:id', isAdmin, adminController.updateRole);
router.post('/roles/delete/:id', isAdmin, adminController.deleteRole);

// Estados
router.get('/states', isAdmin, adminController.listStates);
router.get('/states/new', isAdmin, adminController.showStateForm);
router.post('/states/new', isAdmin, adminController.createState);
router.get('/states/edit/:id', isAdmin, adminController.showStateForm);
router.post('/states/edit/:id', isAdmin, adminController.updateState);
router.post('/states/delete/:id', isAdmin, adminController.deleteState);

// Hierros
router.get('/irons', isAdmin, adminController.listIrons);
router.get('/irons/new', isAdmin, adminController.showIronForm);
router.post('/irons/new', isAdmin, adminController.createIron);
router.get('/irons/edit/:id', isAdmin, adminController.showIronForm);
router.post('/irons/edit/:id', isAdmin, adminController.updateIron);
router.post('/irons/delete/:id', isAdmin, adminController.deleteIron);

module.exports = router;
