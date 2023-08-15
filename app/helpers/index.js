import { Alert, BackHandler } from "react-native";
import Currency from "currency.js";

const activeLoadingBar = (setLoad, navigation) => {
  let load = 0;
  const interval = setInterval(() => {
    load = ((load + 25) / 100) * 100;
    setLoad(load);
    if (load === 100) {
      clearInterval(interval);
      navigation.navigate("Login");
    }
  }, 1000);
};

const backActionExitApp = () => {
  Alert.alert("Mensaje!", "¿Seguro que quieres salir del aplicación?", [
    {
      text: "Cancelar",
      onPress: () => null,
      style: "cancel",
    },
    { text: "Salir", onPress: () => BackHandler.exitApp() },
  ]);
  return true;
};

const generateRandomId = () => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const toggleAlert = (functions, messageConfig) => {
  const { setIsLoading, showAlert, setAlert, hideAlert } = functions;
  const { message, type } = messageConfig;
  setIsLoading(false);
  setAlert(type, message);
  showAlert();
  hideAlert();
};

const setDinamicIcon = (stageId) => {
  if (stageId === "expense-1")
    return require("../../assets/expensesIcons/seeds-expense.png");
  if (stageId === "expense-2" || stageId === "expense-5")
    return require("../../assets/expensesIcons/work-force-expense.png");
  if (stageId === "expense-3")
    return require("../../assets/expensesIcons/tools-expense.png");
  if (stageId === "expense-4")
    return require("../../assets/expensesIcons/fertilizer-expense.png");
  if (stageId === "expense-6")
    return require("../../assets/expensesIcons/recolection-expense.png");
  if (stageId === "expense-7")
    return require("../../assets/expensesIcons/secado-expense.png");
  if (stageId === "expense-8")
    return require("../../assets/expensesIcons/selling-stage.png");
};

const calculateTotalPrice = (amount, unitPrice, transportPrice = 0) => {
  return (
    parseFloat(amount) * parseFloat(unitPrice) + parseFloat(transportPrice)
  );
};

const validateExpensesForm = (errors, inputs, values) => {
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    if (!values[input?.fieldName]) {
      errors[input?.fieldName] = "Campo obligatorio!";
    }
  }
  return errors;
};

const setCropExpensesFormInitialValues = (
  expenseId,
  actionForm,
  expenseInfo,
  farmInfo
) => {
  if (expenseId === "expense-1") {
    return {
      seedsName: actionForm === "edit" ? expenseInfo?.seedsName : "",
      amount: actionForm === "edit" ? expenseInfo?.amount : "",
      unitPrice: actionForm === "edit" ? expenseInfo?.unitPrice : "",
      transportPrice: actionForm === "edit" ? expenseInfo?.transportPrice : "",
      unitOfMeasurement:
        actionForm === "edit" ? expenseInfo?.unitOfMeasurement : "",
    };
  } else if (expenseId === "expense-2") {
    return {
      workersQuantity:
        actionForm === "edit" ? expenseInfo?.workersQuantity : "",
      dailyPrice: actionForm === "edit" ? expenseInfo?.dailyPrice : "",
      unitOfMeasurement:
        actionForm === "edit" ? expenseInfo?.unitOfMeasurement : "",
    };
  } else if (expenseId === "expense-3") {
    return {
      toolName: actionForm === "edit" ? expenseInfo?.toolName : "",
      toolAmount: actionForm === "edit" ? expenseInfo?.toolAmount : "",
      toolUnitPrice: actionForm === "edit" ? expenseInfo?.toolUnitPrice : "",
      unitOfMeasurement:
        actionForm === "edit" ? expenseInfo?.unitOfMeasurement : "",
    };
  } else if (expenseId === "expense-4") {
    return {
      fertilizerName: actionForm === "edit" ? expenseInfo?.fertilizerName : "",
      fertilizerAmount:
        actionForm === "edit" ? expenseInfo?.fertilizerAmount : "",
      fertilizerUnitPrice:
        actionForm === "edit" ? expenseInfo?.fertilizerUnitPrice : "",
      fertilizerTransportPrice:
        actionForm === "edit" ? expenseInfo?.fertilizerTransportPrice : "",
      unitOfMeasurement:
        actionForm === "edit" ? expenseInfo?.unitOfMeasurement : "",
    };
  } else if (expenseId === "expense-5") {
    return {
      name: actionForm === "edit" ? expenseInfo?.name : "",
      workingdays: actionForm === "edit" ? expenseInfo?.workingdays : "",
      dailypayment:
        actionForm === "edit"
          ? expenseInfo?.dailypayment
          : farmInfo?.settings?.dailyWorkPrice,
      observation: actionForm === "edit" ? expenseInfo?.observation : "",
      paymentStatus: actionForm === "edit" ? expenseInfo?.paymentStatus : "",
    };
  } else if (expenseId === "expense-6") {
    return {
      name: actionForm === "edit" ? expenseInfo?.name : "",
      kilogramsCollected:
        actionForm === "edit" ? expenseInfo?.kilogramsCollected : "",
      dailypayment:
        actionForm === "edit"
          ? expenseInfo?.dailypayment
          : farmInfo?.settings?.coffeeKilogramPrice,
      observation: actionForm === "edit" ? expenseInfo?.observation : "",
      paymentStatus: actionForm === "edit" ? expenseInfo?.paymentStatus : "",
    };
  } else if (expenseId === "expense-7") {
    return {
      amountCoffee: actionForm === "edit" ? expenseInfo?.amountCoffee : "",
      amountCoffeePrice:
        actionForm === "edit" ? expenseInfo?.amountCoffeePrice : "",
      observation: actionForm === "edit" ? expenseInfo?.observation : "",
    };
  } else {
    return {
      costumer: actionForm === "edit" ? expenseInfo?.costumer : "",
      sellingCoffeeAmount:
        actionForm === "edit" ? expenseInfo?.sellingCoffeeAmount : "",
      sellingCoffeeAmountPrice:
        actionForm === "edit" ? expenseInfo?.sellingCoffeeAmountPrice : "",
      sellingTransportPrice:
        actionForm === "edit" ? expenseInfo?.sellingTransportPrice : "",
      discount: actionForm === "edit" ? expenseInfo?.discount : "",
      sellingObservation:
        actionForm === "edit" ? expenseInfo?.sellingObservation : "",
    };
  }
};

