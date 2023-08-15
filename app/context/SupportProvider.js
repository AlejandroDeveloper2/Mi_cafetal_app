import React, { createContext } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { getAuth } from "firebase/auth";

import { toggleAlert } from "../helpers";

const SupportContext = createContext();

const SupportProvider = ({ children }) => {
  const suggestionSubmission = (value, config) => {
    const auth = getAuth();
    const { setIsLoading, setLoadingText, showAlert, hideAlert, setAlert } =
      config;
    const email = "micafetalapp2022@gmail.com";
    setLoadingText("Enviado mensaje a soporte...");
    setIsLoading(true);
    const collectionRef = collection(db, "mail");
    const emailContent = {
      to: email,
      message: {
        subject: value.affair,
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
              <img alt="Logo" src="https://firebasestorage.googleapis.com/v0/b/mi-cafetal-app-de74f.appspot.com/o/Header.png?alt=media&token=63c8f438-cb1b-434a-bb3a-5ca0951afe36" style="width: 510px; height: 210px" />
              <div
                style="
                  padding: 20px;
                  margin-top: -50px;
                "
              >
                <div>
                  <img src="https://firebasestorage.googleapis.com/v0/b/mi-cafetal-app-de74f.appspot.com/o/Illustration-3.png?alt=media&token=1b883346-3e96-458e-93a5-c3d7278ef06d" />
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
                  Sugerencia de :<span
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
                  <h4
                    style="
                      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                      font-style: normal;
                      line-height: 30px;
                      text-align: justify;
                      color: #835a3e;
                      font-weight: 400;
                      padding: 10px;

                    "
                  >
                    ${value.messague}
                  </h4>
                </div>
              </div>
            </div>
          </div>`,
      },
    };
    addDoc(collectionRef, emailContent)
      .then(() => {
        toggleAlert(config, {
          message: "La sugerencia fue enviada con exito!",
          type: "success",
        });
      })
      .catch(() => {
        toggleAlert(config, {
          message: "Ocurrio un error con el envio de tu sugerencia!",
          type: "error",
        });
      });
  };

  return (
    <SupportContext.Provider value={{ suggestionSubmission }}>
      {children}
    </SupportContext.Provider>
  );
};

export { SupportProvider };
export default SupportContext;
