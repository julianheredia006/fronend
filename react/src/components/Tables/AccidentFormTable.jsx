import React, { useState, useEffect } from 'react';
import './tables.css';

const ManageReporteAccidente = () => {
  const [reportesAccidente, setReportesAccidente] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingReporte, setEditingReporte] = useState(null);

  const fetchReportesAccidente = async () => {
    try {
      const response = await fetch('http://localhost:5000/accidentes');
      if (!response.ok) {
        throw new Error('No se pudo cargar la lista de reportes');
      }
      const data = await response.json();
      setReportesAccidente(data);
      setLoading(false);
    } catch (error) {
      setError('Hubo un problema al cargar los reportes.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportesAccidente();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/accidentes/${id}`, { method: 'DELETE' });
      if (response.ok) {
        alert('Reporte de accidente eliminado exitosamente');
        fetchReportesAccidente();
      } else {
        const error = await response.json();
        alert(error.mensaje || 'Error al eliminar el reporte');
      }
    } catch {
      alert('Error al procesar la solicitud');
    }
  };

  const handleEdit = (reporte) => {
    setIsEditing(true);
    setEditingReporte(reporte);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5000/accidentes/${editingReporte.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingReporte),
      });
      if (response.ok) {
        alert('Reporte de accidente actualizado exitosamente');
        fetchReportesAccidente();
        setIsEditing(false);
        setEditingReporte(null);
      } else {
        alert('Error al actualizar el reporte');
      }
    } catch {
      alert('Error al procesar la solicitud');
    }
  };

  return (
    <div>
      <h3>Gestionar Reportes de Accidente</h3>
      {error && <p className="error">{error}</p>}

      {isEditing && (
        <div className="modal">
          <h4>Editar Reporte</h4>
          {/* Inputs de edición */}
          {Object.keys(editingReporte || {}).map((key) => (
            <div key={key}>
              <label>{key}</label>
              <input
                type="text"
                value={editingReporte[key]}
                onChange={(e) => setEditingReporte({ ...editingReporte, [key]: e.target.value })}
              />
            </div>
          ))}
          <button onClick={handleSave}>Guardar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </div>
      )}

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table>
          <thead>
            <tr>
              {Object.keys(reportesAccidente[0] || {}).map((key) => (
                <th key={key}>{key}</th>
              ))}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reportesAccidente.map((reporte) => (
              <tr key={reporte.id}>
                {Object.values(reporte).map((val, idx) => (
                  <td key={idx}>{val || 'N/A'}</td>
                ))}
                <td>
                  <button onClick={() => handleEdit(reporte)}>Editar</button>
                  <button onClick={() => handleDelete(reporte.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageReporteAccidente;
