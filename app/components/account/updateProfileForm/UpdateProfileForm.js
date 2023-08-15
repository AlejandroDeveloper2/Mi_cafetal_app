import { useEffect, useState } from "react";
import { Icon, Input } from "@rneui/themed";
import { useFormik } from "formik";

import useTheme from "../../../hooks/useTheme";
import useValidator from "../../../hooks/useValidator";
import useAlert from "../../../hooks/useAlert";
import useLoading from "../../../hooks/useLoading";
import useAccount from "../../../hooks/useAccount";

import ButtonApp from "../../shared/buttonApp/ButtonApp";

import { Form, Item, TitleForm } from "./UpdateProfileForm.style";

const UpdateProfileForm = ({ toggleModal }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { Loading, setIsLoading, setLoadingText } = useLoading();
  const { Alert, showAlert, hideAlert, setAlert } = useAlert();
  const { validateEmail } = useValidator();
  const { userData, updateProfileData } = useAccount();

  const { strongBrown, lightBrown, red, brownOpacity, primaryColor } =
    useTheme();

  const { values, setFieldValue, handleSubmit, errors } = useFormik({
    initialValues: {
      names: userData?.names,
      last_names: userData?.last_names,
      phone: userData?.phone,
      email: userData?.email,
    },
    onSubmit: (values, { resetForm }) => {
      const config = {
        setIsLoading,
        setLoadingText,
        showAlert,
        hideAlert,
        setAlert,
        toggleModal,
      };
      updateProfileData(values, config);
      resetForm();
    },
    validate: (values) => {
      const errors = {};
      const isEmailValid = validateEmail(values.email);

      if (!values.names) {
        errors.names = "Campo obligatorio!";
      } else if (values.names.length <= 2) {
        errors.names = "El nombre debe tener minimo 3 caracteres!";
      }
      if (!values.last_names) {
        errors.last_names = "Campo obligatorio!";
      } else if (values.last_names.length <= 2) {
        errors.last_names = "El apellido debe tener minimo 3 caracteres!";
      }
      if (!values.phone) {
        errors.phone = "Campo obligatorio";
      } else if (values.phone.length <= 9) {
        errors.phone = "El telefono debe tener 10 digitos!";
      }
      if (!values.email) {
        errors.email = "Campo obligatorio";
      } else if (!isEmailValid) {
        errors.email = "Correo electronico invalido!";
      }
      return errors;
    },
  });

  useEffect(() => {
    if (Object.keys(errors).length > 0 || Object.values(values).includes("")) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [values, errors]);

  return (
    <>
      <Loading />
      <Alert />
      <Form>
        <TitleForm fontColor={strongBrown}>Editar perfil</TitleForm>
        <Input
          placeholder="Nuevos nombres"
          placeholderTextColor={brownOpacity}
          onChangeText={(text) => setFieldValue("names", text)}
          value={values.names}
          leftIcon={
            <Icon
              type="material"
              name="perm-identity"
              color={errors.names ? red : strongBrown}
              brand={true}
            />
          }
          inputStyle={{
            fontSize: 14,
            color: strongBrown,
            fontFamily: "Montserrat_400Regular",
          }}
          errorStyle={{ color: red, fontFamily: "Montserrat_400Regular" }}
          errorMessage={errors.names ? errors.names : ""}
          inputContainerStyle={
            errors.names ? { borderColor: red } : { borderColor: strongBrown }
          }
        />
        <Input
          placeholder="Nuevos apellidos"
          placeholderTextColor={brownOpacity}
          onChangeText={(text) => setFieldValue("last_names", text)}
          value={values.last_names}
          leftIcon={
            <Icon
              type="material"
              name="perm-identity"
              color={errors.last_names ? red : strongBrown}
              brand={true}
            />
          }
          inputStyle={{
            fontSize: 14,
            color: strongBrown,
            fontFamily: "Montserrat_400Regular",
          }}
          errorStyle={{ color: red, fontFamily: "Montserrat_400Regular" }}
          errorMessage={errors.last_names ? errors.last_names : ""}
          inputContainerStyle={
            errors.last_names
              ? { borderColor: red }
              : { borderColor: strongBrown }
          }
        />
        <Input
          placeholder="Nuevo número de telefono"
          placeholderTextColor={brownOpacity}
          onChangeText={(text) => setFieldValue("phone", text)}
          value={values.phone}
          leftIcon={
            <Icon
              type="material"
              name="call"
              color={errors.phone ? red : strongBrown}
              brand={true}
            />
          }
          inputStyle={{
            fontSize: 14,
            color: strongBrown,
            fontFamily: "Montserrat_400Regular",
          }}
          errorStyle={{ color: red, fontFamily: "Montserrat_400Regular" }}
          errorMessage={errors.phone ? errors.phone : ""}
          inputContainerStyle={
            errors.phone ? { borderColor: red } : { borderColor: strongBrown }
          }
        />
        <Input
          placeholder="Nuevo email"
          placeholderTextColor={brownOpacity}
          onChangeText={(text) => setFieldValue("email", text)}
          value={values.email}
          leftIcon={
            <Icon
              type="material"
              name="alternate-email"
              color={errors.email ? red : strongBrown}
              brand={true}
            />
          }
          inputStyle={{
            fontSize: 14,
            color: strongBrown,
            fontFamily: "Montserrat_400Regular",
          }}
          errorStyle={{ color: red, fontFamily: "Montserrat_400Regular" }}
          errorMessage={errors.email ? errors.email : ""}
          inputContainerStyle={
            errors.email ? { borderColor: red } : { borderColor: strongBrown }
          }
        />
        <Item>
          <ButtonApp
            label="Actualizar perfil"
            width="100%"
            background={isButtonDisabled ? primaryColor : lightBrown}
            iconName="create"
            iconGroup="material"
            fontColor={strongBrown}
            fontSize="14px"
            action={isButtonDisabled ? null : handleSubmit}
          />
        </Item>
      </Form>
    </>
  );
};

export default UpdateProfileForm;
