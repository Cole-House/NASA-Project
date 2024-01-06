const express = require('express');
// allows you to easily import functions from your controller
const {
    httpGetAllPlanets,
} = require('./planets.controller')
const planetsRouter = express.Router();
//getAllplanets function will come from the controller! closer to the user 
// this router will sync up with the front-end when route is activated 
planetsRouter.get('/', httpGetAllPlanets);

module.exports = planetsRouter;
// we will use the routers in app.js