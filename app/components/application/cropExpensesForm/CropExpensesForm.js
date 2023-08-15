import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Icon, Input } from "@rneui/themed";
import { Dropdown } from "react-native-element-dropdown";

import useTheme from "../../../hooks/useTheme";
import useCropExpenses from "../../../hooks/useCropExpenses";
import useFarm from "../../../hooks/useFarm";

import measurementUnit from "../../../data/measurementUnit.json";
import {
  validateExpensesForm,
  setCropExpensesFormInitialValues,
  calculateTotalPricePerCategory,
  formatMoney,
  compareNumberFields,
} from "../../../helpers";
import {
  renderSeedsFormInputs,
  renderFormDropDowns,
  renderWorkForceFormInputs,
  renderToolsFormInputs,
  renderFertilizerFormInputs,
  renderJornalFormInputs,
  renderCoffeeDryingFormInputs,
  renderSellingInputs,
} from "./DomData";

import ButtonApp from "../../shared/buttonApp/ButtonApp";

import {
  Form,
  Item,
  TitleForm,
  dropdownStyle,
  dropdownStyleError,
  TotalPriceContainer,
  TotalPriceHeader,
  Label,
  TotalPrice,
} from "./CropExpensesForm.style";

const CropExpensesForm = ({
  expenseId,
  categoryId,
  formName,
  background,
  config,
  actionForm,
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const { red, strongBrown, white, brownOpacity, primaryColor } = useTheme();
  const { expenseInfo, addExpense, updateExpense } = useCropExpenses();
  const { farm } = useFarm();

  const formInputs =
    expenseId === "expense-1"
      ? renderSeedsFormInputs()
      : expenseId === "expense-2"
      ? renderWorkForceFormInputs()
      : expenseId === "expense-3"
      ? renderToolsFormInputs()
      : expenseId === "expense-4"
      ? renderFertilizerFormInputs()
      : expenseId === "expense-5"
      ? renderJornalFormInputs()
      : expenseId === "expense-6"
      ? renderJornalFormInputs("pickedKilograms")
      : expenseId === "expense-7"
      ? renderCoffeeDryingFormInputs()
      : renderSellingInputs();

  const formDropDowns =
    expenseId === "expense-1"
      ? renderFormDropDowns(measurementUnit.UnitSeeds, categoryId)
      : expenseId === "expense-2"
      ? renderFormDropDowns(measurementUnit.UnitWorkForce, categoryId)
      : expenseId === "expense-3"
      ? renderFormDropDowns(measurementUnit.UnitTools, categoryId)
      : expenseId === "expense-4"
      ? renderFormDropDowns(measurementUnit.UnitFertilizer, categoryId)
      : expenseId === "expense-5" || expenseId === "expense-6"
      ? renderFormDropDowns(
          [
            { id: 1, unitName: "Pendiente" },
            { id: 2, unitName: "Pagado" },
          ],
          categoryId
        )
      : undefined;

  const initialValues = setCropExpensesFormInitialValues(
    expenseId,
    actionForm,
    expenseInfo,
    farm
  );

  const { values, setFieldValue, handleSubmit, errors } = useFormik({
    initialValues,
    onSubmit: (values, { resetForm }) => {
      if (actionForm === "edit") {
        const expenseId = expenseInfo.id;
        const updatedValues = { ...values, totalPrice, id: expenseId };
        updateExpense(updatedValues, config);
      } else {
        const newValues = { ...values, totalPrice, categoryId };
        addExpense(newValues, config);
        console.log(values);
      }
      setTotalPrice(0);
      resetForm();
      config.toggleModal();
    },
    validate: (values) => {
      const errors = {};

      const inputs =
        categoryId === 7 || categoryId === 8
          ? formInputs
          : formInputs.concat(formDropDowns);
      return validateExpensesForm(errors, inputs, values);
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
    const existValues = compareNumberFields(values);
    if (existValues) {
      let total = calculateTotalPricePerCategory(expenseId, values);
      setTotalPrice(total);
    }
  }, [values]);

  return (
    <>
      <Form>
        <TitleForm fontColor={strongBrown}>
          {expenseId === "expense-8" ? "Agregar nueva venta" : formName}
        </TitleForm>
        {formInputs.map((input, index) => (
          <Input
            key={index}
            placeholder={input.placeholder}
            placeholderTextColor={brownOpacity}
            onChangeText={(text) => setFieldValue(input.fieldName, text)}
            value={values[input.fieldName]}
            keyboardType={input.keyboardType}
            disabled={input?.disabled ? true : false}
            leftIcon={
              <Icon
                type="material"
                name={input.iconName}
                color={errors[input.fieldName] ? red : strongBrown}
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
              errors[input.fieldName] ? errors[input.fieldName] : ""
            }
            inputContainerStyle={
              errors[input.fieldName]
                ? { borderColor: red }
                : { borderColor: strongBrown }
            }
          />
        ))}

        {expenseId !== "expense-7" && expenseId !== "expense-8"
          ? formDropDowns?.map((dropDown, index) => (
              <View style={{ width: "92%" }} key={index}>
                <Dropdown
                  style={
                    errors[dropDown.fieldName]
                      ? dropdownStyleError
                      : dropdownStyle
                  }
                  placeholder={dropDown.placeholder}
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
                  data={dropDown.data}
                  labelField={dropDown.labelField}
                  valueField={dropDown.valueField}
                  value={values[dropDown.fieldName]}
                  onChange={(item) =>
                    setFieldValue(dropDown.fieldName, item.id)
                  }
                  renderLeftIcon={() => (
                    <Icon
                      type="material"
                      name={dropDown.iconName}
                      color={errors[dropDown.fieldName] ? red : strongBrown}
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
                  {errors[dropDown.fieldName]}
                </Text>
              </View>
            ))
          : null}
        <Item>
          <TotalPriceContainer background={primaryColor}>
            <TotalPriceHeader background={background}>
              <Icon
                type="material"
                name="monetization-on"
                color={
                  expenseId === "expense-2" ||
                  expenseId === "expense-4" ||
                  expenseId === "expense-5" ||
                  expenseId === "expense-6"
                    ? white
                    : strongBrown
                }
                brand={true}
              />
              <Label
                fontColor={
                  expenseId === "expense-2" ||
                  expenseId === "expense-4" ||
                  expenseId === "expense-5" ||
                  expenseId === "expense-6"
                    ? white
                    : strongBrown
                }
              >
                Total
              </Label>
            </TotalPriceHeader>
            <TotalPrice fontColor={strongBrown}>
              {totalPrice === NaN ? formatMoney(0) : formatMoney(totalPrice)}
            </TotalPrice>
          </TotalPriceContainer>
        </Item>
        <Item>
          <ButtonApp
            label={
              actionForm !== "edit"
                ? expenseId === "expense-8"
                  ? "Agregar venta"
                  : "Agregar gasto"
                : expenseId === "expense-8"
                ? "Editar venta"
                : "Editar gasto"
            }
            width="100%"
            background={isButtonDisabled ? primaryColor : background}
            iconName={actionForm !== "edit" ? "add-box" : "create"}
            iconGroup="material"
            fontColor={
              expenseId === "expense-2" ||
              expenseId === "expense-4" ||
              expenseId === "expense-5" ||
              expenseId === "expense-6"
                ? white
                : strongBrown
            }
            fontSize="14px"
            action={isButtonDisabled ? null : handleSubmit}
          />
        </Item>
      </Form>
    </>
  );
};

export default CropExpensesForm;
