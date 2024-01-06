const API_URL = 'http://localhost:4322';
  // Load planets and return as JSON.
async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`);
  return await response.json();
}
// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`);
  const fetchedLaunches = await response.json();
  // sorting the fecthed lauches by flight number 
  return fetchedLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  // in case the network fails and our fetch is just floating in transit we have to handle the error to set the response status code 
  try {
    return await fetch(`${API_URL}/launches`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    //we have to make sure the launch data is in the fetch req.body
    body: JSON.stringify(launch), //body needs to be a string
    });
  } catch(err) { // return an object that triggers our condition in useLaunches, setting success to be false.
      return {
        ok: false,
      };
  }
}
// Delete launch with given ID.
async function httpAbortLaunch(id) {
  // we query the collection by passing in id
  try {
      return await fetch(`${API_URL}/launches/${id}`, {
      method: "delete",
   });
  } catch(err) { // return an object that triggers our condition in useLaunches, setting success to be false.
    console.log(err);
    return {
      ok: false,
    };
  } 
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};