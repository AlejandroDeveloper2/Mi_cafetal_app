import React, { useState, createContext, useMemo } from "react";
import {
  getDocs,
  collection,
  where,
  query,
  startAt,
  endAt,
  orderBy,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import * as Print from "expo-print";
import { toggleAlert, formatMoney } from "../helpers";
import useHeaderTable from "../hooks/useHeaderTable";
const ReportsContext = createContext();
const ReportsProvider = ({ children }) => {
  const [selectedPrinter, setSelectedPrinter] = useState("");
  const {
    seedingPhase,
    maintenancePhase,
    harvestingPhase,
    dryingPhase,
    salesPhase,
  } = useHeaderTable();
  const generateReportPdf = async (values, config) => {
    const { setIsLoading, setLoadingText } = config;
    const collectionReference = collection(db, "expenses");
    const q = query(
      collectionReference,
      orderBy("creationDate"),
      startAt(values.Startdate),
      endAt(values.EndDate),
      where("cropStage", "==", values.cultivationStage),
      where("batchId", "==", values.id)
    );
    let element = [];
    setLoadingText("Cargando información...");
    setIsLoading(true);
    await getDocs(q)
      .then((querySnapshot) => {
        if (querySnapshot.docs.length === 0) {
          return toggleAlert(config, {
            message: "No se encontraron resultados!",
            type: "error",
          });
        }
        setIsLoading(false);
        querySnapshot.docs.forEach((doc) => {
          element.push(doc.data());
        });
        printCategory(element, config, values.cultivationStage);
      })
      .catch((err) => {
        console.log(err);
        toggleAlert(config, {
          message: "Ha ocurrido un error buscador la informacion!",
          type: "error",
        });
      });
  };
  const print = async (title, headers, content, sum, config) => {
    const selectPrinter = async () => {
      try {
        const printer = await Print.selectPrinterAsync();
        setSelectedPrinter(printer);
        toggleAlert(config, {
          message: "Reporte almacenado!",
          type: "succes",
        });
      } catch (error) {
        toggleAlert(config, {
          message: "Ha ocurrido un error generando el reporte!",
          type: "error",
        });
      }
    };
    let html = `<body style="margin: 0; padding: 0">
         <div>
          <img src="https://firebasestorage.googleapis.com/v0/b/mi-cafetal-app-de74f.appspot.com/o/Header.png?alt=media&token=63c8f438-cb1b-434a-bb3a-5ca0951afe36" style="width: 100%; height: 220px" />
          <h2
            style="
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              font-style: normal;
              font-weight: bold;
              line-height: 30px;
              text-align: center;
              color: #835a3e;
              text-transform: capitalize;
            "
          >
            ${
              title === "Fase De Venta De Cafe"
                ? "Reporte de ventas"
                : "Reporte de gastos"
            }
          </h2>
          <div>
            <h3
              style="
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                font-style: normal;
                font-weight: 500;
                line-height: 30px;
                text-align: center;
                color: #817c7c;
                text-transform: capitalize;
              "
            >
            ${title}
            </h3>
          </div>
          <div style="padding: 20px">
            <table
              style="
                background-color: #e8c696;
                width: 100%;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                font-style: normal;
                font-weight: 800;
                line-height: 30px;
                text-align: center;
                color: #8f6545;
              "
            >
              <tr>
               ${headers}
              </tr>
              <tbody style="background: white">
              ${content}
              <tr style="background-color: #e8c696">
                <th colspan="8"  style="
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                font-style: normal;
                font-weight: 800;
                line-height: 30px;
                text-align: center;
                color: #8f6545;
              ">Total:$ ${formatMoney(sum)}</th>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </body>
    `;
    await Print.printAsync({
      html: html,
      printerUrl: selectedPrinter?.url,
    });
  };
  const printCategory = (element, config, type) => {
    if (type === "Adaptación del terreno y siembra") {
      categoryOne(element, config);
    }
    if (type === "Mantenimiento de cultivo") {
      categoryTwo(element, config);
    }
    if (type === "Recolección del grano") {
      categoryThree(element, config);
    }
    if (type === "Secado") {
      categoryFour(element, config);
    }
    if (type === "Venta") {
      categoryFive(element, config);
    }
  };

  const categoryOne = async (data, config) => {
    let title = "Fase adaptación del terreno y siembra";
    let header = seedingPhase();
    let content = "";
    let sum = 0;
    data.forEach((ele, index) => {
      sum = sum + parseFloat(ele.totalPrice);
      content =
        content +
        `<tr>
        <th>${index + 1}</th>
        <th>${ele.creationDate}</th>
        <th>${
          ele.unitOfMeasurement === 1
            ? "Chapola"
            : ele.unitOfMeasurement === 2
            ? "Jornal"
            : "Unidad"
        }</th>
        <th>${
          ele.categoryId === 1
            ? ele.seedsName
            : ele.categoryId === 2
            ? "N/A"
            : ele.fertilizerName
        }</th>
        <th>${
          ele.categoryId === 1
            ? ele.amount
            : ele.categoryId === 2
            ? ele.workersQuantity
            : ele.fertilizerAmount
        }</th>
        <th>${
          ele.categoryId === 1
            ? formatMoney(ele.unitPrice)
            : ele.categoryId === 2
            ? formatMoney(ele.dailyPrice)
            : formatMoney(ele.fertilizerUnitPrice)
        }</th>
        <th>${
          ele.categoryId === 1
            ? formatMoney(ele.transportPrice)
            : ele.categoryId === 2
            ? "N/A"
            : formatMoney(ele.fertilizerTransportPrice)
        }</th>
        <th>${formatMoney(ele.totalPrice)}</th>
    <tr>`;
    });

    await print(title, header, content, sum, config);
  };
  const categoryTwo = async (data, config) => {
    let title = "Fase mantenimiento del cultivo";
    let header = maintenancePhase();
    let content = "";
    let sum = 0;
    data.forEach((ele) => {
      sum = sum + parseFloat(ele.totalPrice);
      content =
        content +
        `<tr>
        <th>${ele.creationDate}</th>
        <th>${
          ele.categoryId === 2
            ? "Jornal"
            : ele.categoryId === 3
            ? "Unidadad"
            : ele.unitOfMeasurement === 1
            ? "Kilogramos"
            : ele.unitOfMeasurement === 2
            ? "Libras"
            : ele.unitOfMeasurement === 3
            ? "Bultos"
            : "Gramos"
        }</th>
        <th>${
          ele.categoryId === 3
            ? ele.toolName
            : ele.categoryId === 4
            ? ele.fertilizerName
            : "N/A"
        }</th>
        <th>${
          ele.categoryId === 2
            ? ele.workersQuantity
            : ele.categoryId === 3
            ? ele.toolAmount
            : ele.fertilizerAmount
        }</th>
        <th>${
          ele.categoryId === 2
            ? formatMoney(ele.dailyPrice)
            : ele.categoryId === 3
            ? formatMoney(ele.toolUnitPrice)
            : formatMoney(ele.fertilizerUnitPrice)
        }</th>
        <th>${
          ele.categoryId === 4
            ? formatMoney(ele.fertilizerTransportPrice)
            : "N/A"
        }</th>
        <th>${formatMoney(ele.totalPrice)}</th>
    <tr>`;
    });

    await print(title, header, content, sum, config);
  };
  const categoryThree = async (data, config) => {
    let title = "Fase recolección de cafe";
    let header = harvestingPhase();
    let content = "";
    let sum = 0;
    data.forEach((ele, index) => {
      sum = sum + parseFloat(ele.totalPrice);
      content =
        content +
        `<tr>
        <th>${ele.creationDate}</th>
        <th>${ele.unitOfMeasurement === 1 ? "Unidad" : "Jornal"}</th>
        <th>${ele.categoryId === 3 ? ele.toolName : ele.name}</th>
        <th>${ele.categoryId === 5 ? ele.workingdays : "N/A"}</th>
        <th>${
          ele.categoryId === 5
            ? formatMoney(ele.dailypayment)
            : ele.categoryId === 6
            ? formatMoney(ele.kilogramsCollected)
            : formatMoney(ele.toolUnitPrice)
        }</th>
        <th>${
          ele.categoryId === 5
            ? ele.observation
            : ele.categoryId === 6
            ? ele.observation
            : ele.toolAmount + " Unidades "
        }</th>
        <th>${
          ele.paymentStatus === 1
            ? "Pendiente"
            : ele.categoryId === 3
            ? "N/A"
            : "Pagado"
        }</th>
        <th>${formatMoney(ele.totalPrice)}</th>
    <tr>`;
    });

    await print(title, header, content, sum, config);
  };
  const categoryFour = async (data, config) => {
    let title = "Fase de secado";
    let header = dryingPhase();
    let content = "";
    let sum = 0;
    data.forEach((ele, index) => {
      sum = sum + parseFloat(ele.totalPrice);
      content =
        content +
        `<tr>
          <th>${index + 1}</th>
          <th>${ele.creationDate}</th>
          <th>${ele.categoryId === 2 ? "Jornal" : "Maquina"}</th>
          <th>${
            ele.categoryId === 2 ? ele.workersQuantity : ele.amountCoffee
          }</th>
          <th>${
            ele.categoryId === 2
              ? formatMoney(ele.dailyPrice)
              : formatMoney(ele.amountCoffeePrice)
          }</th>
          <th>${ele.categoryId === 7 ? ele.observation : "N/A"}</th>
          <th>${formatMoney(ele.totalPrice)}</th>
      <tr>`;
    });

    await print(title, header, content, sum, config);
  };
  const categoryFive = async (data, config) => {
    let title = "Fase de venta de cafe";
    let header = salesPhase();
    let content = "";
    let sum = 0;
    data.forEach((ele) => {
      sum = sum + parseFloat(ele.totalPrice);
      content =
        content +
        `<tr>
            <th>${ele.creationDate}</th>
            <th>${ele.costumer}</th>
            <th>${ele.sellingCoffeeAmount}</th>
            <th>${formatMoney(ele.sellingCoffeeAmountPrice)}</th>
            <th>${formatMoney(ele.sellingTransportPrice)}</th>
            <th>${formatMoney(ele.discount)}</th>
            <th>${ele.sellingObservation}</th>
            <th>${formatMoney(ele.totalPrice)}</th>
        <tr>`;
    });
    await print(title, header, content, sum, config);
  };

  return (
    <ReportsContext.Provider value={{ generateReportPdf }}>
      {children}
    </ReportsContext.Provider>
  );
};
export { ReportsProvider };
export default ReportsContext;
