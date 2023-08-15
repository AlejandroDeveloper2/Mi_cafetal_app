import { useCallback } from "react";
import { CheckBox, Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

import useTheme from "../../../hooks/useTheme";
import useBatches from "../../../hooks/useBatches";
import useLoading from "../../../hooks/useLoading";

import {
  Stage,
  IconContainer,
  StageIcon,
  Text,
} from "./CultivationStage.style";

const CultivationStage = ({ stage }) => {
  const { primaryColor, white, strongBrown } = useTheme();
  const { batchInfo, getCultivationStageInfo } = useBatches();
  const { setIsLoading, setLoadingText } = useLoading();
  const navigation = useNavigation();

  const { id, name, background, isStageFinished, icon } = stage;

  const color = id === 2 ? strongBrown : white;

  const config = {
    setIsLoading,
    setLoadingText,
  };

  const goToCultivationStage = useCallback(() => {
    getCultivationStageInfo(batchInfo?.id, stage, config);
    navigation.navigate("CultivationStage");
  }, [batchInfo, stage]);

  return (
    <Stage background={background} onPress={() => goToCultivationStage()}>
      <IconContainer background={primaryColor}>
        <StageIcon source={{ uri: icon }} />
      </IconContainer>
      <Text fontColor={color}>{name}</Text>
      <CheckBox
        center
        title=""
        checked={isStageFinished}
        checkedIcon={
          <Icon name="check-box" type="material" color={color} size={25} />
        }
        disabled={true}
        uncheckedIcon={
          <Icon
            name="check-box-outline-blank"
            type="material"
            color={color}
            size={25}
          />
        }
        containerStyle={{ backgroundColor: background }}
        onPress={() => {
          console.log("Checked");
        }}
      />
    </Stage>
  );
};

export default CultivationStage;
