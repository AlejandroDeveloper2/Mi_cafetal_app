import { useContext } from "react";

import AccountContext from "../context/AccountProvider";

const useAccount = () => {
  return useContext(AccountContext);
};
export default useAccount;
