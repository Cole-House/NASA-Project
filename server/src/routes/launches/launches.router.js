const express = require('express');
const {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
} = require('./launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpAddNewLaunch);
// using express' parameter syntax to pass in parameter of id
launchesRouter.delete('/:id', httpAbortLaunch);

module.exports = launchesRouter;