const renderFarmPanelItems = (
  isConnected,
  farm,
  farmOffline,
  { lightBrown, strongBrown, white, mediumGray, yellow }
) => {
  return [
    {
      icon: "eco",
      label: "Número de lotes",
      value: isConnected ? farm?.batchQuantity : farmOffline?.batchQuantity,
      background: lightBrown,
      color: strongBrown,
    },
    {
      icon: "place",
      label: "Departamento",
      value: isConnected ? farm?.state : farmOffline?.state,
      background: strongBrown,
      color: white,
    },
    {
      icon: "place",
      label: "Municipio",
      value: isConnected ? farm?.town : farmOffline?.town,
      background: mediumGray,
      color: white,
    },
    {
      icon: "account-circle",
      label: "Propietario",
      value: isConnected ? farm?.owner : farmOffline?.owner,
      background: yellow,
      color: strongBrown,
    },
  ];
};

export { renderFarmPanelItems };
