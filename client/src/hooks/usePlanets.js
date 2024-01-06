import { useCallback, useEffect, useState } from "react";

import { httpGetPlanets } from "./requests";

function usePlanets() {
  const [planets, savePlanets] = useState([]);

  const getPlanets = useCallback(async () => {
    // you ge the list of fetched planets from calling our API
    const fetchedPlanets = await httpGetPlanets();
    savePlanets(fetchedPlanets);
  }, []);

  useEffect(() => {
    //will call getPlanets onload
    getPlanets();
  }, [getPlanets]);

  return planets;
}

export default usePlanets;
