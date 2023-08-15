import { useContext } from "react";

import ApplicationContext from "../context/ApplicationProvider";

const useApplication = () => {
  return useContext(ApplicationContext);
};
export default useApplication;
