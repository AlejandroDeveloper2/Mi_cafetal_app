import { useState, useEffect } from "react";

import { View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

import { useFormik } from "formik";
import { Icon, Input } from "@rneui/themed";

import useTheme from "../../../hooks/useTheme";
import useDatePicker from "../../../hooks/useDatePicker";
import useValidator from "../../../hooks/useValidator";
import cultivationStage from "../../../data/cultivationStages.json";
import useReports from "../../../hooks/useReports";
import ButtonApp from "../../shared/buttonApp/ButtonApp";
import {
  Form,
  TitleForm,
  dropdownStyle,
  dropdownStyleError,
} from "./GenerateReportForm.style";

const GenerateReportForm = ({ formName, config, id }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { generateReportPdf } = useReports();
  const [status, setDate] = useState(false);
  const { red, strongBrown, disabledColor, mediumGray, yellow, brownOpacity } =
    useTheme();
  const { date, dateOne, show, DatePicker, showDatepicker } = useDatePicker();
  const { compareDate } = useValidator();
  const initialValues = {
    Startdate: date,
    EndDate: "",
    cultivationStage: "",
    id: id,
  };
  const { values, setFieldValue, handleSubmit, errors } = useFormik({
    initialValues,
    onSubmit: (values, { resetForm }) => {
      generateReportPdf(values, config);
      config.toggleModal();
    },
    validate: (values) => {
      const errors = {};
      const validateDate = compareDate(values.Startdate, values.EndDate);
      if (!values.Startdate) {
        errors.Startdate = "Campo obligatorio!";
      }
      if (!values.EndDate) {
        errors.EndDate = "Campo obligatorio!";
      } else if (validateDate) {
        errors.EndDate = "La fecha final no debe ser menor a la fecha inicial!";
      }

      if (!values.cultivationStage) {
        errors.cultivationStage = "Campo obligatorio!";
      }
      return errors;
    },
  });

  useEffect(() => {
    let count = 0;
    count += 1;
    if (count > 0) {
      setFieldValue("Startdate", date.toLocaleDateString("es-MX"));
    }
  }, [date]);

  useEffect(() => {
    let count = 0;
    count += 1;
    if (count > 0) {
      dateOne.setDate(dateOne.getDate() + 1);
      setFieldValue("EndDate", dateOne.toLocaleDateString("es-MX"));
    }
  }, [dateOne]);

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
      {show && <DatePicker type={status} />}
      <Form>
        <TitleForm fontColor={strongBrown}>{formName}</TitleForm>
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss()}
          accessible={false}
        >
          <Input
            placeholder="Fecha de inicio"
            placeholderTextColor={brownOpacity}
            onChangeText={(text) => setFieldValue("Startdate", text)}
            value={values.Startdate}
            onFocus={() => {
              setDate(false);
              showDatepicker();
            }}
            leftIcon={
              <Icon
                type="material"
                name={values.Startdate === null ? "event-note" : "event-busy"}
                color={mediumGray}
                brand={true}
              />
            }
            inputStyle={{
              fontSize: 14,
              color: strongBrown,
              fontFamily: "Montserrat_400Regular",
            }}
            errorStyle={{ color: red, fontFamily: "Montserrat_400Regular" }}
            errorMessage={errors.Startdate ? errors.Startdate : ""}
            inputContainerStyle={
              errors.Startdate
                ? { borderColor: red }
                : { borderColor: strongBrown }
            }
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss()}
          accessible={false}
        >
          <Input
            placeholder="Fecha de fin"
            placeholderTextColor={brownOpacity}
            onChangeText={(text) => setFieldValue("EndDate", text)}
            value={values.EndDate}
            onFocus={() => {
              setDate(true);
              showDatepicker();
            }}
            leftIcon={
              <Icon
                type="material"
                name={values.EndDate === null ? "event-note" : "event-busy"}
                color={mediumGray}
                brand={true}
              />
            }
            inputStyle={{
              fontSize: 14,
              color: strongBrown,
              fontFamily: "Montserrat_400Regular",
            }}
            errorStyle={{ color: red, fontFamily: "Montserrat_400Regular" }}
            errorMessage={errors.EndDate ? errors.EndDate : ""}
            inputContainerStyle={
              errors.EndDate
                ? { borderColor: red }
                : { borderColor: strongBrown }
            }
          />
        </TouchableWithoutFeedback>

        <View style={{ width: "92%", marginBottom: 20 }}>
          <Dropdown
            style={errors.cultivationStage ? dropdownStyleError : dropdownStyle}
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
            data={cultivationStage.PhaseReport}
            labelField="categoryName"
            valueField="id"
            value={values.cultivationStage}
            onChange={(item) => setFieldValue("cultivationStage", item.id)}
            renderLeftIcon={() => (
              <Icon
                type="material"
                name="menu"
                color={mediumGray}
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
        <ButtonApp
          label={"Descargar reporte"}
          width="100%"
          background={isButtonDisabled ? disabledColor : yellow}
          iconName={"cloud-download"}
          iconGroup="material"
          fontColor={strongBrown}
          fontSize="14px"
          action={isButtonDisabled ? null : handleSubmit}
        />
      </Form>
    </>
  );
};

export default GenerateReportForm;
