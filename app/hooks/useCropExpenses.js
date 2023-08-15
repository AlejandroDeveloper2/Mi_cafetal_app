import { useContext } from "react";
import CropExpensesContext from "../context/CropExpensesProvider";

const useCropExpenses = () => {
  return useContext(CropExpensesContext);
};

export default useCropExpenses;
