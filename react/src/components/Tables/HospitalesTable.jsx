import React, { useState, useEffect } from 'react';
import "./tables.css";

const ManageData = () => {
  const [data, setData] = useState([]); // Estado para almacenar la lista de datos
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
  const [isEditing, setIsEditing] = useState(false); // Estado para saber si está en modo edición
  const [isAdding, setIsAdding] = useState(false); // Estado para saber si está en modo agregar
  const [editingData, setEditingData] = useState(null); // Datos del elemento que se está editando
  const [newData, setNewData] = useState({
    nombre: '',
    direccion: '',
    capacidad_atencion: '',
    categoria: 'Pública',
  }); // Estado para manejar el nuevo dato

  // Función para obtener la lista de datos desde la API
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/hospitales');
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  // Llamar a la API al cargar el componente
  useEffect(() => {
    fetchData();
  }, []);

  // Función para eliminar un dato
  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/hospitales/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Dato eliminado exitosamente');
      fetchData();
    } else {
      const error = await response.json();
      alert(error.mensaje);
    }
  };

  // Función para editar un dato
  const handleEdit = (dato) => {
    setIsEditing(true);
    setEditingData(dato);
  };

  // Función para guardar los cambios
  const handleSave = async () => {
    const response = await fetch(`http://localhost:5000/hospitales/${editingData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editingData),
    });

    if (response.ok) {
      alert('Dato actualizado exitosamente');
      fetchData();
      setIsEditing(false);
      setEditingData(null);
    } else {
      alert('Error al actualizar el dato');
    }
  };

  // Función para agregar un nuevo dato
  const handleAdd = async () => {
    const response = await fetch('http://localhost:5000/hospitales', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    });

    if (response.ok) {
      alert('Dato agregado exitosamente');
      fetchData();
      setIsAdding(false);
      setNewData({ nombre: '', direccion: '', capacidad_atencion: '', categoria: 'Pública' });
    } else {
      alert('Error al agregar el dato');
    }
  };

  return (
    <div>
      <h3>Gestionar Hospitales</h3>

      {/* Mostrar el formulario de edición si está en modo edición */}
      {isEditing && (
        <div className="modal">
          <h4>Editar Hospital</h4>
          <label>Nombre</label>
          <input
            type="text"
            value={editingData.nombre}
            onChange={(e) => setEditingData({ ...editingData, nombre: e.target.value })}
          />

          <label>Dirección</label>
          <input
            type="text"
            value={editingData.direccion}
            onChange={(e) => setEditingData({ ...editingData, direccion: e.target.value })}
          />

          <label>Capacidad de Atención</label>
          <input
            type="number"
            value={editingData.capacidad_atencion}
            onChange={(e) => setEditingData({ ...editingData, capacidad_atencion: e.target.value })}
          />

          <label>Categoría</label>
          <select
            value={editingData.categoria}
            onChange={(e) => setEditingData({ ...editingData, categoria: e.target.value })}
          >
            <option value="General">General</option>
            <option value="Especializado">Especializado</option>
            <option value="Clinica">Clinica</option>
            <option value="Emergencias">Emergencias</option>
          </select>

          <button onClick={handleSave}>Guardar Cambios</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </div>
      )}

      {/* Mostrar el formulario de agregar nueva entrada */}
      {isAdding && (
        <div className="modal">
          <h4>Agregar Nuevo Hospital</h4>
          <label>Nombre</label>
          <input
            type="text"
            value={newData.nombre}
            onChange={(e) => setNewData({ ...newData, nombre: e.target.value })}
          />

          <label>Dirección</label>
          <input
            type="text"
            value={newData.direccion}
            onChange={(e) => setNewData({ ...newData, direccion: e.target.value })}
          />

          <label>Capacidad de Atención</label>
          <input
            type="number"
            value={newData.capacidad_atencion}
            onChange={(e) => setNewData({ ...newData, capacidad_atencion: e.target.value })}
          />

          <label>Categoría</label>
          <select
            value={newData.categoria}
            onChange={(e) => setNewData({ ...newData, categoria: e.target.value })}
          >
            <option value="General">General</option>
            <option value="Especializado">Especializado</option>
            <option value="Clinica">Clinica</option>
            <option value="Emergencias">Emergencias</option>

          </select>

          <button onClick={handleAdd}>Agregar Hospital</button>
          <button onClick={() => setIsAdding(false)}>Cancelar</button>
        </div>
      )}

      {/* Botón para abrir el formulario de agregar */}
      <button onClick={() => setIsAdding(true)}>Agregar Hospital</button>

      {/* Tabla para mostrar los registros de datos */}
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Capacidad de Atención</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nombre}</td>
                <td>{item.direccion}</td>
                <td>{item.capacidad_atencion}</td>
                <td>{item.categoria}</td>
                <td>
                  <button onClick={() => handleEdit(item)}>Editar</button>
                  <button onClick={() => handleDelete(item.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageData;
