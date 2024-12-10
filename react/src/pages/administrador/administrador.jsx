import React, { useState } from "react";
import SectionContent from "./SectionContent"; // Importar el componente SectionContent
import "./administrador.css";

const sections = [
  { title: "Gestión de Personal", id: "personal" },
  { title: "Gestión de Ambulancias", id: "ambulancias" },
  { title: "Gestión de Accidente", id: "FormularioAccidente" },
  { title: "Gestión de Hospitales", id: "Hospital" },  // Cambié "Gestion hospitales" a "Gestión de Hospitales"
  { title: "Reporte de Viaje", id: "ReporteViaje" },  // Corregí el id a "ReporteViaje"
  { title: "Asignacion ambulancia", id: "Asignacionambulancia" },  // Corregí el id a "ReporteViaje"
];

const Home = () => {
  const [selectedSection, setSelectedSection] = useState(null);

  return (
    <div className="home-container">
      <h1>Bienvenido ADMIN</h1>
      <div>
        {sections.map((section) => (
          <button key={section.id} onClick={() => setSelectedSection(section.id)}>
            {section.title}
          </button>
        ))}
      </div>

      {/* Renderizar el contenido según la sección seleccionada */}
      <SectionContent sectionId={selectedSection} />
    </div>
  );
};

export default Home;
