import React, { useState } from "react";
import "./register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    personal_rol: "", // Cambiado a 'personal_rol'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.username,
          email: formData.email,
          contrasena: formData.password,
          personal_rol: formData.personal_rol, // Usando 'personal_rol' en lugar de 'rol_id'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Usuario creado exitosamente. Ahora puedes iniciar sesión.");
      } else {
        alert(data.mensaje || "Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      alert("Hubo un problema al conectar con el servidor.");
    }
  };

  return (
    <div className="register-container">
      <div className="heading">Registro superadmin</div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          required
          className="input"
          type="text"
          name="username"
          placeholder="Nombre"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          required
          className="input"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          required
          className="input"
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
        />

        {/* Cambiado el campo para seleccionar el rol */}
        <select
          required
          className="input"
          name="personal_rol" // Cambiado a 'personal_rol'
          value={formData.personal_rol}
          onChange={handleChange}
        >
          <option value="">Seleccione un rol</option>
          <option value="Administrador">Administrador</option>
          <option value="Conductor">Conductor</option>
          <option value="Enfermero">Enfermero</option>
          <option value="Paramédico">Paramédico</option>
        </select>

        <input className="register-button" type="submit" value="Sign Up" />
      </form>
    </div>
  );
};

export default Register;
