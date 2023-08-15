import { useEffect, useState } from "react";
import { Icon, Input } from "@rneui/themed";
import { useFormik } from "formik";

import useTheme from "../../../hooks/useTheme";
import useValidator from "../../../hooks/useValidator";
import useAlert from "../../../hooks/useAlert";
import useLoading from "../../../hooks/useLoading";
import useAccount from "../../../hooks/useAccount";

import ButtonApp from "../../shared/buttonApp/ButtonApp";

import { Form, Item, TitleForm } from "./ChangePasswordForm.styles";

const ChangePasswordForm = ({ toggleModal }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { Loading, setIsLoading, setLoadingText } = useLoading();
  const { Alert, showAlert, hideAlert, setAlert } = useAlert();
  const { validatePassword } = useValidator();
  const { updateUserPassword } = useAccount();

  const {
    strongBrown,
    lightBrown,
    red,
    secondaryColor,
    brownOpacity,
    primaryColor,
  } = useTheme();

  const { values, setFieldValue, handleSubmit, errors } = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
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
      updateUserPassword(values, config);
      resetForm();
    },
    validate: (values) => {
      const errors = {};
      if (!values.currentPassword) {
        errors.currentPassword = "Campo obligatorio!";
      }
      if (!values.newPassword) {
        errors.newPassword = "Campo obligatorio!";
      } else if (!validatePassword(values.newPassword)) {
        errors.newPassword = "La contraseña debe ser minimo de 8 caracteres!";
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
        <TitleForm fontColor={strongBrown}>Editar contraseña</TitleForm>
        <Input
          placeholder="Contraseña actual"
          placeholderTextColor={brownOpacity}
          onChangeText={(text) => setFieldValue("currentPassword", text)}
          value={values.currentPassword}
          leftIcon={
            <Icon
              type="material"
              name="https"
              color={errors.currentPassword ? red : strongBrown}
              brand={true}
            />
          }
          rightIcon={
            <Icon
              type="font-awesome"
              name={isPasswordVisible ? "eye-slash" : "eye"}
              color={errors.currentPassword ? red : secondaryColor}
              brand={true}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          }
          inputStyle={{
            fontSize: 14,
            color: strongBrown,
            fontFamily: "Montserrat_400Regular",
          }}
          errorStyle={{ color: red, fontFamily: "Montserrat_400Regular" }}
          errorMessage={errors.currentPassword ? errors.currentPassword : ""}
          secureTextEntry={!isPasswordVisible ? true : false}
          inputContainerStyle={
            errors.currentPassword
              ? { borderColor: red }
              : { borderColor: strongBrown }
          }
        />
        <Input
          placeholder="Nueva contraseña"
          placeholderTextColor={brownOpacity}
          onChangeText={(text) => setFieldValue("newPassword", text)}
          value={values.newPassword}
          leftIcon={
            <Icon
              type="material"
              name="lock-outline"
              color={errors.newPassword ? red : strongBrown}
              brand={true}
            />
          }
          rightIcon={
            <Icon
              type="font-awesome"
              name={isPasswordVisible ? "eye-slash" : "eye"}
              color={errors.newPassword ? red : secondaryColor}
              brand={true}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          }
          inputStyle={{
            fontSize: 14,
            color: strongBrown,
            fontFamily: "Montserrat_400Regular",
          }}
          errorStyle={{ color: red, fontFamily: "Montserrat_400Regular" }}
          errorMessage={errors.newPassword ? errors.newPassword : ""}
          secureTextEntry={!isPasswordVisible ? true : false}
          inputContainerStyle={
            errors.newPassword
              ? { borderColor: red }
              : { borderColor: strongBrown }
          }
        />
        <Item>
          <ButtonApp
            label="Actualizar contraseña"
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

export default ChangePasswordForm;