const compareNumberFields = (values) => {
  const existValues =
    (values.amount && values.unitPrice && values.transportPrice) ||
    (values.workersQuantity && values.dailyPrice) ||
    (values.toolAmount && values.toolUnitPrice) ||
    (values.fertilizerAmount &&
      values.fertilizerUnitPrice &&
      values.fertilizerTransportPrice) ||
    (values.workingdays && values.dailypayment) ||
    (values.kilogramsCollected && values.dailypayment) ||
    (values.amountCoffee && values.amountCoffeePrice) ||
    (values.sellingCoffeeAmount &&
      values.sellingCoffeeAmountPrice &&
      values.sellingTransportPrice &&
      values.discount);
  return existValues;
};

const calculateTotalPricePerCategory = (expenseId, values) => {
  let total = 0;
  if (expenseId === "expense-1") {
    total = calculateTotalPrice(
      values.amount,
      values.unitPrice,
      values.transportPrice
    );
    return total;
  } else if (expenseId === "expense-2") {
    total = calculateTotalPrice(values.workersQuantity, values.dailyPrice);
    return total;
  } else if (expenseId === "expense-3") {
    total = calculateTotalPrice(values.toolAmount, values.toolUnitPrice);
    return total;
  } else if (expenseId === "expense-4") {
    total = calculateTotalPrice(
      values.fertilizerAmount,
      values.fertilizerUnitPrice,
      values.fertilizerTransportPrice
    );
    return total;
  } else if (expenseId === "expense-5") {
    total = calculateTotalPrice(values.workingdays, values.dailypayment);
    return total;
  } else if (expenseId === "expense-6") {
    total = calculateTotalPrice(values.kilogramsCollected, values.dailypayment);
    return total;
  } else if (expenseId === "expense-7") {
    total = calculateTotalPrice(values.amountCoffee, values.amountCoffeePrice);
    return total;
  } else {
    total = calculateTotalPrice(
      values.sellingCoffeeAmount,
      values.sellingCoffeeAmountPrice,
      values.sellingTransportPrice
    );
    return total - parseFloat(values.discount);
  }
};

const formatMoney = (totalPrice) => {
  parseFloat(totalPrice);
  const formattedPrice = new Currency(totalPrice);
  return formattedPrice.format();
};

const getCurrentDate = () => {
  const timeElapsed = Date.now();
  const date = new Date(timeElapsed);
  const formattedDate = date.toLocaleDateString("es-MX");

  return formattedDate;
};

const compareCropStages = (a, b) => {
  if (a?.id < b?.id) return -1;
  if (a?.id > b?.id) return 1;
  return 0;
};

const setUnitOfMeasurementName = (categoryId, unitOfMeasurement) => {
  if (categoryId === 1) {
    const name = unitOfMeasurement === 1 ? "Chapola" : "Unidad";
    return name;
  }

  if (categoryId === 2) {
    const name = unitOfMeasurement === 1 && "Jornal";
    return name;
  }

  if (categoryId === 3) {
    const name = unitOfMeasurement === 1 && "Unidad";
    return name;
  }

  if (categoryId === 4) {
    const name =
      unitOfMeasurement === 1
        ? "Kilogramo"
        : unitOfMeasurement === 2
        ? "Libra"
        : unitOfMeasurement === 3
        ? "Bulto"
        : "Gramo";
    return name;
  }
};

export {
  activeLoadingBar,
  backActionExitApp,
  generateRandomId,
  toggleAlert,
  setDinamicIcon,
  calculateTotalPrice,
  validateExpensesForm,
  setCropExpensesFormInitialValues,
  calculateTotalPricePerCategory,
  formatMoney,
  compareNumberFields,
  getCurrentDate,
  compareCropStages,
  setUnitOfMeasurementName,
};
