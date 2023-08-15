const renderLowerMenuItems = (
  navigation,
  isConnected,
  userRole,
  toggleModal,
  setTypeModal,
  seeBatches
) => {
  return [
    {
      iconName: "home",
      action: () => navigation.navigate("Inicio"),
      label: "Inicio",
    },
    userRole === "Administrador" && {
      iconName: "create",
      action: () => {
        toggleModal();
        setTypeModal("edit-farm");
      },
      label: "Editar finca",
    },

    userRole === "Administrador" &&
      isConnected && {
        iconName: "group-add",
        action: () => {
          toggleModal();
          setTypeModal("collaborator");
        },
        label: "Colaborador",
      },
    {
      iconName: "dashboard-customize",
      action: () => {
        toggleModal();
        setTypeModal("batch");
      },
      label: "Crear lote",
    },
    {
      iconName: "format-list-bulleted",
      action: () => {
        seeBatches();
      },
      label: "Lotes",
    },
  ];
};
export { renderLowerMenuItems };
