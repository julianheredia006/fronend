import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import logo from "../../assets/images/logo_2.png";  // Ajusta la ruta según la ubicación de tu imagen
import { FaHome, FaSignInAlt } from "react-icons/fa"; // Importamos los íconos de Font Awesome

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>
      <ul>
        <li>
          <Link to="/">
            <FaHome size={20} style={{ marginRight: "8px" }} /> {/* Ícono de Inicio */}
            Inicio
          </Link>
        </li>
        <li>
          <Link to="/login">
            <FaSignInAlt size={20} style={{ marginRight: "8px" }} /> {/* Ícono de Iniciar sesión */}
            Iniciar sesión
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
