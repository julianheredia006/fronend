import React, { useState } from "react";
import "./formulario.css";

const Formulario = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    numero_documento: "",
    genero: "",
    seguro_medico: "",
    reporte_accidente: "",
    fecha_reporte: "",
    ubicacion: "",
    EPS: "",
    estado: "",
    ambulancia_id: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(""); // Resetea el mensaje antes de enviar

    try {
      const response = await fetch("http://localhost:5000/accidentes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setMensaje("Formulario registrado con éxito.");
        console.log("Formulario registrado con éxito:", data);
        setFormData({
          nombre: "",
          apellido: "",
          numero_documento: "",
          genero: "",
          seguro_medico: "",
          reporte_accidente: "",
          fecha_reporte: "",
          ubicacion: "",
          EPS: "",
          estado: "",
          ambulancia_id: "",
        });
      } else {
        const error = await response.json();
        setMensaje(`Error: ${error.mensaje || "No se pudo registrar el formulario."}`);
        console.error("Error al registrar el formulario:", error);
      }
    } catch (error) {
      setMensaje("Error al enviar los datos. Inténtalo nuevamente.");
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <div className="fondo">
      <div className="formulario-contenedor">
        <p className="formulario-titulo">Registro de Accidente</p>
        {mensaje && <p className="formulario-mensaje">{mensaje}</p>}
        <form onSubmit={handleSubmit}>
          {/* Campo Nombre */}
          <div className="formulario-grupo">
            <label className="formulario-label" htmlFor="nombre">Nombre</label>
            <input
              placeholder="Ingresa tu nombre"
              className="formulario-input"
              type="text"
              name="nombre"
              id="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          {/* Campo Apellido */}
          <div className="formulario-grupo">
            <label className="formulario-label" htmlFor="apellido">Apellido</label>
            <input
              placeholder="Ingresa tu apellido"
              className="formulario-input"
              type="text"
              name="apellido"
              id="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </div>

          {/* Campo Número de Documento */}
          <div className="formulario-grupo">
            <label className="formulario-label" htmlFor="numero_documento">Número de documento</label>
            <input
              placeholder="Número de documento"
              className="formulario-input"
              type="text"
              name="numero_documento"
              id="numero_documento"
              value={formData.numero_documento}
              onChange={handleChange}
            />
          </div>

          {/* Campo Género */}
          <div className="formulario-grupo">
            <label className="formulario-label" htmlFor="genero">Género</label>
            <select
              className="formulario-input"
              name="genero"
              id="genero"
              value={formData.genero}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Selecciona tu género</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          {/* Campo Seguro Médico */}
          <div className="formulario-grupo">
            <label className="formulario-label" htmlFor="seguro_medico">¿Tienes seguro médico?</label>
            <select
              className="formulario-input"
              name="seguro_medico"
              id="seguro_medico"
              value={formData.seguro_medico}
              onChange={handleChange}
            >
              <option value="" disabled>Selecciona una opción</option>
              <option value="si">Sí</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Campo Reporte Accidente */}
          <div className="formulario-grupo">
            <label className="formulario-label" htmlFor="reporte_accidente">Reporte Accidente</label>
            <textarea
              placeholder="Describe el accidente"
              className="formulario-input"
              name="reporte_accidente"
              id="reporte_accidente"
              value={formData.reporte_accidente}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Campo Fecha Reporte */}
          <div className="formulario-grupo">
            <label className="formulario-label" htmlFor="fecha_reporte">Fecha del Reporte</label>
            <input
              placeholder="Selecciona la fecha del reporte"
              className="formulario-input"
              type="date"
              name="fecha_reporte"
              id="fecha_reporte"
              value={formData.fecha_reporte}
              onChange={handleChange}
            />
          </div>

          {/* Campo Ubicación */}
          <div className="formulario-grupo">
            <label className="formulario-label" htmlFor="ubicacion">Ubicación</label>
            <input
              placeholder="Ingresa tu ubicación"
              className="formulario-input"
              type="text"
              name="ubicacion"
              id="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
              required
            />
          </div>

          {/* Campo EPS */}
          <div className="formulario-grupo">
            <label className="formulario-label" htmlFor="EPS">EPS</label>
            <input
              placeholder="Ingresa tu EPS"
              className="formulario-input"
              type="text"
              name="EPS"
              id="EPS"
              value={formData.EPS}
              onChange={handleChange}
              required
            />
          </div>

          {/* Campo Estado */}
          <div className="formulario-grupo">
            <label className="formulario-label" htmlFor="estado">Estado</label>
            <select
              className="formulario-input"
              name="estado"
              id="estado"
              value={formData.estado}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Selecciona el estado</option>
              <option value="leve">Leve</option>
              <option value="moderado">Moderado</option>
              <option value="grave">Grave</option>
              <option value="critico">Crítico</option>
            </select>
          </div>

          {/* Campo Ambulancia ID */}
          <div className="formulario-grupo">
            <label className="formulario-label" htmlFor="ambulancia_id">Ambulancia ID</label>
            <input
              placeholder="Ingresa el ID de la ambulancia"
              className="formulario-input"
              type="text"
              name="ambulancia_id"
              id="ambulancia_id"
              value={formData.ambulancia_id}
              onChange={handleChange}
            />
          </div>

          <div className="formulario-grupo">
            <button className="formulario-boton" type="submit">Registrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Formulario;
