import React from "react";
import PersonalTable from "../../components/Tables/PersonalTable";
import AmbulanciasTable from "../../components/Tables/AmbulanciasTable";
import AccidentFormTable from "../../components/Tables/AccidentFormTable";
import HospitalesTable from "../../components/Tables/HospitalesTable"; 
import ReporteViaje from "../../components/Tables/ReporteViaje";  // Importar el nuevo componente
import Asignacionambulancia from "../../components/Tables/Asignacionambulancia";  // Importar el nuevo componente

const SectionContent = ({ sectionId }) => {
  switch (sectionId) {
    case "personal":
      return <PersonalTable />;
    case "ambulancias":
      return <AmbulanciasTable />;
    case "FormularioAccidente":
      return <AccidentFormTable />;
    case "Hospital":
        return <HospitalesTable />;
    case "Asignacionambulancia":
        return <Asignacionambulancia />;
    case "ReporteViaje":  // Nuevo caso para Reporte de Viaje
      return <ReporteViaje />;  // Mostrar ReporteViaje cuando la sección sea "reporteViaje"
    default:
      return null;
  }
};

export default SectionContent;
