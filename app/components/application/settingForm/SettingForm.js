import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Icon, Input } from "@rneui/themed";

import useTheme from "../../../hooks/useTheme";
import useFarm from "../../../hooks/useFarm";
import useBatches from "../../../hooks/useBatches";

import ButtonApp from "../../shared/buttonApp/ButtonApp";

import { Form, Item, TitleForm } from "./SettingForm.style";

const SettingForm = ({ config }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { strongBrown, brownOpacity, primaryColor, lightBrown, red } =
    useTheme();
  const { farm } = useFarm();
  const { configCoffeeRecollectionStage } = useBatches();

  const initialValues = farm?.settings
    ? {
        dailyWorkPrice: farm?.settings?.dailyWorkPrice,
        coffeeKilogramPrice: farm?.settings?.coffeeKilogramPrice,
      }
    : {
        dailyWorkPrice: "",
        coffeeKilogramPrice: "",
      };

  const { values, setFieldValue, handleSubmit, errors } = useFormik({
    initialValues: initialValues,
    onSubmit: (values, { resetForm }) => {
      configCoffeeRecollectionStage(values, farm?.id, config);
      resetForm();
      config.toggleModal();
    },
    validate: (values) => {
      const errors = {};
      if (!values.dailyWorkPrice) {
        errors.dailyWorkPrice = "Campo obligatorio!";
      }
      if (!values.coffeeKilogramPrice) {
        errors.coffeeKilogramPrice = "Campo obligatorio!";
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
    <Form>
      <TitleForm fontColor={strongBrown}>
        Configurar lote para recolección
      </TitleForm>
      <Input
        placeholder="Precio jornal"
        placeholderTextColor={brownOpacity}
        onChangeText={(text) => setFieldValue("dailyWorkPrice", text)}
        keyboardType="numeric"
        value={values.dailyWorkPrice}
        leftIcon={
          <Icon
            type="material"
            name="monetization-on"
            color={errors.dailyWorkPrice ? red : strongBrown}
            brand={true}
          />
        }
        inputStyle={{
          fontSize: 14,
          color: strongBrown,
          fontFamily: "Montserrat_400Regular",
        }}
        errorStyle={{ color: red, fontFamily: "Montserrat_400Regular" }}
        errorMessage={errors.dailyWorkPrice ? errors.dailyWorkPrice : ""}
        inputContainerStyle={
          errors.dailyWorkPrice
            ? { borderColor: red }
            : { borderColor: strongBrown }
        }
      />
      <Input
        placeholder="Precio del kilo"
        placeholderTextColor={brownOpacity}
        onChangeText={(text) => setFieldValue("coffeeKilogramPrice", text)}
        keyboardType="numeric"
        value={values.coffeeKilogramPrice}
        leftIcon={
          <Icon
            type="material"
            name="monetization-on"
            color={errors.coffeeKilogramPrice ? red : strongBrown}
            brand={true}
          />
        }
        inputStyle={{
          fontSize: 14,
          color: strongBrown,
          fontFamily: "Montserrat_400Regular",
        }}
        errorStyle={{ color: red, fontFamily: "Montserrat_400Regular" }}
        errorMessage={
          errors.coffeeKilogramPrice ? errors.coffeeKilogramPrice : ""
        }
        inputContainerStyle={
          errors.coffeeKilogramPrice
            ? { borderColor: red }
            : { borderColor: strongBrown }
        }
      />
      <Item>
        <ButtonApp
          label="Guardar Cambios"
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
  );
};

export default SettingForm;
