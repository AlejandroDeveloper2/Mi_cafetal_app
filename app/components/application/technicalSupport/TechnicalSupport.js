import { ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Icon, Input } from "@rneui/themed";

import ButtonApp from "../../shared/buttonApp/ButtonApp";
import useTheme from "../../../hooks/useTheme";
import useValidator from "../../../hooks/useValidator";
import useAlert from "../../../hooks/useAlert";
import useLoading from "../../../hooks/useLoading";
import useSupport from "../../../hooks/useSupport";
import { PanelContainer, Item } from "./TechnicalSupport.style";
const TechnicalSupport = () => {
  const { red, strongBrown, disabledColor, yellow } = useTheme();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { Loading, setIsLoading, setLoadingText } = useLoading();
  const { Alert, showAlert, hideAlert, setAlert } = useAlert();
  const { suggestionSubmission } = useSupport();
  const { values, setFieldValue, handleSubmit, errors } = useFormik({
    initialValues: {
      affair: "",
      messague: "",
    },
    onSubmit: (values, { resetForm }) => {
      const config = {
        setIsLoading,
        setLoadingText,
        showAlert,
        hideAlert,
        setAlert,
      };
      suggestionSubmission(values, config);
      resetForm();
    },
    validate: (values) => {
      const errors = {};
      if (!values.affair) {
        errors.affair = "Campo obligatorio!";
      }
      if (values.affair.length < 10) {
        errors.affair = "El campo de tener mas de 10 caracteres";
      }
      if (!values.messague) {
        errors.messague = "Campo obligatorio!";
      }
      if (values.messague.length < 20) {
        errors.messague = "El campo debe tener mas de 20 caracteres!";
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
      <PanelContainer>
        <Input
          placeholder="Asunto"
          onChangeText={(text) => setFieldValue("affair", text)}
          value={values.affair}
          autoComplete="off"
          leftIcon={
            <Icon
              type="material"
              name="info"
              color={errors.affair ? red : strongBrown}
              brand={true}
            />
          }
          inputStyle={{
            fontSize: 14,
            color: strongBrown,
            fontFamily: "Montserrat_400Regular",
          }}
          errorStyle={{ color: red, fontFamily: "Montserrat_400Regular" }}
          errorMessage={errors.affair ? errors.affair : ""}
          inputContainerStyle={errors.affair && { borderColor: red }}
        />
        <Input
          placeholder="Mensaje"
          onChangeText={(text) => setFieldValue("messague", text)}
          value={values.messague}
          autoComplete="off"
          leftIcon={
            <Icon
              type="Entypo"
              name="message"
              color={errors.messague ? red : strongBrown}
              brand={true}
            />
          }
          inputStyle={{
            fontSize: 14,
            color: strongBrown,
            fontFamily: "Montserrat_400Regular",
          }}
          errorStyle={{ color: red, fontFamily: "Montserrat_400Regular" }}
          errorMessage={errors.messague ? errors.messague : ""}
          inputContainerStyle={errors.messague && { borderColor: red }}
        />
        <Item>
          <ButtonApp
            label="Enviar"
            width="100%"
            background={isButtonDisabled ? disabledColor : yellow}
            iconName="envelope"
            fontColor={strongBrown}
            fontSize="14px"
            action={isButtonDisabled ? null : handleSubmit}
          />
        </Item>
      </PanelContainer>
    </>
  );
};

export default TechnicalSupport;
