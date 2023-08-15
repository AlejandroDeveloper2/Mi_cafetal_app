import { useEffect, useState } from "react";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View } from "react-native";

import useOverlay from "../../../hooks/useOverlay";
import useTheme from "../../../hooks/useTheme";
import useApplication from "../../../hooks/useApplication";
import useFarm from "../../../hooks/useFarm";
import useFarmOffline from "../../../hooks/useFarmOffline";
import useLoading from "../../../hooks/useLoading";
import useBatches from "../../../hooks/useBatches";
import useAlert from "../../../hooks/useAlert";
import useAccount from "../../../hooks/useAccount";
import { renderLowerMenuItems } from "./DomData";

import HeaderMenu from "../../../components/shared/headerMenu/HeaderMenu";
import ButtonApp from "../../../components/shared/buttonApp/ButtonApp";
import FarmForm from "../../../components/application/farmForm/FarmForm";
import MyFarmPanel from "../../../components/application/myFarmPanel/MyFarmPanel";
import BatchListModal from "../../../components/application/batchListModal/BatchListModal";
import LowerMenu from "../../../components/shared/lowerMenu/LowerMenu";

import {
  Container,
  Content,
  Message,
  Text,
  Illustration,
  Illustrations,
  ScreenTitle,
  ScreenName,
  ContentVariant,
} from "./MyFarmScreen.style";
import BatcheForm from "../../../components/application/batchForm/BatchForm";
import CollaboratorForm from "../../../components/application/collaboratorForm/CollaboratorForm";
const MyFarmScreen = () => {
  const [typeModal, setTypeModal] = useState(null);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const navigation = useNavigation();

  const { white, primaryColor, normalGray, yellow, strongBrown } = useTheme();
  const { Modal, toggleModal } = useOverlay();
  const { isConnected, getDataDropdown } = useApplication();
  const { farm, getFarmData } = useFarm();
  const { farmOffline, getFarmDataOffline } = useFarmOffline();
  const { batches, setFilteredBatches, getAllBatches } = useBatches();
  const { setIsLoading, setLoadingText } = useLoading();
  const { showAlert, hideAlert, setAlert } = useAlert();
  const { userRole } = useAccount();

  const seeBatches = () => {
    setFilteredBatches(batches);
    setIsBatchModalOpen(!isBatchModalOpen);
  };

  const lowerMenuItems = renderLowerMenuItems(
    navigation,
    isConnected,
    userRole,
    toggleModal,
    setTypeModal,
    seeBatches
  );

  const config = {
    setIsLoading,
    setLoadingText,
    showAlert,
    hideAlert,
    setAlert,
    toggleModal,
  };

  useEffect(() => {
    if (Object.keys(farm).length > 0) {
      getAllBatches(farm?.id);
    }
  }, [farm]);

  useEffect(() => {
    getDataDropdown();
  }, []);

  useEffect(() => {
    if (isConnected) {
      getFarmData(config);
    } else {
      getFarmDataOffline(config);
    }
  }, [isConnected]);

  return (
    <>
      <Modal>
        {typeModal === "farm" ? (
          <FarmForm action="add" formName="Registrar finca" config={config} />
        ) : typeModal === "batch" ? (
          <BatcheForm
            action="add"
            formName="Crear nuevo lote"
            config={config}
          />
        ) : typeModal === "collaborator" ? (
          <CollaboratorForm formName="Agregar Colaborador" config={config} />
        ) : (
          <FarmForm action="edit" formName="Editar finca" config={config} />
        )}
      </Modal>
      <BatchListModal
        isBatchModalOpen={isBatchModalOpen}
        setIsBatchModalOpen={setIsBatchModalOpen}
      />
      <Container
        source={require("../../../../assets/images/background-registration.png")}
      >
        <HeaderMenu title="Mi Finca" />
        <ScreenTitle>
          <Icon
            type="material"
            name="local-florist"
            color={white}
            brand={true}
            iconStyle={{ fontSize: 30 }}
          />
          <ScreenName fontColor={white}>Mi finca</ScreenName>
        </ScreenTitle>
        {Object.keys(farm).length > 0 || Object.keys(farmOffline).length > 0 ? (
          <>
            <Content background={white}>
              <MyFarmPanel />
            </Content>
            <LowerMenu lowerMenuItems={lowerMenuItems} />
          </>
        ) : (
          <ContentVariant background={white}>
            <Message background={primaryColor}>
              <Icon
                type="material"
                name="info"
                color={normalGray}
                brand={true}
              />
              <Text fontColor={normalGray}>
                Aún no tienes una finca registrada! Registrala tocando el boton
                de abajo
              </Text>
            </Message>
            <ButtonApp
              label="Registrar finca"
              width="320px"
              height="80px"
              background={yellow}
              iconName="add"
              iconGroup="material"
              fontColor={strongBrown}
              fontSize="20px"
              action={() => {
                toggleModal();
                setTypeModal("farm");
              }}
            />

            <Illustration
              width="173px"
              height="191px"
              marginTop="20px"
              source={require("../../../../assets/images/illustration-1.png")}
            />
            <Illustrations>
              <Illustration
                width="60px"
                height="60px"
                marginTop="0px"
                source={require("../../../../assets/images/illustration-2.png")}
              />

              <Illustration
                width="60px"
                height="60px"
                marginTop="0px"
                source={require("../../../../assets/images/illustration-2.png")}
                style={{ transform: [{ rotate: "90deg" }] }}
              />
            </Illustrations>
          </ContentVariant>
        )}
      </Container>
    </>
  );
};

export default MyFarmScreen;
