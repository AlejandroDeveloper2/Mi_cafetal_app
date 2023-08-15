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
import cultivationStages from "../data/cultivationStages.json";
import useAccount from "../hooks/useAccount";
import useFarm from "../hooks/useFarm";
import { compareCropStages } from "../helpers";

const BatchesContext = createContext();
const BatchesProvider = ({ children }) => {
  const [batches, setBatches] = useState([]);
  const [filteredBatches, setFilteredBatches] = useState([]);
  const [batchInfo, setBatchInfo] = useState({});
  const [batchOwnerName, setBatchOwnerName] = useState(null);
  const [cropStage, setCropStage] = useState({});
  const [cropStageExpenses, setCropStageExpenses] = useState([]);
  const [cropStages, setCropStages] = useState([]);

  const { userData } = useAccount();
  const { getFarmData } = useFarm();

  const addBatch = async (batchData, farmId, config, getFarmData) => {
    const { setIsLoading, setLoadingText } = config;
    const randomId = generateRandomId();
    const docReference = doc(db, "batches", randomId);
    const batchOwner = getAuth().currentUser.uid;
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
    await setDoc(docReference, newBatchData)
      .then(() => {
        toggleAlert(config, {
          message: "El lote se agregó correctamente!",
          type: "success",
        });
        getFarmData(config, false);
        getAllBatches(farmId);
      })
      .catch(() => {
        toggleAlert(config, {
          message: "Ha ocurrido un error al crear el lote!",
          type: "error",
        });
      });
  };

  const getAllBatches = async (farmId) => {
    const uid = getAuth().currentUser.uid;
    const userRole = userData?.userRole;
    const collectionReference = collection(db, "batches");
    const q = query(
      collectionReference,
      userRole === "Administrador"
        ? where("farmId", "==", farmId)
        : where("batchOwner", "==", uid)
    );
    let batchList = [];
    await getDocs(q).then((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        if (doc.exists()) {
          batchList.push(doc.data());
        }
      });
      setBatches(batchList);
    });
  };

  const setCultivationStages = (cultivationStage, idBatch) => {
    let length = cultivationStages.cultivationStages.length;
    if (cultivationStage === 1) {
      let stagesList = cultivationStages.cultivationStages.slice(0, length);
      setDoc(
        doc(db, "batches", idBatch),
        { cultivationStages: stagesList },
        {
          merge: true,
        }
      );
    } else if (cultivationStage === 2) {
      let stagesList = cultivationStages.cultivationStages.slice(1, length);
      setDoc(
        doc(db, "batches", idBatch),
        { cultivationStages: stagesList },
        {
          merge: true,
        }
      );
    }
  };

  const getCultivationStages = async (batchId) => {
    const collectionReference = collection(db, "batches");
    const q = query(collectionReference, where("id", "==", batchId));

    await getDocs(q).then((querySnapshot) => {
      querySnapshot.docs.forEach((document) => {
        if (document.exists()) {
          setCropStages(document.data()?.cultivationStages);
        }
      });
    });
  };

  const updateStageStatus = async (
    stageId,
    idBatch,
    stageStatus,
    navigation,
    config
  ) => {
    const { setIsLoading, setLoadingText } = config;
    const collectionReference = collection(db, "batches");
    const q = query(collectionReference, where("id", "==", idBatch));

    setIsLoading(true);
    setLoadingText("Actualizando estado de la fase....");
    await getDocs(q).then((querySnapshot) => {
      querySnapshot.docs.forEach((document) => {
        if (document.exists() && stageStatus === 1) {
          toggleStageStatus(
            true,
            stageId,
            idBatch,
            document,
            navigation,
            config
          );
        } else {
          toggleStageStatus(
            false,
            stageId,
            idBatch,
            document,
            navigation,
            config
          );
        }
      });
    });
  };

  const toggleStageStatus = (
    status,
    stageId,
    idBatch,
    document,
    navigation,
    config
  ) => {
    const { setIsLoading, toggleModal } = config;
    let filteredStages = document
      .data()
      .cultivationStages.filter((stage) => stage.id === stageId);
    filteredStages[0].isStageFinished = status;
    let stageList = document
      .data()
      .cultivationStages.filter((stage) => stage.id !== stageId);
    let newStageList = [...stageList, filteredStages[0]];
    newStageList.sort((a, b) => compareCropStages(a, b));
    setDoc(
      doc(db, "batches", idBatch),
      {
        cultivationStages: newStageList,
      },
      {
        merge: true,
      }
    ).then(() => {
      setIsLoading(false);
      calculateCropProgress(idBatch);
      toggleAlert(config, {
        message: "Estado de la fase editada correctamente!",
        type: "success",
      });
      getCurrentBatchInfo(idBatch, config).then(() => {
        navigation.navigate("Batch");
      });
    });
  };

  const editBatch = async (values, batchId, config) => {
    const { setIsLoading, setLoadingText } = config;
    const collectionReference = collection(db, "batches");
    const q = query(collectionReference, where("id", "==", batchId));
    setLoadingText("Actualizando lote...");
    setIsLoading(true);
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.forEach((document) => {
      if (document.exists()) {
        setDoc(doc(db, "batches", document.id), values, { merge: true })
          .then(() => {
            getCurrentBatchInfo(batchId);
            toggleAlert(config, {
              message: "Lote editado con exito!",
              type: "success",
            });
          })
          .catch(() => {
            toggleAlert(config, {
              message: "Ha ocurrido un error al editar lel lote!",
              type: "error",
            });
          });
      }
    });
  };

  const getCurrentBatchInfo = async (batchId, config) => {
    const { setIsLoading, setLoadingText } = config;
    const collectionReference = collection(db, "batches");
    const q = query(collectionReference, where("id", "==", batchId));

    setIsLoading(true);
    setLoadingText("Cargando información del lote...");
    await getDocs(q).then((querySnapshot) => {
      setIsLoading(false);
      querySnapshot.docs.forEach((document) => {
        const batch = document.data();
        setBatchInfo(batch);
      });
    });
  };

  const calculateCropProgress = async (idBatch) => {
    const collectionReference = collection(db, "batches");
    const q = query(collectionReference, where("id", "==", idBatch));
    let progress = 0;
    await getDocs(q).then((querySnapshot) => {
      querySnapshot.docs.forEach((document) => {
        progress = document
          .data()
          ?.cultivationStages?.filter((cultivationStage) => {
            return cultivationStage.isStageFinished === true;
          }).length;
        document.data()?.cultivationStages?.forEach((stage) => {
          if (stage.isStageFinished && stage.isStageFinished !== undefined) {
            setDoc(
              doc(db, "batches", idBatch),
              { progress },
              {
                merge: true,
              }
            );
          }
        });
      });
      const progressValue =
        (progress / batchInfo?.cultivationStages?.length) * 100;
      setCropStatus(idBatch, progressValue);
    });
  };

  const setCropStatus = async (idBatch, progressPercentage) => {
    const collectionReference = collection(db, "batches");
    const q = query(collectionReference, where("id", "==", idBatch));
    await getDocs(q).then((querySnapshot) => {
      querySnapshot.docs.forEach((document) => {
        if (progressPercentage === 100) {
          setDoc(
            doc(db, "batches", document.id),
            { isCropFinished: true },
            {
              merge: true,
            }
          );
        } else {
          setDoc(
            doc(db, "batches", document.id),
            { isCropFinished: false },
            {
              merge: true,
            }
          );
        }
      });
    });
  };

  const getCultivationStageInfo = async (batchId, stageData, config) => {
    const { setIsLoading, setLoadingText } = config;
    const collectionReference = collection(db, "batches");
    const q = query(collectionReference, where("id", "==", batchId));
    setIsLoading(true);
    setLoadingText("Cargando información de la fase...");
    await getDocs(q).then((querySnapshot) => {
      setIsLoading(false);
      querySnapshot.docs.forEach((document) => {
        document.data().cultivationStages.forEach((cultivationStage) => {
          if (cultivationStage.id === stageData.id) {
            setCropStage(cultivationStage);
          }
        });
      });
    });
  };

  const getCropStageExpenses = async (stageId) => {
    const collectionReference = collection(db, "cropStageExpenses");
    const q = query(
      collectionReference,
      where("stageIds", "array-contains", stageId)
    );
    let expensesList = [];
    setCropStageExpenses([]);
    await getDocs(q).then((querySnapshot) => {
      querySnapshot.docs.forEach((document) => {
        if (document.exists()) {
          expensesList.push(document.data());
        }
      });
      setCropStageExpenses(expensesList);
    });
  };

  const getBatchOwner = async (batchOwnerId) => {
    const collectionReference = collection(db, "users");
    const q = query(collectionReference, where("id", "==", batchOwnerId));
    await getDocs(q).then((querySnapshot) => {
      querySnapshot.docs.forEach((document) => {
        if (document.exists()) {
          setBatchOwnerName(
            document.data().names + " " + document.data().last_names
          );
        }
      });
    });
  };

  const configCoffeeRecollectionStage = async (settingData, idFarm, config) => {
    const { setIsLoading, setLoadingText } = config;
    setIsLoading(true);
    setLoadingText("Configurando fase...");
    await setDoc(
      doc(db, "farms", idFarm),
      { settings: settingData },
      {
        merge: true,
      }
    )
      .then(() => {
        getFarmData(config, false);
        toggleAlert(config, {
          message: "Fase configurada correctamente!",
          type: "success",
        });
      })
      .catch((error) => {
        toggleAlert(config, {
          message: "Ha ocurrido un error al configurar la fase!",
          type: "error",
        });
      });
  };

  const cleanBatchData = () => {
    setBatchInfo({});
    setFilteredBatches([]);
    setBatches([]);
    setCropStageExpenses([]);
    setCropStages([]);
    setBatchOwnerName(null);
    setCropStage({});
  };

  const value = useMemo(
    () => ({
      batches,
      filteredBatches,
      batchInfo,
      cropStage,
      cropStageExpenses,
      cropStages,
      batchOwnerName,
      setFilteredBatches,
      addBatch,
      getAllBatches,
      editBatch,
      getCurrentBatchInfo,
      setCultivationStages,
      getCultivationStages,
      updateStageStatus,
      cleanBatchData,
      calculateCropProgress,
      setCropStatus,
      getCultivationStageInfo,
      getCropStageExpenses,
      getBatchOwner,
      configCoffeeRecollectionStage,
    }),
    [
      batches,
      filteredBatches,
      batchInfo,
      cropStage,
      cropStageExpenses,
      cropStages,
      batchOwnerName,
      setFilteredBatches,
      addBatch,
      getAllBatches,
      editBatch,
      getCurrentBatchInfo,
      setCultivationStages,
      getCultivationStages,
      updateStageStatus,
      cleanBatchData,
      calculateCropProgress,
      setCropStatus,
      getCultivationStageInfo,
      getCropStageExpenses,
      getBatchOwner,
      configCoffeeRecollectionStage,
    ]
  );

  return (
    <BatchesContext.Provider value={value}>{children}</BatchesContext.Provider>
  );
};

export { BatchesProvider };
export default BatchesContext;
