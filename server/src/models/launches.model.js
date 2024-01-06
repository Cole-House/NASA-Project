const launches = new Map(); //better structure so we can map string keys to values; they also preserve order you put them in

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100, //unique identifier
    mission: 'UKnowDaWae',
    rocket: 'ES33',
    launchDate: new Date('December 17, 2030'),
    target: 'Kepler-442 b',
    customer: ['ZTM', 'NASA'], //customer list is already set 
    upcoming: true, //only becomes false when lauch becomes historical
    success: true
};

launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId) {
    return launches.has(launchId);
}

// makes the launches Map a local data detail and returns the data in the correct format
//launches.values() gives us this iteratable iterator of the values in our map 
// from there we want to feed the .json() function an array where you can convert the mapped objects into an array with the Array.from()
 function getAllLaunches(){
     return Array.from(launches.values());
 }
// Using bottom-up approach: we need to write function that takes in launch object from the user request and our router can use to set launches in launches Map
 function addNewLaunch(launch) {
    latestFlightNumber++;
    launches.set(latestFlightNumber, Object.assign(launch, {
        //assigning data in fields not taken from user
        flightNumber: latestFlightNumber,
        customer: ['ZTM', 'NASA'],
        upcoming: true,
        success: true,
    }));
 }

 function abortLaunchById(launchId) {
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
 } 

module.exports = {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchById
}