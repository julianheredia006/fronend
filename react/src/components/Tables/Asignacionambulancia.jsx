import React, { useState, useEffect } from 'react';
import './tables.css';

const ManageAsignaciones = () => {
  const [asignaciones, setAsignaciones] = useState([]);
  const [personas, setPersonas] = useState([]);
  const [ambulancias, setAmbulancias] = useState([]);
  const [roles, setRoles] = useState([]); // Estado para almacenar los roles
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingAsignacion, setEditingAsignacion] = useState(null);
  const [newAsignacion, setNewAsignacion] = useState({
    personal_id: '',
    ambulancia_id: '',
    fecha_asignacion: '',
  });

  // Función para obtener la lista de asignaciones
  const fetchAsignaciones = async () => {
    try {
      const response = await fetch('http://localhost:5000/asignacion');
      if (!response.ok) {
        throw new Error('Error al obtener las asignaciones');
      }
      const data = await response.json();
      setAsignaciones(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  // Función para obtener la lista de personas
  const fetchPersonas = async () => {
    try {
      const response = await fetch('http://localhost:5000/personal');
      if (!response.ok) {
        throw new Error('Error al obtener las personas');
      }
      const data = await response.json();
      setPersonas(data);
    } catch (error) {
      console.error("Error fetching personas:", error);
    }
  };

  // Función para obtener la lista de ambulancias
  const fetchAmbulancias = async () => {
    try {
      const response = await fetch('http://localhost:5000/ambulancias');
      if (!response.ok) {
        throw new Error('Error al obtener las ambulancias');
      }
      const data = await response.json();
      setAmbulancias(data);
    } catch (error) {
      console.error("Error fetching ambulancias:", error);
    }
  };

  // Usamos useEffect para hacer las peticiones cuando el componente se monte
  useEffect(() => {
    fetchAsignaciones();
    fetchPersonas();
    fetchAmbulancias();
  }, []);

  // Función para eliminar una asignación
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta asignación?")) {
      const response = await fetch(`http://localhost:5000/asignacion/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Asignación eliminada exitosamente');
        fetchAsignaciones(); // Vuelve a obtener las asignaciones actualizadas
      } else {
        const error = await response.json();
        alert(error.mensaje);
      }
    }
  };

  // Función para editar una asignación
  const handleEdit = (asignacion) => {
    setIsEditing(true);
    setEditingAsignacion(asignacion);
  };

  // Función para guardar los cambios en la asignación
  const handleSave = async () => {
    const response = await fetch(`http://localhost:5000/asignacion/${editingAsignacion.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editingAsignacion),
    });

    if (response.ok) {
      alert('Asignación actualizada exitosamente');
      fetchAsignaciones();
      setIsEditing(false);
      setEditingAsignacion(null);
    } else {
      alert('Error al actualizar la asignación');
    }
  };

  // Función para agregar una nueva asignación
  const handleAdd = async () => {
    const response = await fetch('http://localhost:5000/asignacion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAsignacion),
    });

    if (response.ok) {
      alert('Asignación agregada exitosamente');
      fetchAsignaciones();
      setIsAdding(false);
      setNewAsignacion({ personal_id: '', ambulancia_id: '', fecha_asignacion: '' });
    } else {
      alert('Error al agregar la asignación');
    }
  };

  // Función para obtener el nombre del rol por ID
  const getRolNombreById = (rolId) => {
    const rol = roles.find((r) => r.id === rolId);
    return rol ? rol.nombre : 'Desconocido'; // Suponiendo que el campo `nombre` existe en el rol
  };

  // Función para obtener el nombre de la persona por ID
  const getPersonaNombreById = (id) => {
    const persona = personas.find((p) => p.id === id);
    return persona ? persona.nombre : 'Desconocido';
  };

  // Función para obtener el rol del personal por ID
  const getPersonaRolById = (id) => {
    const persona = personas.find((p) => p.id === id);
    return persona ? persona.personal_rol : 'Desconocido'; // Usamos `personal_rol` para obtener el nombre del rol
  };

  // Función para obtener la placa de la ambulancia por ID
  const getAmbulanciaPlacaById = (id) => {
    const ambulancia = ambulancias.find((a) => a.id === id);
    return ambulancia ? ambulancia.placa : 'Desconocido';
  };

  return (
    <div>
      <h3>Gestionar Asignaciones de Ambulancia</h3>

      {/* Mostrar el formulario de edición si está en modo edición */}
      {isEditing && (
        <div className="modal">
          <h4>Editar Asignación</h4>
          <label>ID Persona</label>
          <input
            type="number"
            value={editingAsignacion.personal_id}
            onChange={(e) => setEditingAsignacion({ ...editingAsignacion, personal_id: e.target.value })}
          />

          <label>ID Ambulancia</label>
          <input
            type="number"
            value={editingAsignacion.ambulancia_id}
            onChange={(e) => setEditingAsignacion({ ...editingAsignacion, ambulancia_id: e.target.value })}
          />

          <label>Fecha de Asignación</label>
          <input
            type="date"
            value={editingAsignacion.fecha_asignacion}
            onChange={(e) => setEditingAsignacion({ ...editingAsignacion, fecha_asignacion: e.target.value })}
          />

          <button onClick={handleSave}>Guardar Cambios</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </div>
      )}

      {/* Mostrar el formulario de agregar nueva entrada */}
      {isAdding && (
        <div className="modal">
          <h4>Agregar Nueva Asignación</h4>
          <label>ID Persona</label>
          <input
            type="number"
            value={newAsignacion.personal_id}
            onChange={(e) => setNewAsignacion({ ...newAsignacion, personal_id: e.target.value })}
          />

          <label>ID Ambulancia</label>
          <input
            type="number"
            value={newAsignacion.ambulancia_id}
            onChange={(e) => setNewAsignacion({ ...newAsignacion, ambulancia_id: e.target.value })}
          />

          <label>Fecha de Asignación</label>
          <input
            type="date"
            value={newAsignacion.fecha_asignacion}
            onChange={(e) => setNewAsignacion({ ...newAsignacion, fecha_asignacion: e.target.value })}
          />

          <button onClick={handleAdd}>Agregar Asignación</button>
          <button onClick={() => setIsAdding(false)}>Cancelar</button>
        </div>
      )}

      {/* Botón para abrir el formulario de agregar */}
      <button onClick={() => setIsAdding(true)}>Agregar Asignación</button>

      {/* Tabla para mostrar los registros de datos */}
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Personal ID</th>
              <th>Personal Nombre</th>
              <th>Rol del Personal</th> {/* Nueva columna para el rol */}
              <th>Ambulancia ID</th>
              <th>Ambulancia Placa</th>
              <th>Fecha Asignación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {asignaciones.map((asignacion) => (
              <tr key={asignacion.id}>
                <td>{asignacion.id}</td>
                <td>{asignacion.personal_id}</td>
                <td>{getPersonaNombreById(asignacion.personal_id)}</td>
                <td>{getPersonaRolById(asignacion.personal_id)}</td> {/* Mostrar el nombre del rol */}
                <td>{asignacion.ambulancia_id}</td>
                <td>{getAmbulanciaPlacaById(asignacion.ambulancia_id)}</td>
                <td>{asignacion.fecha_asignacion}</td>
                <td>
                  <button onClick={() => handleEdit(asignacion)}>Editar</button>
                  <button onClick={() => handleDelete(asignacion.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageAsignaciones;
