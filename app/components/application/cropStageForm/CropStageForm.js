import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Icon } from "@rneui/themed";
import { Dropdown } from "react-native-element-dropdown";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import useTheme from "../../../hooks/useTheme";
import useBatches from "../../../hooks/useBatches";

import ButtonApp from "../../shared/buttonApp/ButtonApp";

import {
  Form,
  Title,
  dropdownStyle,
  dropdownStyleError,
  Item,
} from "./CropStageForm.style";

const cropStageStatus = [
  { id: 1, status: "Finalizada" },
  { id: 2, status: "En progreso" },
];

const CropStageForm = ({ config }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { strongBrown, brownOpacity, red, yellow, disabledColor } = useTheme();
  const { batchInfo, cropStage, updateStageStatus } = useBatches();

  const navigation = useNavigation();

  const initialValues = {
    stageStatus: cropStage.isStageFinished ? 1 : 2,
  };

  const { values, setFieldValue, handleSubmit, errors } = useFormik({
    initialValues,
    onSubmit: (values, { resetForm }) => {
      resetForm();
      updateStageStatus(
        cropStage?.id,
        batchInfo?.id,
        values.stageStatus,
        navigation,
        config
      );
      config.toggleModal();
    },
    validate: (values) => {
      const errors = {};
      if (!values.stageStatus) {
        errors.stageStatus = "Campo obligatorio!";
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
        <Title fontColor={strongBrown}>Editar estado de fase</Title>
        <View style={{ width: "92%" }}>
          <Dropdown
            style={errors.stageStatus ? dropdownStyleError : dropdownStyle}
            placeholder="Estado de la fase del cultivo"
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
            data={cropStageStatus}
            labelField="status"
            valueField="id"
            value={values.stageStatus}
            onChange={(item) => setFieldValue("stageStatus", item.id)}
            renderLeftIcon={() => (
              <Icon
                type="material"
                name="menu"
                color={errors.stageStatus ? red : strongBrown}
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
            {errors.stageStatus}
          </Text>
        </View>
        <Item>
          <ButtonApp
            label="Editar estado"
            width="100%"
            background={isButtonDisabled ? disabledColor : yellow}
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

export default CropStageForm;
