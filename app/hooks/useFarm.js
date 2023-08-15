import { useContext } from "react";

import FarmContext from "../context/FarmProvider";

const useFarm = () => {
  return useContext(FarmContext);
};

export default useFarm;
