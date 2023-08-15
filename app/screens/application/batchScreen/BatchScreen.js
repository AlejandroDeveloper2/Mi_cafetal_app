import { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

import useTheme from "../../../hooks/useTheme";
import useBatches from "../../../hooks/useBatches";
import useOverlay from "../../../hooks/useOverlay";
import useLoading from "../../../hooks/useLoading";
import useAlert from "../../../hooks/useAlert";
import { renderLowerMenuItems } from "./DomData";

import HeaderMenu from "../../../components/shared/headerMenu/HeaderMenu";
import CultivationStage from "../../../components/application/cultivationStage/CultivationStage";
import LowerMenu from "../../../components/shared/lowerMenu/LowerMenu";
import BatchListModal from "../../../components/application/batchListModal/BatchListModal";
import CropProgress from "../../../components/application/cropProgress/CropProgress";

import {
  Container,
  Content,
  Text,
  ScreenTitle,
  ScreenName,
  CropStatus,
  Status,
  Title,
} from "./BatchScreen.style";
import BatcheForm from "../../../components/application/batchForm/BatchForm";
import GenerateReportForm from "../../../components/application/generateReport/GenerateReportForm";

const BatchScreen = () => {
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [typeModal, setTypeModal] = useState(null);
  const { white, yellow, strongBrown } = useTheme();
  const { setIsLoading, setLoadingText } = useLoading();
  const { showAlert, hideAlert, setAlert } = useAlert();
  const { batchInfo, cropStages, getCultivationStages } = useBatches();
  const { Modal, toggleModal } = useOverlay();
  const navigation = useNavigation();

  const lowerMenuItems = renderLowerMenuItems(
    navigation,
    isBatchModalOpen,
    setIsBatchModalOpen,
    toggleModal,
    setTypeModal
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
    if (Object.keys(batchInfo).length > 0) {
      getCultivationStages(batchInfo?.id);
    }
  }, [batchInfo]);

  return (
    <>
      <BatchListModal
        isBatchModalOpen={isBatchModalOpen}
        setIsBatchModalOpen={setIsBatchModalOpen}
      />
      <Modal>
        {typeModal === "progress" ? (
          <CropProgress />
        ) : typeModal == "edit" ? (
          <BatcheForm action="edit" formName="Editar Lote" config={config} />
        ) : (
          <GenerateReportForm
            formName="Generar Reportes"
            config={config}
            id={batchInfo?.id}
          />
        )}
      </Modal>
      <Container
        source={require("../../../../assets/images/background-registration.png")}
      >
        <HeaderMenu title="" />
        <ScreenTitle>
          <Icon
            type="material"
            name="view-module"
            color={white}
            brand={true}
            iconStyle={{ fontSize: 30 }}
          />
          <ScreenName fontColor={white}>{batchInfo?.batchName}</ScreenName>
        </ScreenTitle>
        <Content background={white}>
          <CropStatus background={yellow}>
            <Text fontColor={white}>Estado del cultivo:</Text>
            <Status fontColor={white}>
              {batchInfo?.isCropFinished ? "Finalizado" : "En progreso"}
            </Status>
          </CropStatus>
          <Title fontColor={strongBrown}>Fases del cultivo</Title>
          <ScrollView
            style={{ width: "100%" }}
            contentContainerStyle={{ alignItems: "center" }}
          >
            {cropStages?.map((stage, index) => (
              <CultivationStage key={index} stage={stage} />
            ))}
          </ScrollView>
        </Content>
        <LowerMenu lowerMenuItems={lowerMenuItems} />
      </Container>
    </>
  );
};

export default BatchScreen;
