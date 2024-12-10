import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [formData, setFormData] = useState({ nombre: "", contrasena: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Inicio de sesión exitoso");
        localStorage.setItem("token", data.token); // Guardar el token en localStorage

        // Redirigir según el rol
        switch (data.rol) {
          case "Super Administrador": // Manejo del rol SUPERADMIN
            navigate("/superadmin");
            break;
          case "Administrador":
            navigate("/administrador");
            break;
          case "Conductor":
            navigate("/homeconductor");
            break;
          case "Enfermero":
            navigate("/enfermero");
            break;
          case "Paramédico":
            navigate("/homeparamedico");
            break;
          default:
            navigate("/"); // Redirigir a la página principal si el rol no coincide
            break;
        }
      } else {
        alert(data.mensaje || "Error en el inicio de sesión");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      alert("Hubo un problema al conectar con el servidor.");
    }
  };

  return (
    <div className="login-container">
      <div className="heading">Iniciar Sesión</div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          required
          className="input"
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
        <input
          required
          className="input"
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          value={formData.contrasena}
          onChange={handleChange}
        />
        <button className="login-button" type="submit">
          Iniciar sesión
        </button>
      </form>

    
    </div>
  );
};

export default Login;
