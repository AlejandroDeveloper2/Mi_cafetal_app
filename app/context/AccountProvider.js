import React, { useState, createContext, useMemo } from "react";
import {
  getAuth,
  updateProfile,
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider,
  updateEmail,
} from "firebase/auth";
import {
  where,
  getDocs,
  collection,
  query,
  setDoc,
  doc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";

import { db } from "../utils/firebase";
import { toggleAlert } from "../helpers";

const AccountContext = createContext();

const AccountProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [userRole, setUserRole] = useState("Usuario");

  const getProfileData = async (setIsLoading, setLoadingText) => {
    const auth = getAuth();
    const userCollection = collection(db, "users");
    const q = query(
      userCollection,
      where("email", "==", auth.currentUser.email)
    );
    setLoadingText("Cargando información del perfil..");
    setIsLoading(true);
    await getDocs(q).then((querySnapshot) => {
      setIsLoading(false);
      setUserData(querySnapshot.docs[0].data());
      setAvatar(auth.currentUser.photoURL);
    });
  };

  const uploadProfileAvatarFromPhone = async (config) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      uploadAvatarToFirebase(result.uri, config);
    }
  };

  const uploadAvatarToFirebase = async (uri, config) => {
    const { setIsLoading, setLoadingText, showAlert, hideAlert, setAlert } =
      config;

    setLoadingText("Actualizando avatar...");
    setIsLoading(true);

    const response = await fetch(uri);
    const blob = await response.blob();
    const storage = getStorage();
    const reference = ref(storage, `avatar/${userData?.id}.jpg`);

    uploadBytes(reference, blob)
      .then((snapshot) => {
        updatePhotoUrl(snapshot.metadata.fullPath, setIsLoading);
        showAlert();
        setAlert("success", "Avatar actualizado correctamente!");
        hideAlert();
      })
      .catch(() => {
        showAlert();
        setAlert("error", "Ocurrio un error al actualizar avatar!");
        hideAlert();
      });
  };

  const updatePhotoUrl = async (imagePath, setIsLoading) => {
    const storage = getStorage();
    const reference = ref(storage, imagePath);
    const imageUrl = await getDownloadURL(reference);

    const currentUser = getAuth().currentUser;
    updateProfile(currentUser, { photoURL: imageUrl });
    setAvatar(imageUrl);
    setIsLoading(false);
  };

  const updateUserPassword = async (passwordData, config) => {
    const { setIsLoading, setLoadingText, toggleModal } = config;
    const { currentPassword, newPassword } = passwordData;

    setLoadingText("Actualizando contraseña...");
    setIsLoading(true);

    const currentUser = getAuth().currentUser;
    const credentials = EmailAuthProvider.credential(
      currentUser.email,
      currentPassword
    );

    reauthenticateWithCredential(currentUser, credentials);
    await updatePassword(currentUser, newPassword)
      .then(() => {
        toggleAlert(config, {
          message: "Contraseña actualizada correctamente!",
          type: "success",
        });
        setTimeout(() => {
          toggleModal();
        }, 2000);
      })
      .catch(() => {
        toggleAlert(config, {
          message: "Hubo un error al actualizar la contraseña!",
          type: "error",
        });
      });
  };

  const updateProfileData = (userNewData, config) => {
    const { setIsLoading, setLoadingText, toggleModal } = config;
    const { names, last_names, phone, email } = userNewData;

    setLoadingText("Actualizando perfil...");
    setIsLoading(true);

    const currentUser = getAuth().currentUser;
    const userReference = doc(db, "users", currentUser.uid);

    setDoc(userReference, {
      names: names,
      last_names: last_names,
      phone: phone,
      email: email,
      id: currentUser.uid,
    })
      .then(() => {
        updateProfile(currentUser, { displayName: `${names} ${last_names}` });
        updateEmail(currentUser, email);
        getProfileData(setIsLoading, setLoadingText);
        toggleAlert(config, {
          message: "Perfil actualizado correctamente!",
          type: "success",
        });
        setTimeout(() => {
          toggleModal();
        }, 2000);
      })
      .catch(() => {
        toggleAlert(config, {
          message: "Hubo un error al actualizar el perfil!",
          type: "error",
        });
      });
  };

  const checkUserRole = (id) => {
    const auth = getAuth();
    auth.currentUser.uid === id
      ? setUserRole("Administrador")
      : setUserRole("Colaborador");
    if (userRole !== "Usuario") {
      const userReference = doc(db, "users", auth.currentUser.uid);
      setDoc(
        userReference,
        {
          userRole,
        },
        { merge: true }
      );
    }
  };

  const value = useMemo(
    () => ({
      userData,
      avatar,
      userRole,
      setUserData,
      getProfileData,
      uploadProfileAvatarFromPhone,
      updateUserPassword,
      updateProfileData,
      checkUserRole,
      setUserRole,
    }),
    [
      userData,
      avatar,
      userRole,
      setUserData,
      getProfileData,
      uploadProfileAvatarFromPhone,
      updateUserPassword,
      updateProfileData,
      checkUserRole,
    ]
  );

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};
export { AccountProvider };
export default AccountContext;
