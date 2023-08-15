import styled from "styled-components/native";

const ModalContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const ModalContent = {
  backgroundColor: "#E9DDDD",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
  height: "95%",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  paddingHorizontal: 20,
  paddingTop: 50,
};

const CloseModalButton = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  background-color: transparent;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-family: "Montserrat_600SemiBold";
  text-align: center;
  color: ${(props) => props.fontColor};
  margin-bottom: 10px;
`;

const Batch = styled.View`
  width: 100%;
  height: 160px;
  border-radius: 20px;
  background-color: ${(props) => props.background};
  justify-content: center;
  align-items: center;
  elevation: 10;
  flex-direction: column;
  margin-top: 20px;
`;

const NameContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: 20px;
`;
const BatchName = styled.Text`
  margin-left: 5px;
  color: ${(props) => props.fontColor};
  font-family: "Montserrat_600SemiBold";
  text-align: center;
  font-size: 20px;
`;

const TextIndicator = styled(BatchName)`
  font-family: "Montserrat_500Medium";
  font-size: 14px;
`;

const ResultIndicator = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const Figure = styled.Image`
  margin-top: 40px;
  margin-bottom: 10px;
`;
const Empty = styled.View`
  justify-content: center;
  align-items: center;
`;

const EmptyText = styled(Title)`
  font-family: "Montserrat_400Regular";
  font-size: 20px;
`;

export {
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
};
