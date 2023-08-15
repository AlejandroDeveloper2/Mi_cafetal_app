import React, { useState, createContext, useMemo } from "react";
import { setDoc, doc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import departments from "../data/deparments.json";
import cities from "../data/cities.json";
import { db } from "../utils/firebase";

const ApplicationContext = createContext();

const ApplicationProvider = ({ children }) => {
  const [states, setStates] = useState([]);
  const [isConnected, setIsConnected] = useState(true);

  const getDataDropdown = () => {
    setStates(departments.data);
  };

  const filterCitiesPerDepartment = (departmentId) => {
    const towns = cities.data?.filter(
      (city) => city.departmentId === departmentId
    );
    return towns;
  };

  const uploadLocalDataToCloud = async () => {
    try {
      const localStorageData = await AsyncStorage.getItem("FarmData");
      if (localStorageData !== null) {
        JSON.parse(localStorageData).map((value) => {
          console.log(value);
          setDoc(doc(db, "farms", value.id), value, { merge: true });
        });
        console.log("datos subidos correctamente");
      } else {
        console.log("localstorage vacio");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeAsyncStorage = async () => {
    await AsyncStorage.removeItem("FarmData");
  };

  const cleanApplicationData = () => {
    setIsConnected(true);
  };

  const value = useMemo(
    () => ({
      states,
      isConnected,
      setIsConnected,
      getDataDropdown,
      filterCitiesPerDepartment,
      uploadLocalDataToCloud,
      removeAsyncStorage,
      cleanApplicationData,
    }),
    [
      states,
      isConnected,
      setIsConnected,
      getDataDropdown,
      filterCitiesPerDepartment,
      uploadLocalDataToCloud,
      removeAsyncStorage,
      cleanApplicationData,
    ]
  );

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};

export { ApplicationProvider };
export default ApplicationContext;
