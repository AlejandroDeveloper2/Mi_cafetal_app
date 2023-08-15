import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Icon, Input } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

import ButtonApp from "../../shared/buttonApp/ButtonApp";
import Indicator from "../../shared/indicator/Indicator";

import useTheme from "../../../hooks/useTheme";
import useValidator from "../../../hooks/useValidator";
import useAlert from "../../../hooks/useAlert";
import useLoading from "../../../hooks/useLoading";
import useAuth from "../../../hooks/useAuth";

import { FormLogin, Item } from "./LoginForm.style";

const LoginForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigator = useNavigation();
  const {
    white,
    strongBrown,
    yellow,
    primaryColor,
    red,
    secondaryColor,
    disabledColor,
    mediumGray,
    brownOpacity,
  } = useTheme();
  const { validateEmail } = useValidator();
  const { setIsLoading, setLoadingText } = useLoading();
  const { showAlert, hideAlert, setAlert } = useAlert();
  const { logIn } = useAuth();

  const { values, setFieldValue, handleSubmit, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, { resetForm }) => {
      const config = {
        setIsLoading,
        setLoadingText,
        showAlert,
        hideAlert,
        setAlert,
      };
      logIn(values, config);
      resetForm();
    },
    validate: (values) => {
      const errors = {};
      const isEmailValid = validateEmail(values.email);
      if (!values.email) {
        errors.email = "Campo obligatorio!";
      } else if (!isEmailValid) {
        errors.email = "Correo electronico invalido!";
      }
      if (!values.password) {
        errors.password = "Campo obligatorio!";
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
      <FormLogin background={white}>
        <Indicator />
        <Input
          placeholder="Ingresa tu correo"
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
        <Input
          placeholder="Ingresa tu contraseña"
          placeholderTextColor={brownOpacity}
          onChangeText={(text) => setFieldValue("password", text)}
          value={values.password}
          leftIcon={
            <Icon
              type="material"
              name="https"
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
        <Item>
          <ButtonApp
            label="Ingresar"
            width="100%"
            background={isButtonDisabled ? disabledColor : yellow}
            iconName="input"
            iconGroup="material"
            fontColor={strongBrown}
            fontSize="14px"
            action={isButtonDisabled ? null : handleSubmit}
          />
        </Item>
        <Item>
          <ButtonApp
            label="¿Has olvidado tu contraseña?"
            width="100%"
            background={primaryColor}
            iconName=""
            fontColor={mediumGray}
            fontSize="14px"
            action={() => navigator.navigate("Recover")}
          />
        </Item>
      </FormLogin>
    </>
  );
};

export default LoginForm;
