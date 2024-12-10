import React from "react";
import "./iniciarsesion.css"; // Asegúrate de importar tu archivo CSS

const Header = () => (
  <header className="header">
    <div className="topheader">
      <div className="wrapper">
        <nav>
          <a href="./tipo_de_persona.html">
            <i className="fa-regular fa-user"></i>
          </a>
          <a href="./">
            <i className="fa-regular fa-user"></i>
          </a>
        </nav>
      </div>
    </div>

    <div className="wrapper">
      <div className="logo">
        <a href="./index.html">
          <img src="./img/logo_2.png" alt="Logo" width="300px" />
        </a>
      </div>
      <nav>
        <a href="./index.html">Inicio</a>
        <a href="./mapa_de_usuario.html">Mapa</a>
        <a href="./apartados_ambu.html">Otros</a>
      </nav>
    </div>
  </header>
);

const AdminSection = () => (
  <div className="rectangulo-blanco py-5">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-6 text-center text-md-start">
          <h1>¿Eres uno de nuestros trabajadores o administrador?</h1>
          <p>Inicia sesión para ingresar a tu apartado</p>
        </div>
        <div className="col-md-12 text-center text-md-end">
          <p>❗Solo Admin y trabajadores del sistema ❗</p>
          <a href="../login/sesiones.html" className="button">
            <span className="text">Inicia Sesión</span>
            <span>¡Ambusos!</span>
          </a>
        </div>
        <div className="col-md-12 mt-4">
          <img className="img-fluid" src="./img/admin.png" alt="Admin" width="300px" />
          <img className="img-fluid" src="./img/cond.png" alt="Conductor" width="300px" />
        </div>
      </div>
    </div>
  </div>
);

const Footer = () => (
  <footer className="pie-pagina">
    <div className="grupo-1">
      <div className="box">
        <span>
          <a href="./index.html">
            <img src="./img/logo.png" alt="Logo de Liber-Arte" width="100px" />
          </a>
        </span>
      </div>
      <div className="box">
        <h2>-SOBRE NOSOTROS</h2>
        <p>
          Ambusos: tu aliado en emergencias. Brindamos atención médica rápida y confiable cuando más lo necesitas.
        </p>
      </div>
    </div>
    <div className="grupo-2">
      <small>&copy; 2024 <b>AMBUSOS</b> - Todos los Derechos Reservados.</small>
    </div>
  </footer>
);

const IniciarSesion = () => (
  <div>
    <Header />
    <AdminSection />
    <Footer />
  </div>
);

export default IniciarSesion;
