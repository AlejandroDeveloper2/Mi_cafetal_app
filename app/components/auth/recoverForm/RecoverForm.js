import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Icon, Input } from "@rneui/themed";

import ButtonApp from "../../shared/buttonApp/ButtonApp";
import Indicator from "../../shared/indicator/Indicator";

import useTheme from "../../../hooks/useTheme";
import useValidator from "../../../hooks/useValidator";
import useAlert from "../../../hooks/useAlert";
import useLoading from "../../../hooks/useLoading";
import useAuth from "../../../hooks/useAuth";

import { FormRecovery, Item } from "./RecoverForm.style";

const RecoverForm = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const { white, strongBrown, yellow, brownOpacity, red, disabledColor } =
    useTheme();
  const { validateEmail } = useValidator();
  const { setIsLoading, setLoadingText } = useLoading();
  const { showAlert, hideAlert, setAlert } = useAlert();
  const { recoverUserPassword } = useAuth();
  const { values, setFieldValue, handleSubmit, errors } = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      const config = {
        setIsLoading,
        setLoadingText,
        showAlert,
        hideAlert,
        setAlert,
      };
      recoverUserPassword(values, config);
    },
    validate: (values) => {
      const errors = {};
      const isEmailValid = validateEmail(values.email);
      if (!values.email) {
        errors.email = "Campo obligatorio!";
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
  }, [values]);
  return (
    <>
      <FormRecovery background={white}>
        <Indicator />
        <Input
          placeholder="Ingresa tu correo"
          placeholderTextColor={brownOpacity}
          onChangeText={(text) => setFieldValue("email", text)}
          autoComplete="off"
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
            label="Enviar solicitud"
            width="100%"
            background={isButtonDisabled ? disabledColor : yellow}
            iconName="send"
            iconGroup="material"
            fontColor={strongBrown}
            fontSize="14px"
            action={isButtonDisabled ? null : handleSubmit}
          />
        </Item>
      </FormRecovery>
    </>
  );
};

export default RecoverForm;
