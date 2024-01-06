//  this file will have all of our express code
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const planetsRouter = require('./routes/planets/planets.router');
const launchesRouter = require('./routes/launches/launches.router');
const app = express();

// middleware chain being used. *Routers are always used as middleware*
app.use(cors({
    origin: 'http://localhost:3000',
})); // we want to whitelist the origins we can cross origin communicate with
app.use(morgan('combined')); // logging middleware should be right after any security middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public'))) //middleware to serve 'public' folder with all our front-end code
// adding paths so our routers only respond to the designated paths
app.use('/planets', planetsRouter);
app.use('/launches', launchesRouter);

// * in the get request uses Express' matching capabilities to match any endpoint and sends them desired view
app.get('/*', (req, res) => {
    res.send(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;