import React from 'react';
import { Link } from "react-router-dom"; // Importa Link
import ambulans from "../../assets/images/ambulans.png"; // Asegúrate de que la ruta sea correcta
import './homeconductor.css';

const BienvenidoConductor = () => {
  return (
    <div className="container1">
      <div className="welcome-card">
        <h1 className="welcome-title">¡Bienvenido, Conductor!</h1>
        <p className="welcome-message">
          Estás listo para comenzar tu jornada. Revisa tu mapa y encuentra la mejor ruta.
        </p>
        <Link to="/conductor" className="map-button"> {/* Link con estilo de botón */}
          Mira tu mapa
        </Link>
      </div>
      <div className="ambulance-animation">
        <img className="ambulance" src={ambulans} alt="Ambulancia" width="300px" />
      </div>
    </div>
  );
};

export default BienvenidoConductor;

