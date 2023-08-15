import React, { useState, createContext, useMemo } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  setDoc,
  doc,
  where,
  getDocs,
  collection,
  query,
  addDoc,
} from "firebase/firestore";

import { db } from "../utils/firebase";
import { toggleAlert } from "../helpers";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  const logIn = async (values, config) => {
    const { setIsLoading, setLoadingText, showAlert, hideAlert, setAlert } =
      config;
    const { email, password } = values;
    setLoadingText("Validando datos...");
    setIsLoading(true);
    const auth = getAuth();
    const userCollection = collection(db, "users");
    const q = query(userCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        showAlert();
        setIsLoading(false);
        if (auth.currentUser.emailVerified) {
          hideAlert(0);
          setIsAuth(true);
        } else {
          setAlert(
            "warning",
            "La cuenta esta inactiva. Para activarla revisa tu correo!"
          );
        }
        hideAlert();
      })
      .catch(() => {
        showAlert();
        setIsLoading(false);
        if (!querySnapshot.empty) {
          setAlert("error", "La contraseña es incorrecta!");
        } else {
          setAlert(
            "error",
            "El correo ingresado no corresponde a ningún usuario registrado!"
          );
        }
        hideAlert();
      });
  };

  const logOut = () => {
    setIsAuth(null);
    getAuth().signOut();
  };

  const checkIfUserIsLoggedIn = () => {
    getAuth().onAuthStateChanged((user) => {
      !user
        ? setIsAuth(null)
        : user.emailVerified
        ? setIsAuth(true)
        : setIsAuth(false);
    });
  };

  const registerUserAccount = (user, config) => {
    const { setIsLoading, setLoadingText } = config;
    const auth = getAuth();
    setLoadingText("");
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userResult) => {
        const id = userResult.user.uid;
        const userReference = doc(db, "users", id);
        setDoc(userReference, {
          names: user.names,
          last_names: user.last_names,
          phone: user.phone,
          email: user.email,
          id: id,
        })
          .then((res) => {
            verifyAcooutn(auth.currentUser, config);
          })
          .catch(() => {
            toggleAlert(config, {
              message: "Ocurrio un error con el registro!",
              type: "error",
            });
          });
      })
      .catch(() => {
        toggleAlert(config, {
          message: "El correo ya se encuentra registrado!",
          type: "error",
        });
      });
  };

  const verifyAcooutn = async (user, config) => {
    const { setIsLoading, setLoadingText } = config;
    sendEmailVerification(user)
      .then(() => {
        setIsLoading(false);
        toggleAlert(config, {
          message:
            "Registro exitoso,se envio un correo para la activacion de tu cuenta!",
          type: "success",
        });
      })
      .catch(() => {
        toggleAlert(config, {
          message: "Ocurrio un error con el correo!",
          type: "error",
        });
      });
  };

  const recoverUserPassword = (value, config) => {
    const { setIsLoading, setLoadingText } = config;
    setLoadingText("Validando datos...");
    setIsLoading(true);
    const userCollection = collection(db, "users");
    const q = query(userCollection, where("email", "==", value.email));
    getDocs(q)
      .then((res) => {
        if (!res.empty) {
          const auth = getAuth();
          passwordRequest(auth, value.email, config);
        } else {
          toggleAlert(config, {
            message:
              "El correo ingresado no corresponde a ningún usuario registrado!",
            type: "error",
          });
        }
      })
      .catch(() => {
        toggleAlert(config, {
          message: "Este correo no se encuentra registrado!",
          type: "error",
        });
      });
  };

  const passwordRequest = (auth, email, config) => {
    const { setIsLoading, setLoadingText } = config;
    sendPasswordResetEmail(auth, email)
      .then((res) => {
        setIsLoading(false);
        toggleAlert(config, {
          message: "Se envio un correo para la recuperacion de tu contraseña!",
          type: "success",
        });
      })
      .catch(() => {
        toggleAlert(config, {
          message: "Ocurrio un error con la recuperacion de tu contraseña!",
          type: "error",
        });
      });
  };

  const value = useMemo(
    () => ({
      isAuth,
      logIn,
      logOut,
      checkIfUserIsLoggedIn,
      registerUserAccount,
      recoverUserPassword,
    }),
    [
      isAuth,
      logIn,
      logOut,
      checkIfUserIsLoggedIn,
      registerUserAccount,
      recoverUserPassword,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export { AuthProvider };
export default AuthContext;
