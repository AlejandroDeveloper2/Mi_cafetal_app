import { useState } from "react";

const useHeaderTable = () => {
  const seedingPhase = () => {
    return `<th>#</th>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Trasporte</th>
              <th>Total</th>`;
  };
  const maintenancePhase = () => {
    return `<th>Fecha</th>
            <th>Unidad de medida</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Trasporte</th>
            <th>Total</th>`;
  };
  const harvestingPhase = () => {
    return `
              <th>Fecha</th>
              <th>Unidad</th>
              <th>Nombre</th>
              <th>Dias laborados</th>
              <th>Precio</th>
              <th>Observacion</th>
              <th>Estado</th>
              <th>Total</th>`;
  };
  const dryingPhase = () => {
    return `<th>#</th>
              <th>Fecha</th>
              <th>Tipo Secado</th>
              <th>Cantidad</th>
              <th>Observacion</th>
              <th>Precio</th>
              <th>Total</th>`;
  };
  const salesPhase = () => {
    return `<th>Fecha</th>
              <th>Cliente</th>
              <th>N°arrobas</th>
              <th>Precio</th>
              <th>Trasporte</th>
              <th>Descuentos</th>
              <th>Observacion</th>
              <th>Total</th>`;
  };

  return {
    seedingPhase,
    maintenancePhase,
    harvestingPhase,
    dryingPhase,
    salesPhase,
  };
};

export default useHeaderTable;
