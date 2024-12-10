import React from "react";
import "./footer.css"; // Asegúrate de tener estilos adecuados en un archivo CSS si es necesario.

const Footer = () => {
  return (
    <footer className="pie-pagina">
      <div className="grupo-1">
        <div className="box">
          <span>
            <a href="/">
              <img src="./assets/images/logo.png" alt="" width="100px" />
            </a>
          </span>
        </div>
        <div className="box">
          <h2>-SOBRE NOSOTROS</h2>
          <p>
            Ambusos: tu aliado en emergencias. Brindamos atención médica rápida y
            confiable cuando más lo necesitas.
          </p>
        </div>
      </div>
      <div className="grupo-2">
        <small>
          &copy; 2024 <b>AMBUSOS</b> - Todos los Derechos Reservados.
        </small>
      </div>
    </footer>
  );
};

export default Footer;