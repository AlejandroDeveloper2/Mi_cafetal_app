import styled from "styled-components/native";

const MenuContainer = styled.View`
  background-color: ${(props) => props.background};
  flex: 1;
  width: 100%;
  align-items: center;
`;
const MenuHeader = styled.ImageBackground`
  width: 100%;
  height: 240px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const UserName = styled.Text`
  font-size: 14px;
  font-family: "Montserrat_400Regular";
  color: ${(props) => props.fontColor};
  text-align: center;
  margin-top: 10px;
`;

const UserRole = styled(UserName)`
  font-family: "Montserrat_600SemiBold";
  margin-top: 0;
`;

const MenuFooter = styled.View`
  width: 100%;
  border-top-width: 1px;
  border-color: ${(props) => props.borderColor};
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
`;
const Row = styled.View`
  margin-top: 20px;
`;

const ButtonCloseDrawer = styled.View`
  width: 50px;
  height: 50px;
  border-bottom-left-radius: 50px;
  justify-content: flex-start;
  align-items: flex-end;
  background-color: ${(props) => props.background};
  position: absolute;
  top: 0;
  right: 0;
`;

export {
  MenuContainer,
  MenuHeader,
  UserName,
  MenuFooter,
  Row,
  ButtonCloseDrawer,
  UserRole,
};
