import React, { useState, createContext, useMemo } from "react";
import { getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { generateRandomId, toggleAlert } from "../../helpers";

const FarmContextOffline = createContext();

const FarmProviderOffline = ({ children }) => {
  const [farms, setFarms] = useState([]);
  const [farmOffline, setFarmOffline] = useState({});

  const createFarmOffline = async (values, config) => {
    const { setIsLoading, setLoadingText } = config;
    const randomId = generateRandomId();
    const auth = getAuth();
    let uid = auth.currentUser.uid;
    const newFarmData = { ...values, uid, batchQuantity: 0, id: randomId };
    setLoadingText("Creando finca...");
    setIsLoading(true);
    await AsyncStorage.setItem(
      "FarmData",
      JSON.stringify([...farms, newFarmData])
    )
      .then(() => {
        toggleAlert(config, {
          message: "Finca guardada con exito!",
          type: "success",
        });
        getFarmDataOffline(config, false);
      })
      .catch(() => {
        toggleAlert(config, {
          message: "Ha ocurrido un error al crear la finca!",
          type: "error",
        });
      });
  };

  const editFarmOffline = async (values, config) => {
    const { setIsLoading, setLoadingText } = config;
    const { id, batchQuantity, uid } = farmOffline;
    const newFarmData = { ...values, id, batchQuantity, uid };
    setLoadingText("Actualizando finca...");
    setIsLoading(true);
    try {
      let farmsLocalStorage = await AsyncStorage.getItem("FarmData");
      if (farmsLocalStorage !== null) {
        let newFarmsLocalStorage = JSON.parse(farmsLocalStorage).filter(
          (item) => item.uid !== uid
        );
        newFarmsLocalStorage.push(newFarmData);
        await AsyncStorage.setItem(
          "FarmData",
          JSON.stringify(newFarmsLocalStorage)
        );
        getFarmDataOffline(config, false);
      }
    } catch (error) {
      toggleAlert(config, {
        message: "Ha ocurrido un error al editar la finca!",
        type: "error",
      });
    }
  };

  const getFarmDataOffline = async (config, loading = true) => {
    const { setIsLoading, setLoadingText } = config;
    const auth = getAuth();

    if (loading) {
      setLoadingText("Cargando datos de la finca...");
      setIsLoading(true);
    }
    let farmListTemporal = [];
    try {
      const farmList = await AsyncStorage.getItem("FarmData");
      if (farmList !== null) {
        const farmsLocalStorage = JSON.parse(farmList);
        farmsLocalStorage.forEach((farm) => {
          farmListTemporal.push(farm);
          if (farm.uid === auth.currentUser.uid) {
            setFarmOffline(farm);
          }
        });
        setFarms(farmListTemporal);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const countBacthQuantityOffline = async (farmId, batches) => {
    try {
      const { uid } = farmOffline;
      let farmsLocalStorage = AsyncStorage.getItem("FarmData");
      farms?.forEach((farm) => {
        if (farm.id === farmId) {
          let newFarmsLocalStorage = JSON.parse(farmsLocalStorage).filter(
            (item) => item.uid !== uid
          );
          setFarmOffline((prevState) => {
            const newState = { ...prevState };
            newState.batchQuantity = batches.length;
            return newState;
          });
          newFarmsLocalStorage.push(farmOffline);
          AsyncStorage.setItem(
            "FarmData",
            JSON.stringify(newFarmsLocalStorage)
          );
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const cleanFarmOfflineData = () => {
    setFarmOffline({});
  };

  const value = useMemo(
    () => ({
      farms,
      farmOffline,
      createFarmOffline,
      editFarmOffline,
      getFarmDataOffline,
      countBacthQuantityOffline,
      cleanFarmOfflineData,
    }),
    [
      farms,
      farmOffline,
      createFarmOffline,
      editFarmOffline,
      getFarmDataOffline,
      countBacthQuantityOffline,
      cleanFarmOfflineData,
    ]
  );

  return (
    <FarmContextOffline.Provider value={value}>
      {children}
    </FarmContextOffline.Provider>
  );
};
export { FarmProviderOffline };
export default FarmContextOffline;
