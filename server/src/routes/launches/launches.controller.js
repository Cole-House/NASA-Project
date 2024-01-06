const { getAllLaunches, addNewLaunch, existsLaunchWithId, abortLaunchById } = require('../../models/launches.model');
// making function name more specific 
function httpGetAllLaunches (req, res) {
    return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
    // launch data is being passed through the requst body *express.json() middleware populates the req.body 
    const launch = req.body;
    //input validation
    if (!launch.mission || !launch.rocket || !launch.launchDate
        || !launch.target) {
          return res.status(400).json({
            error: 'Missing required launch property',
          });
        }
    // converting string to Date object
    launch.launchDate = new Date(launch.launchDate)
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
          error: 'Invalid launch date',
        });
      }
    addNewLaunch(launch);
    //upon successul POST return 201 and the json launch object
    return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
    // first thing we must do is get the launch id from our request parameters
    // need to convert the id param rom a string to a number 
    const launchId = Number(req.params.id);
    if (!existsLaunchWithId(launchId)) {
        return res.status(404).json({
         error: 'Launch not found',
        });
    } else {
        const aborted = abortLaunchById(launchId);
        return res.status(200).json(aborted);
    }
}
 
module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}