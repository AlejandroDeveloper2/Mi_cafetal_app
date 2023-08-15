import styled from "styled-components/native";

const Form = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Item = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 10px;
`;

const TitleForm = styled.Text`
  color: ${(props) => props.fontColor};
  font-size: 24px;
  text-align: center;
  font-family: "Montserrat_400Regular";
  margin-bottom: 30px;
`;

const dropdownStyle = {
  width: "100%",
  height: 50,
  borderBottomColor: "#835A3E",
  borderBottomWidth: 1,
  marginVertical: 10,
};

const dropdownStyleError = {
  width: "100%",
  height: 50,
  borderBottomColor: "#F61F0C",
  borderBottomWidth: 1,
  marginVertical: 10,
};

const TotalPriceContainer = styled.View`
  width: 100%;
  height: 70px;
  background-color: ${(props) => props.background};
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
`;

const TotalPriceHeader = styled.View`
  height: 100%;
  width: 65px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  background-color: ${(props) => props.background};
  align-items: center;
  justify-content: space-around;
  position: absolute;
  padding-vertical: 10px;
  left: 0;
`;

const Label = styled(TitleForm)`
  font-size: 12px;
  font-family: "Montserrat_500Medium";
  margin-bottom: 0;
`;

const TotalPrice = styled(TitleForm)`
  font-size: 24px;
  font-family: "Montserrat_600SemiBold";
  margin-bottom: 0;
`;

export {
  Form,
  Item,
  TitleForm,
  dropdownStyle,
  dropdownStyleError,
  TotalPriceContainer,
  TotalPriceHeader,
  Label,
  TotalPrice,
};
