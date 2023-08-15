import { createContext, useState, useMemo } from "react";
import {
  setDoc,
  doc,
  getDocs,
  collection,
  where,
  query,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { db } from "../utils/firebase";
import { generateRandomId, toggleAlert, getCurrentDate } from "../helpers";
import useBatches from "../hooks/useBatches";

const CropExpensesContext = createContext();

const CropExpensesProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [expenseInfo, setExpenseInfo] = useState({});
  const { cropStage, batchInfo } = useBatches();

  const addExpense = async (expenseData, config) => {
    const { setIsLoading, setLoadingText } = config;
    const randomId = generateRandomId();
    const docReference = doc(db, "expenses", randomId);
    const auth = getAuth();
    let uid = auth.currentUser.uid;
    const newExpenseData = {
      ...expenseData,
      uid,
      id: randomId,
      creationDate: getCurrentDate(),
      cropStage: cropStage?.name,
      batchId: batchInfo?.id,
    };
    setLoadingText("Agregando gasto...");
    setIsLoading(true);
    await setDoc(docReference, newExpenseData)
      .then(() => {
        getExpenses(config, false);
        setIsLoading(false);
        toggleAlert(config, {
          message: "Gasto agregado correctamente!",
          type: "success",
        });
      })
      .catch(() => {
        toggleAlert(config, {
          message: "Ha ocurrido un error al agregar el gasto!",
          type: "error",
        });
      });
  };

  const getExpenses = async () => {
    const auth = getAuth();
    const collectionReference = collection(db, "expenses");
    const q = query(
      collectionReference,
      where("uid", "==", auth.currentUser.uid),
      where("cropStage", "==", cropStage?.name),
      where("batchId", "==", batchInfo?.id)
    );
    let expensesList = [];
    await getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          expensesList.push(doc.data());
        });
        setExpenses(expensesList);
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  const updateExpense = async (expenseData, config) => {
    const { setIsLoading, setLoadingText } = config;
    const collectionReference = collection(db, "expenses");
    const q = query(collectionReference, where("id", "==", expenseData.id));
    setLoadingText("Actualizando gasto...");
    setIsLoading(true);
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.forEach((document) => {
      if (document.exists()) {
        setDoc(doc(db, "expenses", document.id), expenseData, { merge: true })
          .then(() => {
            getExpenses();
            toggleAlert(config, {
              message: "Gasto editado con exito!",
              type: "success",
            });
          })
          .catch(() => {
            toggleAlert(config, {
              message: "Ha ocurrido un error al editar lel gasto!",
              type: "error",
            });
          });
      }
    });
  };

  const cleanCropExpensesData = () => {
    setFilteredExpenses([]);
    setExpenses([]);
    setExpenseInfo({});
  };

  const value = useMemo(
    () => ({
      expenses,
      filteredExpenses,
      expenseInfo,
      addExpense,
      getExpenses,
      updateExpense,
      setFilteredExpenses,
      cleanCropExpensesData,
      setExpenseInfo,
    }),
    [
      expenses,
      filteredExpenses,
      expenseInfo,
      addExpense,
      getExpenses,
      updateExpense,
      setFilteredExpenses,
      cleanCropExpensesData,
      setExpenseInfo,
    ]
  );
  return (
    <CropExpensesContext.Provider value={value}>
      {children}
    </CropExpensesContext.Provider>
  );
};

export { CropExpensesProvider };
export default CropExpensesContext;
