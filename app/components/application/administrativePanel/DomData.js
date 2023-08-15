const renderIndicatorPanel = ({
  strongBrown,
  yellow,
  lightBrown,
  mediumGray,
  white,
  strongRed,
  investments,
  sales,
}) => {
  return [
    {
      iconName: "trending-up",
      background: yellow,
      color: strongBrown,
      iconColor: strongBrown,
      label: "Total Ganancias",
      value: sales - investments,
    },
    {
      iconName: "attach-money",
      background: lightBrown,
      color: strongBrown,
      iconColor: strongBrown,
      label: "Total Ventas",
      value: sales,
    },
    {
      iconName: "shopping-cart",
      background: mediumGray,
      color: white,
      iconColor: mediumGray,
      label: "Total Inversiones",
      value: investments,
    },
    {
      iconName: "trending-down",
      background: strongRed,
      color: white,
      iconColor: strongRed,
      label: "Total Perdidas",
      value: sales - investments > 0 ? 0 : investments - sales,
    },
  ];
};

export { renderIndicatorPanel };
