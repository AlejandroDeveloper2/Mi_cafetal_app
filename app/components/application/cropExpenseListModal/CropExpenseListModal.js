import { useEffect, useState } from "react";
import { Modal, View, ScrollView } from "react-native";
import { Icon, Input } from "@rneui/themed";
import { Dropdown } from "react-native-element-dropdown";

import useTheme from "../../../hooks/useTheme";
import useCropExpenses from "../../../hooks/useCropExpenses";
import useDatePicker from "../../../hooks/useDatePicker";
import expensesCategories from "../../../data/expensesCategories.json";
import { formatMoney, setUnitOfMeasurementName } from "../../../helpers";

import {
  ModalContainer,
  ModalContent,
  CloseModalButton,
  Title,
  ResultIndicator,
  TextIndicator,
  Figure,
  Empty,
  EmptyText,
} from "../batchListModal/BatchListModal.style";
import {
  setDrodownStyle,
  Expense,
  ExpenseName,
  ExpenseNameContainer,
  SpentValueContainer,
  Label,
  SpentValue,
  SpentDate,
  CategoryBanner,
  CategoryText,
  ButtonEditExpense,
} from "./CropExpenseListModal.style";

const CropExpenseListModal = ({
  isBatchModalOpen,
  setIsBatchModalOpen,
  setActionForm,
  toggleModal,
  setTypeModal,
  setBackground,
  setExpenseId,
  setCategoryId,
  cropStageId,
}) => {
  const [expenseCategory, setExpenseCategory] = useState(null);
  const [initialDate, setInitialDate] = useState(null);
  const {
    strongBrown,
    mediumGray,
    white,
    yellow,
    normalGray,
    lightBrown,
    wine,
    green,
    lightYellow,
    secondColor,
  } = useTheme();
  const {
    expenses,
    filteredExpenses,
    expenseInfo,
    setFilteredExpenses,
    setExpenseInfo,
  } = useCropExpenses();
  const { date, show, DatePicker, showDatepicker } = useDatePicker();

  const setColorByExpenseCategory = (categoryId) => {
    if (categoryId === 1) return yellow;
    if (categoryId === 2) return strongBrown;
    if (categoryId === 3) return lightBrown;
    if (categoryId === 4) return mediumGray;
    if (categoryId === 5) return wine;
    if (categoryId === 6) return green;
    if (categoryId === 7) return lightYellow;
    return secondColor;
  };

  useEffect(() => {
    let count = 0;
    count += 1;
    if (count > 0) {
      setInitialDate(date.toLocaleDateString("es-MX"));
    }
  }, [date]);

  useEffect(() => {
    const searchBatchByCategory = () => {
      const newFilteredExpenses = expenses.filter(
        (expense) => expense.categoryId === expenseCategory
      );
      setFilteredExpenses(newFilteredExpenses);
      if (expenseCategory === null || expenseCategory === 0) {
        setFilteredExpenses(expenses);
      }
    };
    searchBatchByCategory();
  }, [expenseCategory]);

  useEffect(() => {
    const searchBatchByDate = () => {
      const newFilteredExpenses = expenses.filter(
        (expense) => expense.creationDate === date.toLocaleDateString("es-MX")
      );
      setFilteredExpenses(newFilteredExpenses);
      if (initialDate === null) {
        setFilteredExpenses(expenses);
      }
    };
    searchBatchByDate();
  }, [initialDate]);

  return (
    <>
      {show && <DatePicker />}
      <Modal
        visible={isBatchModalOpen}
        transparent={true}
        animationType="slide"
      >
        <ModalContainer>
          <View style={ModalContent}>
            <CloseModalButton onPress={() => setIsBatchModalOpen(false)}>
              <Icon
                type="material"
                name="close"
                color={mediumGray}
                brand={true}
              />
            </CloseModalButton>
            <Title fontColor={mediumGray}>
              {cropStageId === 5 ? "Lista de ventas" : "Lista de gastos"}
            </Title>
            <Input
              placeholder="Buscar gastos por fecha"
              placeholderTextColor={normalGray}
              value={initialDate ? initialDate : null}
              disabled={true}
              leftIcon={
                <Icon
                  type="material"
                  name="search"
                  color={mediumGray}
                  brand={true}
                />
              }
              rightIcon={
                <Icon
                  type="material"
                  name={initialDate === null ? "event-note" : "event-busy"}
                  color={mediumGray}
                  brand={true}
                  onPress={
                    initialDate === null
                      ? () => showDatepicker()
                      : () => setInitialDate(null)
                  }
                />
              }
              inputStyle={{
                fontSize: 14,
                color: strongBrown,
                fontFamily: "Montserrat_400Regular",
              }}
              inputContainerStyle={{ borderColor: mediumGray }}
            />
            <View style={{ width: "92%", marginBottom: 20 }}>
              <Dropdown
                style={setDrodownStyle(mediumGray)}
                placeholder="Filtrar por categoria"
                placeholderStyle={{
                  color: normalGray,
                  fontFamily: "Montserrat_400Regular",
                  fontSize: 14,
                }}
                onChange={(item) => setExpenseCategory(item.id)}
                selectedTextStyle={{
                  color: mediumGray,
                  fontFamily: "Montserrat_400Regular",
                  fontSize: 14,
                }}
                data={expensesCategories.ExpensesCategories}
                labelField="categoryName"
                valueField="id"
                value={expenseCategory}
                renderLeftIcon={() => (
                  <Icon
                    type="material"
                    name="filter-alt"
                    color={mediumGray}
                    brand={true}
                  />
                )}
              />
            </View>
            <ResultIndicator>
              <Icon
                type="material"
                name="view-module"
                color={mediumGray}
                brand={true}
              />
              <TextIndicator fontColor={mediumGray}>
                {filteredExpenses.length} Registros encontrados
              </TextIndicator>
            </ResultIndicator>
            {filteredExpenses.length === 0 ? (
              <Empty>
                <Figure
                  source={require("../../../../assets/images/illustration-4.png")}
                />
                <EmptyText fontColor={mediumGray}>
                  No hay gastos registrados!
                </EmptyText>
              </Empty>
            ) : (
              <ScrollView
                style={{ width: "100%" }}
                contentContainerStyle={{
                  paddingBottom: 30,
                  paddingHorizontal: 20,
                }}
              >
                {filteredExpenses?.map((expense, index) => (
                  <Expense key={index} background={white}>
                    <ExpenseNameContainer>
                      <Icon
                        type="material"
                        name="attach-money"
                        color={mediumGray}
                        brand={true}
                      />
                      <ExpenseName fontColor={mediumGray}>
                        {expense.categoryId === 1
                          ? expense.seedsName
                          : expense.categoryId === 2
                          ? "Trabajadores"
                          : expense.categoryId === 3
                          ? expense.toolName
                          : expense.categoryId === 4
                          ? expense.fertilizerName
                          : expense.categoryId === 5 || expense.categoryId === 6
                          ? expense.name
                          : expense.categoryId === 7
                          ? "Costo de secado"
                          : "Ventas de café"}
                      </ExpenseName>
                    </ExpenseNameContainer>
                    <SpentValueContainer>
                      <Label fontColor={mediumGray}>
                        {" "}
                        {expense.categoryId === 8
                          ? "Valor vendido"
                          : "Valor gastado:"}{" "}
                      </Label>
                      <SpentValue
                        fontColor={setColorByExpenseCategory(
                          expense.categoryId
                        )}
                      >
                        {formatMoney(expense.totalPrice)}
                      </SpentValue>
                    </SpentValueContainer>
                    <SpentValueContainer>
                      <Label fontColor={mediumGray}> Cantidad: </Label>
                      <SpentValue
                        fontColor={setColorByExpenseCategory(
                          expense.categoryId
                        )}
                      >
                        {expense.categoryId === 1
                          ? `${expense.amount} ${setUnitOfMeasurementName(
                              expense.categoryId,
                              expense.unitOfMeasurement
                            )}(s)`
                          : expense.categoryId === 2
                          ? `${
                              expense.workersQuantity
                            } ${setUnitOfMeasurementName(
                              expense.categoryId,
                              expense.unitOfMeasurement
                            )}(es)`
                          : expense.categoryId === 3
                          ? `${expense.toolAmount} ${setUnitOfMeasurementName(
                              expense.categoryId,
                              expense.unitOfMeasurement
                            )}(es)`
                          : expense.categoryId === 4
                          ? `${
                              expense.fertilizerAmount
                            } ${setUnitOfMeasurementName(
                              expense.categoryId,
                              expense.unitOfMeasurement
                            )}(s)`
                          : expense.categoryId === 5
                          ? `${expense.workingdays} Dia(s)`
                          : expense.categoryId === 6
                          ? `${expense.kilogramsCollected} kilo(s)`
                          : expense.categoryId === 7
                          ? `${expense.amountCoffee} arroba(s)`
                          : `${expense.sellingCoffeeAmount} arroba(s)`}
                      </SpentValue>
                    </SpentValueContainer>
                    <SpentDate fontColor={mediumGray}>
                      {expense.categoryId === 8
                        ? "Fecha de venta"
                        : "Fecha de gasto:"}{" "}
                      {expense.creationDate}
                    </SpentDate>
                    <CategoryBanner
                      background={setColorByExpenseCategory(expense.categoryId)}
                    >
                      <CategoryText
                        fontColor={
                          expense.categoryId === 1 || expense.categoryId === 3
                            ? strongBrown
                            : white
                        }
                      >
                        {expense.categoryId === 1
                          ? "Semillas"
                          : expense.categoryId === 2
                          ? "Mano de obra"
                          : expense.categoryId === 3
                          ? "Herramientas"
                          : expense.categoryId === 4
                          ? "Abonos"
                          : expense.categoryId === 5
                          ? "Jornal"
                          : expense.categoryId === 6
                          ? "Recolección del grano"
                          : expense.categoryId === 7
                          ? "Costos de secado"
                          : "Ventas"}
                      </CategoryText>
                      <ButtonEditExpense
                        borderColor={
                          expense.categoryId === 1 || expense.categoryId === 3
                            ? strongBrown
                            : white
                        }
                        onPress={() => {
                          setActionForm("edit");
                          toggleModal();
                          setIsBatchModalOpen(false);
                          setTypeModal("expensesForm");
                          setExpenseInfo(expense);
                          setBackground(
                            setColorByExpenseCategory(expense.categoryId)
                          );
                          setCategoryId(expense.categoryId);
                          setExpenseId(`expense-${expense.categoryId}`);
                        }}
                      >
                        <Icon
                          type="material"
                          name="create"
                          color={
                            expense.categoryId === 1 || expense.categoryId === 3
                              ? strongBrown
                              : white
                          }
                          brand={true}
                        />
                      </ButtonEditExpense>
                    </CategoryBanner>
                  </Expense>
                ))}
              </ScrollView>
            )}
          </View>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default CropExpenseListModal;
