const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');
const { loadPlanetsData } = require('./models/planets.model');
// This allows the PORT to be set through enviroment arguments or set to default
const PORT = process.env.PORT || 4322;
// mongo connection string
const MONGO_URL = 'mongodb+srv://nasa-api:Kirbystar808@atlascluster.8lxsabg.mongodb.net/?retryWrites=true&w=majority';
//app is passed into the createServer() this means the app's middleware and route handlers will respond to requests coming in to our server
const server = http.createServer(app);
// mongoose event emitter that is only executed once when the 'open' event is detected 
mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});
// mongoose event emitter that detects errors
mongoose.connection.on('error', (err) => {
    console.error(err);
}); 
// we must wait for promise on data to be loaded before being able to take requests and use an async function to do so
// this is a very common pattern in node where you must load data or perfrom action before server actually starts responding
async function startServer() {
    //connecting to mongo database 
    await mongoose.connect(MONGO_URL);
    await loadPlanetsData();
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    }); 
}

startServer();