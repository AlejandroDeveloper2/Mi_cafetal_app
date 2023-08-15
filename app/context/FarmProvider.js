import React, { useState, createContext, useMemo } from "react";
import {
  setDoc,
  doc,
  getDocs,
  collection,
  addDoc,
  where,
  query,
} from "firebase/firestore";

import { getAuth } from "firebase/auth";

import { db } from "../utils/firebase";
import { generateRandomId, toggleAlert, getCurrentDate } from "../helpers";
import useAccount from "../hooks/useAccount";

const FarmContext = createContext();

const FarmProvider = ({ children }) => {
  const [farm, setFarm] = useState({});
  const { checkUserRole } = useAccount();
  const [investments, setInvestments] = useState(0);
  const [sales, setSales] = useState(0);

  const createFarm = async (farmData, config) => {
    const { setIsLoading, setLoadingText } = config;
    const randomId = generateRandomId();
    const docReference = doc(db, "farms", randomId);
    const auth = getAuth();
    let uid = auth.currentUser.uid;
    const newFarmData = {
      ...farmData,
      uid,
      collaborators: [uid],
      batchQuantity: 0,
      id: randomId,
      creationDate: getCurrentDate(),
    };
    setLoadingText("Creando finca...");
    setIsLoading(true);
    await setDoc(docReference, newFarmData)
      .then(() => {
        getFarmData(config, false);
        toggleAlert(config, {
          message: "Finca creada correctamente!",
          type: "success",
        });
      })
      .catch(() => {
        toggleAlert(config, {
          message: "Ha ocurrido un error al crear la finca!",
          type: "error",
        });
      });
  };

  const editFarm = (values, farmId, config) => {
    const { setIsLoading, setLoadingText } = config;

    setLoadingText("Actualizando finca...");
    setIsLoading(true);

    setDoc(doc(db, "farms", farmId), values, { merge: true })
      .then(() => {
        setIsLoading(false);
        getFarmData(config, false);
        toggleAlert(config, {
          message: "Finca actualizada correctamente!",
          type: "success",
        });
      })
      .catch(() => {
        toggleAlert(config, {
          message: "Ha ocurrido un error al editar la finca!",
          type: "error",
        });
      });
  };

  const countBacthQuantity = async (farmId) => {
    const collectionReference = collection(db, "batches");
    const q = query(collectionReference, where("farmId", "==", farmId));
    await getDocs(q).then((querySnapshot) => {
      let batchQuantity = querySnapshot.docs.length;
      setFarm((prevState) => {
        const newState = { ...prevState };
        newState.batchQuantity = batchQuantity;
        return newState;
      });
      setDoc(
        doc(db, "farms", farmId),
        { batchQuantity: batchQuantity },
        { merge: true }
      );
    });
  };

  const getFarmData = async (config, loading = true) => {
    const { setIsLoading, setLoadingText } = config;
    const auth = getAuth();
    const collectionReference = collection(db, "farms");
    const q = query(
      collectionReference,
      where("collaborators", "array-contains", auth.currentUser.uid)
    );

    if (loading) {
      setLoadingText("Cargando datos de finca...");
      setIsLoading(true);
    }
    await getDocs(q).then((querySnapshot) => {
      setIsLoading(false);
      querySnapshot.docs.forEach((doc) => {
        checkUserRole(doc.data().uid);
        setFarm(doc.data());
        countBacthQuantity(doc.id);
      });
    });
  };

  const cleanFarmData = () => {
    setFarm({});
  };

  const addCollaborators = async (value, config) => {
    const { setIsLoading, setLoadingText } = config;
    const collectionReference = collection(db, "users");
    const q = query(collectionReference, where("email", "==", value.email));
    await getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.docs.length === 0
          ? toggleAlert(config, {
              message:
                "Este usuario no se encuentra registrado en la base de datos!",
              type: "error",
            })
          : querySnapshot.docs.forEach((doc) => {
              checkUserFarm(doc.id, value.email, config);
            });
      })
      .catch(() => {
        toggleAlert(config, {
          message: "Ocurrio un error con la busqueda del usuario!",
          type: "error",
        });
      });
  };

  const checkUserFarm = async (id, email, config) => {
    const { setIsLoading, setLoadingText } = config;
    const collectionReference = collection(db, "farms");
    const q = query(collectionReference, where("uid", "==", id));
    await getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.docs.length === 0
          ? CheckCollaboratorsFarm(id, email, config)
          : toggleAlert(config, {
              message: "Este usuario ya es propietario de una finca!",
              type: "error",
            });
      })
      .catch((err) => {
        toggleAlert(config, {
          message: "Ocurrio un error en la busqueda del usuario!",
          type: "error",
        });
      });
  };

  const CheckCollaboratorsFarm = async (id, email, config) => {
    const collectionReference = collection(db, "farms");
    const q = query(
      collectionReference,
      where("collaborators", "array-contains", id)
    );
    await getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.docs.length === 0
          ? SendInvitation(id, email, config)
          : toggleAlert(config, {
              message: "Este usuario ya es  colaborador de una finca!",
              type: "error",
            });
      })
      .catch((err) => {
        toggleAlert(config, {
          message: "Ocurrio un error en la busqueda del usuario!",
          type: "error",
        });
      });
  };

  const SendInvitation = (id, email, config) => {
    const { setIsLoading, setLoadingText } = config;
    const auth = getAuth();
    const collectionRef = collection(db, "mail");
    setIsLoading(true);
    const Invitation = {
      to: email,
      message: {
        subject: "Invitacion a colaborar",
        html: `  
        <div
      style="
        display: flex;
        width: 100%;
        height: 600px;
        justify-content: center;
        align-content: center;
      "
    >
      <div
        style="
          width: 510px;
          height: 650px;
          -webkit-box-shadow: 10px -5px 55px -12px rgba(171, 171, 171, 1);
          -moz-box-shadow: 10px -5px 55px -12px rgba(171, 171, 171, 1);
          box-shadow: 10px -5px 55px -12px rgba(171, 171, 171, 1);
          border-radius: 20px;
          background-color: #fff;
        "
      >
        <img
          alt="Logo"
          src="https://firebasestorage.googleapis.com/v0/b/mi-cafetal-app-de74f.appspot.com/o/Header.png?alt=media&token=63c8f438-cb1b-434a-bb3a-5ca0951afe36"
          style="width: 510px; height: 210px"
        />
        <div style="padding: 20px; margin-top: -50px">
          <div>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/mi-cafetal-app-de74f.appspot.com/o/Illustration-3.png?alt=media&token=1b883346-3e96-458e-93a5-c3d7278ef06d"
            />
          </div>
          <h2
            style="
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              font-style: normal;
              font-weight: 800;
              line-height: 30px;
              text-align: center;
              color: #835a3e;
              font-weight: 400;
            "
          >
            Invitacion de :<span
              style="
                font-weight: bold;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                text-decoration: none;
              "
            >
              ${auth.currentUser.email}</span
            >
          </h2>
          <h2
            style="
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              font-style: normal;
              font-weight: 800;
              line-height: 30px;
              text-align: center;
              color: #835a3e;
              font-weight: 400;
            "
          >
            Mensaje
          </h2>
          <div
            style="
              background-color: #e7dddd;
              width: 470px;
              border-radius: 10px;
              height: 195px;
              line-height: 25px;
            "
          >
            <div
              style="
                flex-direction: column;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                font-style: normal;
                line-height: 30px;
                text-align: justify;
                color: #835a3e;
                font-weight: 400;
                padding: 10px;
                font-size: 20px;
              "
            >
              <p>
                Hola, acabas de recibir una invitacion para ser un nuevo colaborador de la finca ${farm.farmName},
                acepta es ta invitacion en el siguiente link:
                <a
                  href="http://localhost:3001/farms/user/${id}/${farm.id}"
                  style="
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    font-style: normal;
                    line-height: 30px;
                    text-align: justify;
                    color: #835a3e;
                    font-weight: 600;
                    padding: 10px;
                    font-size: 20px;
                  "
                >
                  http://localhost:3001/farms/user/${id}/${farm.id}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    `,
      },
    };
    setLoadingText("Enviando invitación...");
    addDoc(collectionRef, Invitation)
      .then(() => {
        toggleAlert(config, {
          message: "Invitacion enviada!",
          type: "success",
        });
      })
      .catch(() => {
        toggleAlert(config, {
          message: "Ocurrio un error en el envio de la envitacion!",
          type: "error",
        });
      });
  };

  const reportsPanel = async () => {
    const auth = getAuth();
    salesGenerated();
    const collectionRef = collection(db, "expenses");
    const q = query(
      collectionRef,
      where("uid", "==", auth.currentUser.uid),
      where("categoryId", "<=", 7)
    );
    await getDocs(q)
      .then((data) => {
        let sum = 0;
        data.docs.forEach((ele) => {
          sum = ele.data().totalPrice + sum;
        });
        setInvestments(sum);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const salesGenerated = async () => {
    const auth = getAuth();
    const collectionRef = collection(db, "expenses");
    const q = query(
      collectionRef,
      where("uid", "==", auth.currentUser.uid),
      where("categoryId", "==", 8)
    );
    await getDocs(q)
      .then((data) => {
        let sum = 0;
        data.docs.forEach((ele) => {
          sum = ele.data().totalPrice + sum;
        });
        setSales(sum);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const value = useMemo(
    () => ({
      farm,
      investments,
      sales,
      createFarm,
      editFarm,
      countBacthQuantity,
      getFarmData,
      cleanFarmData,
      addCollaborators,
      reportsPanel,
    }),
    [
      farm,
      investments,
      sales,
      createFarm,
      editFarm,
      countBacthQuantity,
      getFarmData,
      cleanFarmData,
      addCollaborators,
      reportsPanel,
    ]
  );

  return <FarmContext.Provider value={value}>{children}</FarmContext.Provider>;
};
export { FarmProvider };
export default FarmContext;
