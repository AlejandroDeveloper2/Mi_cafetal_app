import { useContext } from "react";
import BatchesProviderContext from "../context/offlineContexts/BatchesProviderOffline";

const useBatchesOffline = () => {
  return useContext(BatchesProviderContext);
};

export default useBatchesOffline;
