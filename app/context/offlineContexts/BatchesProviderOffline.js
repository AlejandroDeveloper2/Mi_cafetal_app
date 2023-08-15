import React, { useState, createContext, useMemo } from "react";
import { getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

import useFarmOffline from "../../hooks/useFarmOffline";
import { generateRandomId, toggleAlert, getCurrentDate } from "../../helpers";
import cultivationStages from "../../data/cultivationStages.json";

const BatchesContextOffline = createContext();

const BatchesProviderOffline = ({ children }) => {
  const [batchesOffline, setBatchesOffline] = useState([]);
  const [filteredBatchesOffline, setFilteredBatchesOffline] = useState([]);
  const [batchInfOffline, setBatchInfOffline] = useState({});
  //const [batchOwnerName, setBatchOwnerName] = useState(null);
  const [cropStageOffline, setCropStageOffline] = useState({});
  const [cropStageExpensesOffline, setCropStageExpensesOffline] = useState([]);
  const [cropStagesOffline, setCropStagesOffline] = useState([]);

  //const { userData } = useAccount();
  const { getFarmDataOffline } = useFarmOffline();

  const addBatchOffline = async (
    batchData,
    farmId,
    config,
    getFarmDataOffline
  ) => {
    const { setIsLoading, setLoadingText } = config;
    const randomId = generateRandomId();
    const batchOwner = getAuth().currentUser.displayName;
    const newBatchData = {
      ...batchData,
      farmId,
      id: randomId,
      isCropFinished: false,
      progress: 0,
      batchOwner,
      creationDate: getCurrentDate(),
    };

    setLoadingText("Creando lote...");
    setIsLoading(true);
    await AsyncStorage.setItem(
      "Batches",
      JSON.stringify([...batchesOffline, newBatchData])
    )
      .then(() => {
        toggleAlert(config, {
          message: "El lote se agregó correctamente!",
          type: "success",
        });
        getFarmDataOffline(config, false);
        getAllBatchesOffline(farmId);
      })
      .catch(() => {
        toggleAlert(config, {
          message: "Ha ocurrido un error al crear el lote!",
          type: "error",
        });
      });
  };

  const getAllBatchesOffline = async (farmId) => {
    const uid = getAuth().currentUser.uid;
    const userRole = userData?.userRole;
    let batchesListTemporal = [];
    try {
      const batchesList = await AsyncStorage.getItem("Batches");
      if (batchesList !== null) {
        const batchesLocalStorage = JSON.parse(batchesList);
        batchesLocalStorage.forEach((batch) => {
          if (userRole === "Administrador") {
            if (batch.farmId === farmId) {
              batchesListTemporal.push(batch);
            }
          } else {
            if (batch.batchOwner === uid) {
              batchesListTemporal.push(batch);
            }
          }
          setBatchesOffline(batchesListTemporal);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setCultivationStagesOffline = async (cultivationStage, idBatch) => {
    try {
      let length = cultivationStages.cultivationStages.length;
      const batchesList = await AsyncStorage.getItem("Batches");
      let updatedBatchLS = {};
      if (batchesList !== null) {
        const batchLocalStorage = JSON.parse(batchesList).filter(
          (batch) => batch.id === idBatch
        );
        if (cultivationStage === 1) {
          let stagesList = cultivationStages.cultivationStages.slice(0, length);
          updatedBatchLS = {
            ...batchLocalStorage[0],
            cultivationStages: stagesList,
          };
        } else if (cultivationStage === 2) {
          let stagesList = cultivationStages.cultivationStages.slice(1, length);
          updatedBatchLS = {
            ...batchLocalStorage[0],
            cultivationStages: stagesList,
          };
        }
        await AsyncStorage.setItem(
          "Batches",
          JSON.stringify([...batchesOffline, updatedBatchLS])
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const value = useMemo(
    () => ({
      batchesOffline,
      filteredBatchesOffline,
      batchInfOffline,
      cropStageOffline,
      cropStageExpensesOffline,
      cropStagesOffline,
      setFilteredBatchesOffline,
      addBatchOffline,
      getAllBatchesOffline,
      setCultivationStagesOffline,
    }),
    [
      batchesOffline,
      filteredBatchesOffline,
      batchInfOffline,
      cropStageOffline,
      cropStageExpensesOffline,
      cropStagesOffline,
      setFilteredBatchesOffline,
      addBatchOffline,
      getAllBatchesOffline,
      setCultivationStagesOffline,
    ]
  );

  return (
    <BatchesContextOffline.Provider value={value}>
      {children}
    </BatchesContextOffline.Provider>
  );
};
export { BatchesProviderOffline };
export default BatchesContextOffline;
