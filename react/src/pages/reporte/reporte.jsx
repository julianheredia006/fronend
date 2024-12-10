import React, { useState } from "react";

const Formulario = () => {
  const [formData, setFormData] = useState({
    ambulanciaAsignada: "",
    tiempo: "",
    paciente: "",
    puntoInicial: "",
    puntoFinal: "",
    accidenteId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear el cuerpo de la solicitud para el backend Flask
    const requestBody = {
      ambulancia_asignada: formData.ambulanciaAsignada,
      tiempo: formData.tiempo,  // Asegúrate de enviar el tiempo en formato "HH:MM:SS"
      paciente: formData.paciente,
      punto_i: formData.puntoInicial,
      punto_f: formData.puntoFinal,
      accidente_id: formData.accidenteId,
    };

    try {
      // Hacer la solicitud POST al backend
      const response = await fetch("http://localhost:5000/reportes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Error al registrar el reporte");
      }

      const data = await response.json();
      console.log("Reporte creado:", data);
      alert("Reporte registrado con éxito.");
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error al registrar el reporte.");
    }
  };

  return (
    <div className="fondo">
      <div className="formulario-contenedor">
        <p className="formulario-titulo">Reporte del viaje</p>
        <form onSubmit={handleSubmit}>
        
          {/* Campo Tiempo */}
          <div className="formulario-grupo">
            <label className="formulario-label" htmlFor="tiempo">Tiempo Estimado</label>
            <input
              placeholder="Ingresa el tiempo estimado en formato HH:MM:SS"
              className="formulario-input"
              type="text"
              name="tiempo"
              id="tiempo"
              value={formData.tiempo}
              onChange={handleChange}
              required
            />
          </div>


          {/* Campo Punto Inicial */}
          <div className="formulario-grupo">
            <label className="formulario-label" htmlFor="puntoInicial">Punto Inicial</label>
            <input
              placeholder="Ingresa el punto inicial"
              className="formulario-input"
              type="text"
              name="puntoInicial"
              id="puntoInicial"
              value={formData.puntoInicial}
              onChange={handleChange}
              required
            />
          </div>

          {/* Campo Punto Final */}
          <div className="formulario-grupo">
            <label className="formulario-label" htmlFor="puntoFinal">Punto Final</label>
            <input
              placeholder="Ingresa el punto final"
              className="formulario-input"
              type="text"
              name="puntoFinal"
              id="puntoFinal"
              value={formData.puntoFinal}
              onChange={handleChange}
              required
            />
          </div>

          {/* Campo Accidente ID */}
          <div className="formulario-grupo">
            <label className="formulario-label" htmlFor="accidenteId">Accidente ID</label>
            <input
              placeholder="Ingresa el ID del accidente"
              className="formulario-input"
              type="text"
              name="accidenteId"
              id="accidenteId"
              value={formData.accidenteId}
              onChange={handleChange}
              required
            />
          </div>

          {/* Botón de envío */}
          <div>
            <button className="formulario-boton" type="submit">Registrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Formulario;
