import { useEffect, useState, useCallback } from "react";
import { Modal, View, ScrollView } from "react-native";
import { Icon, Input } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

import useTheme from "../../../hooks/useTheme";
import useBatches from "../../../hooks/useBatches";
import useLoading from "../../../hooks/useLoading";

import ButtonApp from "../../../components/shared/buttonApp/ButtonApp";

import {
  ModalContainer,
  ModalContent,
  CloseModalButton,
  Title,
  Batch,
  NameContainer,
  BatchName,
  ResultIndicator,
  TextIndicator,
  Figure,
  Empty,
  EmptyText,
} from "./BatchListModal.style";

const BatchListModal = ({ isBatchModalOpen, setIsBatchModalOpen }) => {
  const [searchBatch, setSearchBatch] = useState("");
  const { strongBrown, mediumGray, white, yellow, normalGray } = useTheme();
  const { setIsLoading, setLoadingText } = useLoading();
  const config = {
    setIsLoading,
    setLoadingText,
  };
  const {
    batches,
    batchInfo,
    filteredBatches,
    setFilteredBatches,
    setCultivationStages,
    getCurrentBatchInfo,
  } = useBatches();

  const navigation = useNavigation();

  useEffect(() => {
    const searchBatchByName = () => {
      const newFilteredBatches = batches.filter(
        (batch) =>
          batch.batchName.substring(0, searchBatch.length) ===
          searchBatch.substring(0, searchBatch.length)
      );
      setFilteredBatches(newFilteredBatches);
      if (searchBatch === "") {
        setFilteredBatches(batches);
      }
    };
    searchBatchByName();
  }, [searchBatch]);

  const adminBatch = useCallback(
    (batch) => {
      !batch.cultivationStages &&
        setCultivationStages(batch.cultivationStage, batch.id);
      getCurrentBatchInfo(batch.id, config);
      setIsBatchModalOpen(false);
      navigation.navigate("Batch");
    },
    [batchInfo]
  );

  return (
    <>
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
            <Title fontColor={mediumGray}>Lista de lotes</Title>
            <Input
              placeholder="Buscar lote por nombre"
              placeholderTextColor={normalGray}
              onChangeText={(text) => setSearchBatch(text)}
              value={searchBatch}
              leftIcon={
                <Icon
                  type="material"
                  name="search"
                  color={mediumGray}
                  brand={true}
                />
              }
              inputStyle={{
                fontSize: 14,
                color: strongBrown,
                fontFamily: "Montserrat_400Regular",
              }}
              inputContainerStyle={{ borderColor: mediumGray }}
            />
            <ResultIndicator>
              <Icon
                type="material"
                name="view-module"
                color={mediumGray}
                brand={true}
              />
              <TextIndicator fontColor={mediumGray}>
                {filteredBatches.length} Registros encontrados
              </TextIndicator>
            </ResultIndicator>
            {filteredBatches.length === 0 ? (
              <Empty>
                <Figure
                  source={require("../../../../assets/images/illustration-4.png")}
                />
                <EmptyText fontColor={mediumGray}>
                  No hay lotes registrados!
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
                {filteredBatches?.map((batch, index) => (
                  <Batch key={index} background={white}>
                    <NameContainer>
                      <Icon
                        type="material"
                        name="eco"
                        color={mediumGray}
                        brand={true}
                        iconStyle={{ fontSize: 30 }}
                      />
                      <BatchName fontColor={mediumGray}>
                        {batch.batchName}
                      </BatchName>
                    </NameContainer>
                    <ButtonApp
                      label="Administrar"
                      width="180px"
                      height="60px"
                      iconName="settings"
                      iconGroup="material"
                      background={yellow}
                      fontColor={strongBrown}
                      fontSize="14px"
                      action={() => adminBatch(batch)}
                    />
                  </Batch>
                ))}
              </ScrollView>
            )}
          </View>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default BatchListModal;
