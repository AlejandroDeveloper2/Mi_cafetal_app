import { useContext } from "react";

import FarmContextOffline from "../context/offlineContexts/FarmProviderOffline";

const useFarmOffline = () => {
  return useContext(FarmContextOffline);
};

export default useFarmOffline;
