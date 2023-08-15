const renderSeedsFormInputs = () => {
  const inputs = [
    {
      placeholder: "Tipo de semillas",
      fieldName: "seedsName",
      iconName: "eco",
      keyboardType: "default",
    },
    {
      placeholder: "Cantidad",
      fieldName: "amount",
      iconName: "workspaces-outline",
      keyboardType: "numeric",
    },
    {
      placeholder: "Precio unitario",
      fieldName: "unitPrice",
      iconName: "attach-money",
      keyboardType: "numeric",
    },
    {
      placeholder: "Precio transporte",
      fieldName: "transportPrice",
      iconName: "attach-money",
      keyboardType: "numeric",
    },
  ];
  return inputs;
};

const renderFormDropDowns = (data, categoryId) => {
  return [
    {
      placeholder:
        categoryId === 5 || categoryId === 6
          ? "Estado del pago"
          : "Unidad de medida",
      fieldName:
        categoryId === 5 || categoryId === 6
          ? "paymentStatus"
          : "unitOfMeasurement",
      iconName:
        categoryId === 5 || categoryId === 6 ? "payments" : "straighten",
      data,
      labelField: "unitName",
      valueField: "id",
    },
  ];
};

const renderWorkForceFormInputs = () => {
  const inputs = [
    {
      placeholder: "Número de trabajadores",
      fieldName: "workersQuantity",
      iconName: "groups",
      keyboardType: "numeric",
    },
    {
      placeholder: "Precio por trabajador",
      fieldName: "dailyPrice",
      iconName: "attach-money",
      keyboardType: "numeric",
    },
  ];
  return inputs;
};

const renderToolsFormInputs = () => {
  const inputs = [
    {
      placeholder: "Nombre de herramienta",
      fieldName: "toolName",
      iconName: "build",
      keyboardType: "default",
    },
    {
      placeholder: "Cantidad",
      fieldName: "toolAmount",
      iconName: "workspaces-outline",
      keyboardType: "numeric",
    },
    {
      placeholder: "Precio unitario",
      fieldName: "toolUnitPrice",
      iconName: "attach-money",
      keyboardType: "numeric",
    },
  ];
  return inputs;
};

const renderFertilizerFormInputs = () => {
  const inputs = [
    {
      placeholder: "Nombre del abono",
      fieldName: "fertilizerName",
      iconName: "eco",
      keyboardType: "default",
    },
    {
      placeholder: "Cantidad",
      fieldName: "fertilizerAmount",
      iconName: "workspaces-outline",
      keyboardType: "numeric",
    },
    {
      placeholder: "Precio unitario",
      fieldName: "fertilizerUnitPrice",
      iconName: "attach-money",
      keyboardType: "numeric",
    },
    {
      placeholder: "Precio transporte",
      fieldName: "fertilizerTransportPrice",
      iconName: "attach-money",
      keyboardType: "numeric",
    },
  ];
  return inputs;
};

const renderJornalFormInputs = (typeOfJob = "workedDay") => {
  const inputs = [
    {
      placeholder: "Nombre o apodo",
      fieldName: "name",
      iconName: "people",
      keyboardType: "default",
    },

    typeOfJob === "workedDay"
      ? {
          placeholder: "Dias laborados",
          fieldName: "workingdays",
          iconName: "date-range",
          keyboardType: "default",
        }
      : {
          placeholder: "Kilos recolectados",
          fieldName: "kilogramsCollected",
          iconName: "eco",
          keyboardType: "numeric",
        },

    {
      placeholder: typeOfJob === "workedDay" ? "Precio dia" : "Precio por kilo",
      fieldName: "dailypayment",
      iconName: "attach-money",
      keyboardType: "numeric",
      disabled: true,
    },
    {
      placeholder: "Observación",
      fieldName: "observation",
      iconName: "question-answer",
      keyboardType: "default",
    },
  ];
  return inputs;
};

const renderCoffeeDryingFormInputs = () => {
  const inputs = [
    {
      placeholder: "Cantidad de arrobas de café",
      fieldName: "amountCoffee",
      iconName: "linear-scale",
      keyboardType: "numeric",
    },
    {
      placeholder: "Precio por arroba",
      fieldName: "amountCoffeePrice",
      iconName: "attach-money",
      keyboardType: "numeric",
    },
    {
      placeholder: "Observación",
      fieldName: "observation",
      iconName: "question-answer",
      keyboardType: "default",
    },
  ];
  return inputs;
};

const renderSellingInputs = () => {
  const inputs = [
    {
      placeholder: "Cliente",
      fieldName: "costumer",
      iconName: "person-outline",
      keyboardType: "default",
    },
    {
      placeholder: "Número de arrobas",
      fieldName: "sellingCoffeeAmount",
      iconName: "speed",
      keyboardType: "numeric",
    },
    {
      placeholder: "Precio por arrobas",
      fieldName: "sellingCoffeeAmountPrice",
      iconName: "attach-money",
      keyboardType: "numeric",
    },
    {
      placeholder: "Precio de transporte",
      fieldName: "sellingTransportPrice",
      iconName: "attach-money",
      keyboardType: "numeric",
    },
    {
      placeholder: "Descuento",
      fieldName: "discount",
      iconName: "attach-money",
      keyboardType: "numeric",
    },
    {
      placeholder: "Observación",
      fieldName: "sellingObservation",
      iconName: "error-outline",
      keyboardType: "default",
    },
  ];
  return inputs;
};

export {
  renderSeedsFormInputs,
  renderFormDropDowns,
  renderWorkForceFormInputs,
  renderToolsFormInputs,
  renderFertilizerFormInputs,
  renderJornalFormInputs,
  renderCoffeeDryingFormInputs,
  renderSellingInputs,
};
