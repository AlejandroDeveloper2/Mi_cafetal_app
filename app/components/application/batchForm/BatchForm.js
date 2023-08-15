import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Icon, Input } from "@rneui/themed";
import { Dropdown } from "react-native-element-dropdown";
import { View, Text } from "react-native";

import useTheme from "../../../hooks/useTheme";
import useBatches from "../../../hooks/useBatches";
import useFarm from "../../../hooks/useFarm";
import cultivationStages from "../../../data/cultivationStages.json";

import ButtonApp from "../../shared/buttonApp/ButtonApp";

import {
  Form,
  Item,
  TitleForm,
  dropdownStyle,
  dropdownStyleError,
} from "./BatcheForm.style";

const BatcheForm = ({ action, formName, config }) => {
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
  const { farm, getFarmData } = useFarm();
  const { batchInfo, batchOwnerName, addBatch, editBatch, getBatchOwner } =
    useBatches();

  const initialValuesAdd = {
    batchName: "",
    treeQuantity: "",
    typeCoffe: "",
    cultivationStage: "",
  };
  const initialValuesEdit = {
    batchName: batchInfo?.batchName,
    treeQuantity: batchInfo?.treeQuantity,
    typeCoffe: batchInfo?.typeCoffe,
    cultivationStage: batchInfo?.cultivationStage,
  };
  const { values, setFieldValue, handleSubmit, errors } = useFormik({
    initialValues: action === "add" ? initialValuesAdd : initialValuesEdit,
    onSubmit: (values, { resetForm }) => {
      if (action === "add") {
        addBatch(values, farm?.id, config, getFarmData);
        resetForm();
      } else {
        editBatch(values, batchInfo?.id, config);
      }
      config.toggleModal();
    },
    validate: (values) => {
      const errors = {};
      if (!values.batchName) {
        errors.batchName = "Campo obligatorio!";
      }
      if (!values.treeQuantity) {
        errors.treeQuantity = "Campo obligatorio!";
      } else if (!values.treeQuantity) {
        errors.treeQuantity = "El numero de arboles debe ser mayor a 0!";
      }
      if (!values.typeCoffe) {
        errors.typeCoffe = "Campo obligatorio!";
      }
      if (!values.cultivationStage) {
        errors.cultivationStage = "Campo obligatorio!";
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

  useEffect(() => {
    if (action === "edit" && Object.keys(batchInfo).length > 0) {
      getBatchOwner(batchInfo?.batchOwner);
    }
  }, []);

  return (
    <>
      <Form>
        <TitleForm fontColor={strongBrown}>{formName}</TitleForm>
        <Input
          placeholder="Nombre del lote"
          placeholderTextColor={brownOpacity}
          onChangeText={(text) => setFieldValue("batchName", text)}
          value={values.batchName}
          leftIcon={
            <Icon
              type="material"
              name="local-florist"
              color={errors.batchName ? red : strongBrown}
              brand={true}
            />
          }
          inputStyle={{
            fontSize: 14,
            color: strongBrown,
            fontFamily: "Montserrat_400Regular",
          }}
          errorStyle={{ color: red, fontFamily: "Montserrat_400Regular" }}
          errorMessage={errors.batchName ? errors.batchName : ""}
          inputContainerStyle={
            errors.batchName
              ? { borderColor: red }
              : { borderColor: strongBrown }
          }
        />
        {action === "edit" && (
          <Input
            placeholder="Propietario del lote"
            placeholderTextColor={brownOpacity}
            value={batchOwnerName}
            disabled={true}
            leftIcon={
              <Icon
                type="material"
                name="person-outline"
                color={strongBrown}
                brand={true}
              />
            }
            inputStyle={{
              fontSize: 14,
              color: strongBrown,
              fontFamily: "Montserrat_400Regular",
            }}
            errorStyle={{ color: red, fontFamily: "Montserrat_400Regular" }}
          />
        )}
        <Input
          placeholder="Número de arboles"
          placeholderTextColor={brownOpacity}
          onChangeText={(text) => setFieldValue("treeQuantity", text)}
          value={values.treeQuantity}
          keyboardType="numeric"
          leftIcon={
            <Icon
              type="MaterialIcons"
              name="eco"
              color={errors.treeQuantity ? red : strongBrown}
              brand={true}
            />
          }
          inputStyle={{
            fontSize: 14,
            color: strongBrown,
            fontFamily: "Montserrat_400Regular",
          }}
          errorStyle={{ color: red, fontFamily: "Montserrat_400Regular" }}
          errorMessage={errors.treeQuantity ? errors.treeQuantity : ""}
          inputContainerStyle={
            errors.treeQuantity
              ? { borderColor: red }
              : { borderColor: strongBrown }
          }
        />
        <Input
          placeholder="Variedad de café"
          placeholderTextColor={brownOpacity}
          onChangeText={(text) => setFieldValue("typeCoffe", text)}
          value={values.typeCoffe}
          leftIcon={
            <Icon
              type="MaterialIcons"
              name="eco"
              color={errors.typeCoffe ? red : strongBrown}
              brand={true}
            />
          }
          inputStyle={{
            fontSize: 14,
            color: strongBrown,
            fontFamily: "Montserrat_400Regular",
          }}
          errorStyle={{ color: red, fontFamily: "Montserrat_400Regular" }}
          errorMessage={errors.typeCoffe ? errors.typeCoffe : ""}
          inputContainerStyle={
            errors.typeCoffe
              ? { borderColor: red }
              : { borderColor: strongBrown }
          }
        />
        {action === "add" && (
          <View style={{ width: "92%" }}>
            <Dropdown
              style={
                errors.cultivationStage ? dropdownStyleError : dropdownStyle
              }
              placeholder="Fase de cultivo"
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
              data={cultivationStages.StagesOfCultivation}
              labelField="name"
              valueField="id"
              value={values.cultivationStage}
              onChange={(item) => setFieldValue("cultivationStage", item.id)}
              renderLeftIcon={() => (
                <Icon
                  type="material"
                  name="menu"
                  color={errors.cultivationStage ? red : strongBrown}
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
              {errors.cultivationStage}
            </Text>
          </View>
        )}
        <Item>
          <ButtonApp
            label={action === "add" ? "Crear Lote" : "Guardar Cambios"}
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

export default BatcheForm;
