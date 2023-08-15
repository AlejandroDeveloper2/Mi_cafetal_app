import { useState } from "react";
import { Icon, Overlay } from "@rneui/themed";

const useOverlay = () => {
  const [visible, setVisible] = useState(false);

  const overlayStyle = {
    width: "90%",
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
    position: "relative",
  };

  const closeModalIcon = {
    position: "absolute",
    top: 10,
    right: 10,
  };

  const backdropStyle = {
    backgroundColor: "rgba(0,0,0,0.5)",
  };

  const toggleModal = () => {
    setVisible(!visible);
  };

  const Modal = ({ children }) => {
    return (
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleModal}
        overlayStyle={overlayStyle}
        backdropStyle={backdropStyle}
        animationType="fade"
      >
        <Icon
          type="material"
          name="clear"
          color="#827C7C"
          brand={true}
          onPress={toggleModal}
          containerStyle={closeModalIcon}
          iconStyle={{ fontSize: 20 }}
        />
        {children}
      </Overlay>
    );
  };

  return {
    Modal,
    toggleModal,
  };
};

export default useOverlay;
