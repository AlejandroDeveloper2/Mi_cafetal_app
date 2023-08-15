import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Icon, Input } from "@rneui/themed";

import useTheme from "../../../hooks/useTheme";
import useValidator from "../../../hooks/useValidator";

import ButtonApp from "../../shared/buttonApp/ButtonApp";

import { Form, TitleForm } from "./CollaboratorForm.style";
import useFarm from "../../../hooks/useFarm";

const CollaboratorForm = ({ formName, config }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { addCollaborators } = useFarm();
  const { red, strongBrown, disabledColor, yellow, brownOpacity } = useTheme();
  const { validateEmail } = useValidator();
  const initialValues = {
    email: "",
  };
  const { values, setFieldValue, handleSubmit, errors } = useFormik({
    initialValues,
    onSubmit: (values, { resetForm }) => {
      addCollaborators(values, config);
      config.toggleModal();
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Campo obligatorio!";
      } else if (!validateEmail(values.email)) {
        errors.email = "Ingresa un email valido!";
      }
      return errors;
    },
  });

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (
        Object.keys(errors).length > 0 ||
        Object.values(values).includes("")
      ) {
        setIsButtonDisabled(true);
      } else {
        setIsButtonDisabled(false);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [values, errors]);

  return (
    <>
      <Form>
        <TitleForm fontColor={strongBrown}>{formName}</TitleForm>
        <Input
          placeholder="Email del colaborador"
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
        <ButtonApp
          label={"Enviar invitacion"}
          width="100%"
          background={isButtonDisabled ? disabledColor : yellow}
          iconName={"send"}
          iconGroup="material"
          fontColor={strongBrown}
          fontSize="14px"
          action={isButtonDisabled ? null : handleSubmit}
        />
      </Form>
    </>
  );
};

export default CollaboratorForm;
