import React from 'react';
import { Link } from "react-router-dom";
import sirenBlue from '../../assets/images/siren-blue.png'; // Ruta a tu imagen azul
import sirenRed from '../../assets/images/siren-red.png';  // Ruta a tu imagen roja
import './homeparamedico.css';

const VistaParamedico = () => {
  return (
    <div className="container1">
      <div className="welcome-card">
        <h1 className="welcome-title">¡Bienvenido, Paramédico!</h1>
        <p className="welcome-message">
          Estás listo para comenzar tu jornada. Si necesitas más información, revisa el formulario.
        </p>
        <Link to="/formulario" className="mapa-button"> {/* Link con estilo de botón */}
          Ir al Formulario
        </Link>
      </div>
      <div className="emergency-section">
        <p className="emergency-message">Esto es una emergencia</p>
        <div className="siren-container">
          {/* Sirena animada con imágenes */}
          <div
            className="siren-image"
            style={{
                backgroundImage: `url(${sirenBlue}), url(${sirenRed})`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default VistaParamedico;