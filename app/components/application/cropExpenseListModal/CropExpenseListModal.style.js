import styled from "styled-components/native";

const setDrodownStyle = (color) => {
  return {
    width: "100%",
    height: 50,
    borderBottomColor: color,
    borderBottomWidth: 1,
    marginVertical: 10,
  };
};

const Expense = styled.View`
  width: 100%;
  height: 220px;
  background-color: ${(props) => props.background};
  border-radius: 20px;
  elevation: 10;
  position: relative;
  padding-top: 20px;
  margin-vertical: 20px;
  overflow: hidden;
`;

const ExpenseName = styled.Text`
  margin-left: 5px;
  color: ${(props) => props.fontColor};
  font-family: "Montserrat_600SemiBold";
  text-align: center;
  font-size: 20px;
`;

const ExpenseNameContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;
`;

const SpentValueContainer = styled(ExpenseNameContainer)`
  align-items: center;
`;

const Label = styled(ExpenseName)`
  margin-left: 0;
  font-size: 15px;
`;

const SpentValue = styled(ExpenseName)`
  margin-left: 5px;
  font-size: 15px;
`;

const SpentDate = styled(ExpenseName)`
  margin-left: 0;
  font-size: 14px;
  font-family: "Montserrat_400Regular";
`;

const CategoryBanner = styled.View`
  width: 100%;
  height: 60px;
  background-color: ${(props) => props.background};
  position: absolute;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;

const CategoryText = styled(ExpenseName)`
  margin-left: 0;
`;

const ButtonEditExpense = styled.TouchableOpacity`
  width: 60px;
  height: 100%;
  position: absolute;
  right: 0;
  border-left-width: 1px;
  border-color: ${(props) => props.borderColor};
  justify-content: center;
  align-items: center;
`;

export {
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
};
