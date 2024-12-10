import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirigir
import './tables.css';

const ManagePersonal = () => {
  const [personal, setPersonal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPersonal, setEditingPersonal] = useState(null);
  const navigate = useNavigate(); // Hook para navegación

  const fetchPersonal = async () => {
    try {
      const response = await fetch('http://localhost:5000/personal');

      if (!response.ok) {
        throw new Error('Error al obtener los datos del personal');
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setPersonal(data);
        setLoading(false);
      } else {
        throw new Error('Datos mal formateados');
      }
    } catch (error) {
      console.error("Error fetching personal:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersonal();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/personal/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Personal eliminado exitosamente');
      fetchPersonal();
    } else {
      const error = await response.json();
      alert(error.mensaje);
    }
  };

  const handleEdit = (personal) => {
    setIsEditing(true);
    setEditingPersonal(personal);
  };

  const handleSave = async () => {
    const response = await fetch(`http://localhost:5000/personal/${editingPersonal.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: editingPersonal.nombre,
        email: editingPersonal.email,
        rol: editingPersonal.rol,
      }),
    });

    if (response.ok) {
      alert('Personal actualizado');
      fetchPersonal();
      setIsEditing(false);
    } else {
      alert('Error al actualizar el personal');
    }
  };

  return (
    <div>
      <h3>Gestionar Personal</h3>

      {/* Mostrar error si ocurre */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Botón para agregar personal */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => navigate('/register')} className="add-button">
          Agregar Personal
        </button>
      </div>

      {/* Tabla para mostrar los registros de personal */}
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {personal.length > 0 ? (
              personal.map((person) => (
                <tr key={person.id}>
                  <td>{person.id}</td>
                  <td>{person.nombre}</td>
                  <td>{person.email}</td>
                  {/* Mostrar nombre del rol en lugar del ID */}
                  <td>{person.personal_rol || 'Sin rol'}</td>
                
                  <td>
                    <button onClick={() => handleEdit(person)}>Editar</button>
                    <button onClick={() => handleDelete(person.id)}>Eliminar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No hay registros disponibles.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Modal para editar el personal */}
      {isEditing && (
        <div className="modal">
          <h4>Editar Personal</h4>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              value={editingPersonal.nombre}
              onChange={(e) => setEditingPersonal({ ...editingPersonal, nombre: e.target.value })}
            />
          </div>

          <div>
            <label>Email:</label>
            <input
              type="email"
              value={editingPersonal.email}
              onChange={(e) => setEditingPersonal({ ...editingPersonal, email: e.target.value })}
            />
          </div>

          <div>
            <label>Rol:</label>
            <select
              value={editingPersonal.rol}
              onChange={(e) => setEditingPersonal({ ...editingPersonal, rol: e.target.value })}
            >
              <option value="Conductor">Conductor</option>
              <option value="Enfermero">Enfermero</option>
              <option value="Paramédico">Paramédico</option>
            </select>
          </div>

          <div>
            <button onClick={handleSave}>Guardar cambios</button>
            <button onClick={() => setIsEditing(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePersonal;
