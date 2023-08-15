import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Icon, Input } from "@rneui/themed";
import { Dropdown } from "react-native-element-dropdown";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

import useTheme from "../../../hooks/useTheme";
import useApplication from "../../../hooks/useApplication";
import useFarm from "../../../hooks/useFarm";
import useFarmOffline from "../../../hooks/useFarmOffline";

import ButtonApp from "../../shared/buttonApp/ButtonApp";

import {
  Form,
  Item,
  TitleForm,
  dropdownStyle,
  dropdownStyleError,
} from "./FarmForm.style";

const FarmForm = ({ action, formName, config }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const {
    red,
    strongBrown,
    disabledColor,
    yellow,
    primaryColor,
    lightBrown,
    brownOpacity,
  } = useTheme();
  const { states, isConnected, filterCitiesPerDepartment } = useApplication();
  const { farm, createFarm, editFarm } = useFarm();
  const { farmOffline, createFarmOffline, editFarmOffline } = useFarmOffline();

  const initialValuesAdd = {
    farmName: "",
    owner: "",
    state: "",
    town: "",
  };
  const initialValuesEdit = {
    farmName: isConnected ? farm.farmName : farmOffline.farmName,
    owner: isConnected ? farm.owner : farmOffline.owner,
    state: isConnected ? farm.state : farmOffline.state,
    town: isConnected ? farm.town : farmOffline.town,
  };
  const { values, setFieldValue, handleSubmit, errors } = useFormik({
    initialValues: action === "add" ? initialValuesAdd : initialValuesEdit,
    onSubmit: (values, { resetForm }) => {
      if (action === "add") {
        isConnected
          ? createFarm(values, config)
          : createFarmOffline(values, config);
        resetForm();
      } else {
        isConnected
          ? editFarm(values, farm?.id, config)
          : editFarmOffline(values, config);
      }
      config.toggleModal();
    },
    validate: (values) => {
      const errors = {};
      if (!values.farmName) {
        errors.farmName = "Campo obligatorio!";
      }
      if (!values.owner) {
        errors.owner = "Campo obligatorio!";
      } else if (values.owner.length <= 2) {
        errors.owner = "El nombre debe ser minimo de 3 caracteres!";
      }
      if (!values.state) {
        errors.state = "Campo obligatorio!";
      }
      if (!values.town) {
        errors.town = "Campo obligatorio!";
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
          placeholder="Nombre de la finca"
          placeholderTextColor={brownOpacity}
          onChangeText={(text) => setFieldValue("farmName", text)}
          value={values.farmName}
          leftIcon={
            <Icon
              type="material"
              name="local-florist"
              color={errors.farmName ? red : strongBrown}
              brand={true}
            />
          }
          inputStyle={{
            fontSize: 14,
            color: strongBrown,
            fontFamily: "Montserrat_400Regular",
          }}
          errorStyle={{ color: red, fontFamily: "Montserrat_400Regular" }}
          errorMessage={errors.farmName ? errors.farmName : ""}
          inputContainerStyle={
            errors.farmName
              ? { borderColor: red }
              : { borderColor: strongBrown }
          }
        />
        <Input
          placeholder="Propietario"
          placeholderTextColor={brownOpacity}
          onChangeText={(text) => setFieldValue("owner", text)}
          value={values.owner}
          leftIcon={
            <Icon
              type="material"
              name="person-outline"
              color={errors.owner ? red : strongBrown}
              brand={true}
            />
          }
          inputStyle={{
            fontSize: 14,
            color: strongBrown,
            fontFamily: "Montserrat_400Regular",
          }}
          errorStyle={{ color: red, fontFamily: "Montserrat_400Regular" }}
          errorMessage={errors.owner ? errors.owner : ""}
          inputContainerStyle={
            errors.owner ? { borderColor: red } : { borderColor: strongBrown }
          }
        />
        <View style={{ width: "92%" }}>
          <Dropdown
            style={errors.state ? dropdownStyleError : dropdownStyle}
            placeholder="Departamento"
            placeholderStyle={{
              color: brownOpacity,
              fontFamily: "Montserrat_400Regular",
              fontSize: 14,
            }}
            selectedTextStyle={{
              color: strongBrown,
              fontFamily: "Montserrat_400Regular",
              fontSize: 14,
            }}
            data={states}
            labelField="name"
            valueField="id"
            value={values.state}
            onChange={(item) => setFieldValue("state", item.id)}
            renderLeftIcon={() => (
              <Icon
                type="material"
                name="pin-drop"
                color={errors.state ? red : strongBrown}
                brand={true}
              />
            )}
          />
          <Text
            style={{
              color: red,
              fontSize: 12,
              fontFamily: "Montserrat_400Regular",
            }}
          >
            {errors.state}
          </Text>
        </View>
        <View style={{ width: "92%" }}>
          <Dropdown
            style={errors.town ? dropdownStyleError : dropdownStyle}
            placeholder="Municipio"
            placeholderStyle={{
              color: brownOpacity,
              fontFamily: "Montserrat_400Regular",
              fontSize: 14,
            }}
            selectedTextStyle={{
              color: strongBrown,
              fontFamily: "Montserrat_400Regular",
              fontSize: 14,
            }}
            data={filterCitiesPerDepartment(values.state)}
            labelField="name"
            valueField="id"
            value={values.town}
            onChange={(item) => setFieldValue("town", item.id)}
            renderLeftIcon={() => (
              <Icon
                type="material"
                name="pin-drop"
                color={errors.town ? red : strongBrown}
                brand={true}
              />
            )}
          />
          <Text
            style={{
              color: red,
              fontSize: 12,
              fontFamily: "Montserrat_400Regular",
            }}
          >
            {errors.town}
          </Text>
        </View>
        <Item>
          <ButtonApp
            label={action === "add" ? "Crear Finca" : "Guardar Cambios"}
            width="100%"
            background={
              isButtonDisabled
                ? action === "add"
                  ? disabledColor
                  : primaryColor
                : action === "add"
                ? yellow
                : lightBrown
            }
            iconName={action === "add" ? "add-box" : "create"}
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

FarmForm.propTypes = {
  action: PropTypes.oneOf(["add", "edit"]).isRequired,
  formName: PropTypes.string,
};

export default FarmForm;
