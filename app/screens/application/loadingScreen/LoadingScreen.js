import Footer from "../../../components/shared/footer/Footer";
import LoadingBar from "../../../components/shared/loadingBar/LoadingBar";

import { Container, Logo } from "./LoadingScreen.style";

const LoadingScreen = () => {
  return (
    <Container
      source={require("../../../../assets/images/background-loading.png")}
    >
      <Logo source={require("../../../../assets/images/logo.png")} />
      <LoadingBar />
      <Footer />
    </Container>
  );
};

export default LoadingScreen;
