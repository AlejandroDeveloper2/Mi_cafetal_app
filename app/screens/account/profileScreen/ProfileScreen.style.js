import styled from "styled-components/native";

const Container = styled.ImageBackground`
  width: 100%;
  flex: 1;
  align-items: center;
`;
const ProfileListContainer = styled.View`
  width: 95%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.background};
  border-radius: 20px;
  elevation: 10;
  padding-vertical: 40px;
`;

const Item = styled.View`
  width: 90%;
  height: 70px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  background-color: ${(props) => props.background};
  elevation: 5;
  overflow: hidden;
`;

const IconContainer = styled.View`
  width: 60px;
  height: 90px;
  background-color: ${(props) => props.background};
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const ScreenTitle = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-vertical: 20px;
`;

const Value = styled.Text`
  color: ${(props) => props.fontColor};
  font-size: 14px;
  font-family: "Montserrat_400Regular";
  margin-top: 5px;
  text-align: center;
`;

const ScreenName = styled(Value)`
  margin-left: 0;
  font-size: 24px;
  margin-left: 10px;
  margin-top: 0;
  width: auto;
`;

const Title = styled(ScreenName)`
  font-family: "Montserrat_500Medium";
  margin-left: 0;
  margin-bottom: 40px;
`;

const Border = styled.View`
  width: 20px;
  height: 70px;
  background-color: ${(props) => props.background};
  border-left-top-radius: 10px;
  border-left-bottom-radius: 10px;
`;

const generateAvatarStyle = (lightBrown) => {
  return {
    right: -35,
    top: 10,
    backgroundColor: lightBrown,
    borderRadius: 10,
  };
};

export {
  Container,
  ProfileListContainer,
  Item,
  IconContainer,
  ScreenTitle,
  ScreenName,
  Value,
  Title,
  Border,
  generateAvatarStyle,
};
