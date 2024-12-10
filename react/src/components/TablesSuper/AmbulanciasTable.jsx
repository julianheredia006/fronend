import React, { useState, useEffect } from 'react';
import "./tables.css";

const ManageAmbulancias = () => {
  const [ambulancias, setAmbulancias] = useState([]); // Estado para almacenar la lista de ambulancias
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
  const [isEditing, setIsEditing] = useState(false); // Estado para saber si está en modo edición
  const [isAdding, setIsAdding] = useState(false); // Estado para saber si está en modo agregar
  const [editingAmbulancia, setEditingAmbulancia] = useState(null); // Datos de la ambulancia que se está editando
  const [newAmbulancia, setNewAmbulancia] = useState({
    placa: '',
    categoria_ambulancia: '',
    hospital_id: '',
  }); // Estado para manejar la nueva ambulancia

  // Función para obtener la lista de ambulancias desde la API
  const fetchAmbulancias = async () => {
    try {
      const response = await fetch('http://localhost:5000/ambulancias');
      const data = await response.json();
      setAmbulancias(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching ambulancias:", error);
      setLoading(false);
    }
  };

  // Llamar a la API al cargar el componente
  useEffect(() => {
    fetchAmbulancias();
  }, []);

  // Función para eliminar una ambulancia
  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/ambulancias/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Ambulancia eliminada exitosamente');
      fetchAmbulancias(); // Vuelve a obtener las ambulancias actualizadas
    } else {
      const error = await response.json();
      alert(error.mensaje);
    }
  };

  // Función para editar una ambulancia
  const handleEdit = (ambulancia) => {
    setIsEditing(true);
    setEditingAmbulancia(ambulancia); // Cargar los datos de la ambulancia a editar
  };

  // Función para guardar los cambios
  const handleSave = async () => {
    const response = await fetch(`http://localhost:5000/ambulancias/${editingAmbulancia.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        placa: editingAmbulancia.placa,
        categoria_ambulancia: editingAmbulancia.categoria_ambulancia,
        hospital_id: editingAmbulancia.hospital_id,
      }),
    });

    if (response.ok) {
      alert('Ambulancia actualizada exitosamente');
      fetchAmbulancias();
      setIsEditing(false);
      setEditingAmbulancia(null);
    } else {
      alert('Error al actualizar la ambulancia');
    }
  };

  // Función para agregar una nueva ambulancia
  const handleAdd = async () => {
    const response = await fetch('http://localhost:5000/ambulancias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAmbulancia),
    });

    if (response.ok) {
      alert('Ambulancia agregada exitosamente');
      fetchAmbulancias();
      setIsAdding(false);
      setNewAmbulancia({ placa: '', categoria_ambulancia: '', hospital_id: '' });
    } else {
      alert('Error al agregar la ambulancia');
    }
  };

  return (
    <div>
      <h3>Gestionar Ambulancias</h3>

      {/* Mostrar el formulario de edición si está en modo edición */}
      {isEditing && (
        <div className="modal">
          <h4>Editar Ambulancia</h4>

          <label>Placa</label>
          <input
            type="text"
            value={editingAmbulancia.placa}
            onChange={(e) => setEditingAmbulancia({ ...editingAmbulancia, placa: e.target.value })}
          />

          <label>Categoría</label>
          <input
            type="text"
            value={editingAmbulancia.categoria_ambulancia}
            onChange={(e) => setEditingAmbulancia({ ...editingAmbulancia, categoria_ambulancia: e.target.value })}
          />

          <label>Hospital ID</label>
          <input
            type="text"
            value={editingAmbulancia.hospital_id}
            onChange={(e) => setEditingAmbulancia({ ...editingAmbulancia, hospital_id: e.target.value })}
          />

          <button onClick={handleSave}>Guardar Cambios</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </div>
      )}

      {/* Mostrar el formulario para agregar nueva ambulancia */}
      {isAdding && (
        <div className="modal">
          <h4>Agregar Nueva Ambulancia</h4>

          <label>Placa</label>
          <input
            type="text"
            value={newAmbulancia.placa}
            onChange={(e) => setNewAmbulancia({ ...newAmbulancia, placa: e.target.value })}
          />

          <label>Categoría</label>
          <input
            type="text"
            value={newAmbulancia.categoria_ambulancia}
            onChange={(e) => setNewAmbulancia({ ...newAmbulancia, categoria_ambulancia: e.target.value })}
          />

          <label>Hospital ID</label>
          <input
            type="text"
            value={newAmbulancia.hospital_id}
            onChange={(e) => setNewAmbulancia({ ...newAmbulancia, hospital_id: e.target.value })}
          />

          <button onClick={handleAdd}>Agregar Ambulancia</button>
          <button onClick={() => setIsAdding(false)}>Cancelar</button>
        </div>
      )}

      {/* Botón para abrir el formulario de agregar */}
      <button onClick={() => setIsAdding(true)}>Agregar Ambulancia</button>

      {/* Tabla para mostrar los registros de ambulancias */}
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Placa</th>
              <th>Categoría</th>
              <th>Hospital ID</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ambulancias.map((ambulancia) => (
              <tr key={ambulancia.id}>
                <td>{ambulancia.id}</td>
                <td>{ambulancia.placa}</td>
                <td>{ambulancia.categoria_ambulancia}</td>
                <td>{ambulancia.hospital_id}</td>
                <td>
                  <button onClick={() => handleEdit(ambulancia)}>Editar</button>
                  <button onClick={() => handleDelete(ambulancia.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageAmbulancias;
