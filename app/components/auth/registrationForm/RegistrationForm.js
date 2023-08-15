import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Icon, Input } from "@rneui/themed";

import ButtonApp from "../../shared/buttonApp/ButtonApp";
import useTheme from "../../../hooks/useTheme";
import useValidator from "../../../hooks/useValidator";
import useAlert from "../../../hooks/useAlert";
import useAuth from "../../../hooks/useAuth";
import useLoading from "../../../hooks/useLoading";

import { FormRegistration, Item } from "./ResgistrationForm.style";
import Indicator from "../../shared/indicator/Indicator";

const RegistrationForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const {
    white,
    strongBrown,
    yellow,
    red,
    secondaryColor,
    disabledColor,
    brownOpacity,
  } = useTheme();
  const { validateEmail, comparePasswords } = useValidator();
  const { setIsLoading, setLoadingText } = useLoading();
  const { showAlert, hideAlert, setAlert } = useAlert();
  const { registerUserAccount } = useAuth();
  const { values, setFieldValue, handleSubmit, errors } = useFormik({
    initialValues: {
      names: "",
      last_names: "",
      phone: "",
      email: "",
      password: "",
      confirm_Password: "",
    },
    onSubmit: (values, { resetForm }) => {
      const config = {
        setIsLoading,
        setLoadingText,
        showAlert,
        hideAlert,
        setAlert,
      };

      registerUserAccount(values, config);
      resetForm();
    },
    validate: (values) => {
      const errors = {};
      const isEmailValid = validateEmail(values.email);
      const comparePassword = comparePasswords(
        values.password,
        values.confirm_Password
      );
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
      if (!values.password) {
        errors.password = "Campo obligatorio";
      } else if (values.password.length <= 7) {
        errors.password = "La contraseña debe tener minimo 8 caracteres";
      }
      if (!values.confirm_Password) {
        errors.confirm_Password = "Campo obligatorio";
      }
      if (!comparePassword) {
        errors.confirm_Password = "Las contraseñas no coinciden!";
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
      <FormRegistration background={white}>
        <Indicator />
        <Input
          placeholder="Ingresa tus nombres"
          placeholderTextColor={brownOpacity}
          onChangeText={(text) => setFieldValue("names", text)}
          value={values.names}
          autoComplete="off"
          leftIcon={
            <Icon
              type="material"
              name="person-outline"
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
          placeholder="Ingresa tus apellidos"
          placeholderTextColor={brownOpacity}
          onChangeText={(text) => setFieldValue("last_names", text)}
          value={values.last_names}
          autoComplete="off"
          leftIcon={
            <Icon
              type="material"
              name="person-outline"
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
          placeholder="Ingresa tu telefono"
          placeholderTextColor={brownOpacity}
          onChangeText={(text) => setFieldValue("phone", text)}
          value={values.phone}
          autoComplete="off"
          keyboardType="numeric"
          maxLength={10}
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
          placeholder="Ingresa tu correo"
          placeholderTextColor={brownOpacity}
          onChangeText={(text) => setFieldValue("email", text)}
          value={values.email}
          autoComplete="off"
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
        <Input
          placeholder="Ingresa tu contraseña"
          placeholderTextColor={brownOpacity}
          onChangeText={(text) => setFieldValue("password", text)}
          value={values.password}
          autoComplete="off"
          maxLength={9}
          leftIcon={
            <Icon
              type="Entypo"
              name="lock"
              color={errors.password ? red : strongBrown}
              brand={true}
            />
          }
          rightIcon={
            <Icon
              type="font-awesome"
              name={isPasswordVisible ? "eye-slash" : "eye"}
              color={errors.password ? red : secondaryColor}
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
          errorMessage={errors.password ? errors.password : ""}
          secureTextEntry={!isPasswordVisible ? true : false}
          inputContainerStyle={
            errors.password
              ? { borderColor: red }
              : { borderColor: strongBrown }
          }
        />
        <Input
          placeholder="Confirma tu contraseña"
          placeholderTextColor={brownOpacity}
          onChangeText={(text) => setFieldValue("confirm_Password", text)}
          value={values.confirm_Password}
          maxLength={9}
          autoComplete="off"
          leftIcon={
            <Icon
              type="Entypo"
              name="lock"
              color={errors.confirm_Password ? red : strongBrown}
              brand={true}
            />
          }
          rightIcon={
            <Icon
              type="font-awesome"
              name={isPasswordVisible ? "eye-slash" : "eye"}
              color={errors.password ? red : secondaryColor}
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
          errorMessage={errors.confirm_Password ? errors.confirm_Password : ""}
          secureTextEntry={!isPasswordVisible ? true : false}
          inputContainerStyle={
            errors.confirm_Password
              ? { borderColor: red }
              : { borderColor: strongBrown }
          }
        />
        <Item>
          <ButtonApp
            label="Crear cuenta"
            width="100%"
            background={isButtonDisabled ? disabledColor : yellow}
            iconName="add-box"
            iconGroup="material"
            fontColor={strongBrown}
            fontSize="14px"
            action={isButtonDisabled ? null : handleSubmit}
          />
        </Item>
      </FormRegistration>
    </>
  );
};

export default RegistrationForm;
