const renderLowerMenuItems = (
  navigation,
  isBatchModalOpen,
  setIsBatchModalOpen,
  toggleModal,
  setTypeModal
) => {
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
        setTypeModal("edit");
      },
      label: "Editar lote",
    },
    {
      iconName: "battery-std",
      action: () => {
        toggleModal();
        setTypeModal("progress");
      },
      label: "Progreso",
    },
    {
      iconName: "format-list-bulleted",
      action: () => {
        setIsBatchModalOpen(!isBatchModalOpen);
      },
      label: "Lotes",
    },
    {
      iconName: "picture-as-pdf",
      action: () => {
        toggleModal();
        setTypeModal("report");
      },
      label: "Reporte",
    },
  ];
};
export { renderLowerMenuItems };
