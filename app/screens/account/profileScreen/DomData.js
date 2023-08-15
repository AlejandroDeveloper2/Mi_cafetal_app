const renderLowerMenuItems = (navigation, toggleModal, setFormName) => {
  return [
    {
      iconName: "home",
      action: () => navigation.navigate("Inicio"),
      label: "Inicio",
    },
    {
      iconName: "create",
      action: () => {
        toggleModal();
        setFormName("update_profile");
      },
      label: "Editar perfil",
    },
    {
      iconName: "https",
      action: () => {
        toggleModal();
        setFormName("update_password");
      },
      label: "Editar clave",
    },
  ];
};

const renderProfileItems = (
  userData,
  { lightBrown, strongBrown, white, mediumGray }
) => {
  return [
    {
      icon: "perm-identity",
      value: userData?.names + " " + userData?.last_names,
      background: lightBrown,
      color: strongBrown,
    },
    {
      icon: "alternate-email",
      value: userData?.email,
      background: strongBrown,
      color: white,
    },
    {
      icon: "call",
      value: userData?.phone,
      background: mediumGray,
      color: white,
    },
  ];
};

export { renderLowerMenuItems, renderProfileItems };
