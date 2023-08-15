import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

import useBatches from "../../../hooks/useBatches";
import useTheme from "../../../hooks/useTheme";
import useOverlay from "../../../hooks/useOverlay";
import useCropExpenses from "../../../hooks/useCropExpenses";
import useLoading from "../../../hooks/useLoading";
import useAlert from "../../../hooks/useAlert";
import { renderLowerMenuItems } from "./DomData";
import { setDinamicIcon } from "../../../helpers";

import HeaderMenu from "../../../components/shared/headerMenu/HeaderMenu";
import LowerMenu from "../../../components/shared/lowerMenu/LowerMenu";
import CropExpensesForm from "../../../components/application/cropExpensesForm/CropExpensesForm";
import CropExpenseListModal from "../../../components/application/cropExpenseListModal/CropExpenseListModal";
import CropStageForm from "../../../components/application/cropStageForm/CropStageForm";
import SettingForm from "../../../components/application/settingForm/SettingForm";

import {
  Container,
  Text,
  ScreenTitle,
  TitleContainer,
  ScreenName,
  Title,
  Content,
  Expense,
  ExpenseIcon,
  ExpenseContent,
  AddExpenseButton,
} from "./CultivationStageScreen.style";

const CultivationStageScreen = () => {
  const [actionForm, setActionForm] = useState("add");
  const [background, setBackground] = useState("");
  const [expenseId, setExpenseId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [typeModal, setTypeModal] = useState("");
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const { batchInfo, cropStage, cropStageExpenses, getCropStageExpenses } =
    useBatches();
  const { white, strongBrown, primaryColor } = useTheme();
  const navigation = useNavigation();
  const { Modal, toggleModal } = useOverlay();
  const { expenses, getExpenses, setFilteredExpenses } = useCropExpenses();
  const { setIsLoading, setLoadingText } = useLoading();
  const { showAlert, hideAlert, setAlert } = useAlert();

  const config = {
    setIsLoading,
    setLoadingText,
    showAlert,
    hideAlert,
    setAlert,
    toggleModal,
  };

  const seeBatches = () => {
    setFilteredExpenses(expenses);
    setIsBatchModalOpen(!isBatchModalOpen);
  };

  const lowerMenuItems = renderLowerMenuItems(
    navigation,
    seeBatches,
    setTypeModal,
    toggleModal,
    cropStage?.id
  );

  useEffect(() => {
    if (Object.keys(cropStage).length > 0) {
      getCropStageExpenses(cropStage?.id);
    }
  }, [cropStage]);

  useEffect(() => {
    if (
      Object.keys(cropStage).length > 0 &&
      Object.keys(batchInfo).length > 0
    ) {
      getExpenses();
    }
  }, [cropStage, batchInfo]);

  return (
    <>
      <Modal>
        {typeModal === "expensesForm" ? (
          <CropExpensesForm
            expenseId={expenseId}
            categoryId={categoryId}
            formName={
              actionForm === "add" ? "Crear nuevo gasto" : "Editar gasto"
            }
            background={background}
            config={config}
            actionForm={actionForm}
          />
        ) : typeModal === "cropStageForm" ? (
          <CropStageForm config={config} />
        ) : (
          <SettingForm config={config} />
        )}
      </Modal>
      <CropExpenseListModal
        isBatchModalOpen={isBatchModalOpen}
        setIsBatchModalOpen={setIsBatchModalOpen}
        setActionForm={setActionForm}
        toggleModal={toggleModal}
        setTypeModal={setTypeModal}
        setBackground={setBackground}
        setExpenseId={setExpenseId}
        setCategoryId={setCategoryId}
        cropStageId={cropStage?.id}
      />
      <Container
        source={require("../../../../assets/images/background-registration.png")}
      >
        <HeaderMenu />
        <ScreenTitle>
          <Icon
            type="material"
            name="category"
            color={white}
            brand={true}
            iconStyle={{ fontSize: 30 }}
          />
          <ScreenName fontColor={white}>{cropStage?.name}</ScreenName>
        </ScreenTitle>
        <Content background={white}>
          <TitleContainer>
            <Icon
              type="material"
              name="local-atm"
              color={strongBrown}
              brand={true}
              iconStyle={{ fontSize: 40 }}
            />
            <Title fontColor={strongBrown}>Categorias de gastos</Title>
          </TitleContainer>
          <ScrollView
            style={{ width: "100%" }}
            contentContainerStyle={{ alignItems: "center", paddingBottom: 110 }}
          >
            {cropStageExpenses?.map((expense, index) => (
              <Expense key={index} background={expense.background}>
                <ExpenseContent>
                  <ExpenseIcon source={setDinamicIcon(expense.id)} />
                  <Text
                    fontColor={
                      expense.id === "expense-2" ||
                      expense.id === "expense-4" ||
                      expense.id === "expense-5" ||
                      expense.id === "expense-6" ||
                      expense.id === "expense-7"
                        ? white
                        : strongBrown
                    }
                  >
                    {expense.name}
                  </Text>
                </ExpenseContent>
                <AddExpenseButton
                  background={primaryColor}
                  onPress={() => {
                    setBackground(expense.background);
                    setExpenseId(expense.id);
                    setCategoryId(expense.categoryId);
                    setTypeModal("expensesForm");
                    setActionForm("add");
                    toggleModal();
                  }}
                >
                  <Icon
                    type="material"
                    name="add"
                    color={expense.background}
                    brand={true}
                    iconStyle={{ fontSize: 30 }}
                  />
                </AddExpenseButton>
              </Expense>
            ))}
          </ScrollView>
        </Content>
        <LowerMenu lowerMenuItems={lowerMenuItems} />
      </Container>
    </>
  );
};

export default CultivationStageScreen;
