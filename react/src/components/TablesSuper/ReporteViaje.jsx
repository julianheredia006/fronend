import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Para enlaces a otras rutas
import "./tables.css";

// Componente para ver los Reportes de Viaje
const VistaReporteViajes = () => {
  const [reportesViaje, setReportesViaje] = useState([]); // Estado para almacenar los reportes de viaje
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
  const [isEditing, setIsEditing] = useState(false); // Estado para mostrar el modal de edición
  const [reporteEdicion, setReporteEdicion] = useState(null); // Estado para almacenar el reporte que se está editando

  // Función para obtener los reportes de viaje desde la API
  const fetchReportesViaje = async () => {
    try {
      const response = await fetch('http://localhost:5000/reportes'); // URL de la API
      const data = await response.json();
      setReportesViaje(data); // Asignamos los datos obtenidos a la variable de estado
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reportes de viaje:", error);
      setLoading(false);
    }
  };

  // Llamar a la API cuando el componente se monta
  useEffect(() => {
    fetchReportesViaje();
  }, []);

  // Función para eliminar un reporte de viaje
  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/reportes/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Reporte de viaje eliminado exitosamente');
      fetchReportesViaje(); // Vuelve a obtener los reportes de viaje actualizados
    } else {
      const error = await response.json();
      alert(error.mensaje);
    }
  };

  // Función para editar un reporte de viaje
  const handleEdit = (reporte) => {
    setReporteEdicion(reporte); // Establecer el reporte a editar
    setIsEditing(true); // Mostrar el formulario de edición
  };

  // Función para guardar los cambios del reporte editado
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/reportes/${reporteEdicion.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reporteEdicion),
      });

      if (response.ok) {
        alert('Reporte de viaje actualizado exitosamente');
        setIsEditing(false); // Cerrar el modal
        fetchReportesViaje(); // Actualizar la lista de reportes
      } else {
        const error = await response.json();
        alert(error.mensaje);
      }
    } catch (error) {
      console.error("Error actualizando el reporte de viaje:", error);
    }
  };

  // Función para manejar cambios en el formulario de edición
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReporteEdicion({
      ...reporteEdicion,
      [name]: value,
    });
  };

  return (
    <div>
      <h3>Vista Reportes de Viaje</h3>

      {/* Tabla para mostrar los registros de reportes de viaje */}
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className="reportes-viaje-table">
          <thead>
            <tr>
              <th>ID</th>
             
              <th>Tiempo</th>
          
              <th>Punto de Inicio</th>
              <th>Punto de Fin</th>
              <th>Accidente ID</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reportesViaje.map((reporte) => (
              <tr key={reporte.id}>
                <td>{reporte.id}</td> {/* ID */}
               
                <td>{reporte.tiempo}</td> {/* Tiempo */}
        
                <td>{reporte.punto_i}</td> {/* Punto de Inicio */}
                <td>{reporte.punto_f}</td> {/* Punto de Fin */}
                <td>{reporte.accidente_id}</td> {/* Accidente ID */}
                <td>
                  {/* Botón para editar */}
                  <button onClick={() => handleEdit(reporte)}>Editar</button>
                  {/* Botón para eliminar */}
                  <button onClick={() => handleDelete(reporte.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Enlace para agregar un nuevo reporte de viaje */}
      <div>
        <Link to="/reporte">
          <button>Agregar Reporte de Viaje</button>
        </Link>
      </div>

      {/* Modal de edición */}
      {isEditing && (
        <div className="modal-overlay">
          <div className="modal">
            <h4>Editar Reporte de Viaje</h4>

            <form onSubmit={handleSave}>
          

              <label>Tiempo:</label>
              <input
                type="text"
                name="tiempo"
                value={reporteEdicion.tiempo}
                onChange={handleChange}
              />

           

              <label>Punto de Inicio:</label>
              <input
                type="text"
                name="punto_i"
                value={reporteEdicion.punto_i}
                onChange={handleChange}
              />

              <label>Punto de Fin:</label>
              <input
                type="text"
                name="punto_f"
                value={reporteEdicion.punto_f}
                onChange={handleChange}
              />

              <label>Accidente ID:</label>
              <input
                type="text"
                name="accidente_id"
                value={reporteEdicion.accidente_id}
                onChange={handleChange}
              />

              <div>
                <button type="submit">Guardar</button>
                <button className="cancel" onClick={() => setIsEditing(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VistaReporteViajes;
