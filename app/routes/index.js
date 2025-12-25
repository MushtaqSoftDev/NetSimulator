var express = require('express');
var path = require('path');
var router = express.Router();
var simulationController = require('../controller/simulationController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Emerld Simulator' });
});
// Submit simulation data
router.post('/submit', simulationController.saveSimulation);

// Admin back-office to list simulations
router.get('/admin', simulationController.listSimulations);

module.exports = router;