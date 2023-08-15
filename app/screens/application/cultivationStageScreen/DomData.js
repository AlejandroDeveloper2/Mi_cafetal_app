const renderLowerMenuItems = (
  navigation,
  seeBatches,
  setTypeModal,
  toggleModal,
  cropStageId
) => {
  return [
    {
      iconName: "home",
      action: () => navigation.navigate("Inicio"),
      label: "Inicio",
    },
    {
      iconName: "local-atm",
      action: () => {
        seeBatches();
      },
      label: cropStageId === 5 ? "Ventas" : "Gastos",
    },
    {
      iconName: "create",
      action: () => {
        setTypeModal("cropStageForm");
        toggleModal();
      },
      label: "Editar fase",
    },
    cropStageId === 3 && {
      iconName: "settings",
      action: () => {
        setTypeModal("settingForm");
        toggleModal();
      },
      label: "Ajustes",
    },
    {
      iconName: "eco",
      action: () => {
        navigation.navigate("Batch");
      },
      label: "Mi lote",
    },
  ];
};
export { renderLowerMenuItems };
