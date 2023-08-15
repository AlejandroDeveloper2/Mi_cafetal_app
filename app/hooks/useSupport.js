import { useContext } from "react";
import SupportContext from "../context/SupportProvider";

const useSupport = () => {
  return useContext(SupportContext);
};

export default useSupport;
