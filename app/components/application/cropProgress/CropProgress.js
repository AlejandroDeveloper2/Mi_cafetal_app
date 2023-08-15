import useTheme from "../../../hooks/useTheme";
import useBatches from "../../../hooks/useBatches";

import {
  Container,
  Title,
  IndicatorText,
  ProgressInfo,
  ProgressBarContainer,
  ProgressBarContent,
  Percentage,
} from "./CropProgress.style";

const CropProgress = () => {
  const { strongBrown, primaryColor, yellow } = useTheme();
  const { batchInfo } = useBatches();

  const getProgressValue = () => {
    if (Object.keys(batchInfo).length > 0)
      return (batchInfo?.progress / batchInfo?.cultivationStages.length) * 100;
    return 0;
  };

  return (
    <Container>
      <Title fontColor={strongBrown}>Progreso del cultivo</Title>
      <ProgressInfo>
        <IndicatorText fontColor={strongBrown}>
          {batchInfo?.progress} de {batchInfo?.cultivationStages.length} fases
          completadas
        </IndicatorText>
        <ProgressBarContainer background={primaryColor}>
          <ProgressBarContent
            background={yellow}
            progress={getProgressValue()}
          ></ProgressBarContent>
        </ProgressBarContainer>
        <Percentage fontColor={strongBrown}>
          {Math.round(getProgressValue())}%
        </Percentage>
      </ProgressInfo>
    </Container>
  );
};

export default CropProgress;
