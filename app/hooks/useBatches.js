import { useContext } from "react";
import BatchesContext from "../context/BatchesProvider";

const useBatches = () => {
  return useContext(BatchesContext);
};

export default useBatches;
