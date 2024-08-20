import React, { useState, useEffect } from 'react';

const UserForm = ({ onAgregar, onActualizar }) => {
  const [usuario, setUsuario] = useState({ name: '', email: '' });
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    if (usuario.id) {
      setEditando(true);
    } else {
      setEditando(false);
    }
  }, [usuario]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setUsuario(prev => ({ ...prev, [name]: value }));
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (editando) {
      onActualizar(usuario);
    } else {
      usuario.id = Date.now();
      onAgregar(usuario);
    }
    setUsuario({ name: '', email: '' });
  };

  return (
    <form onSubmit={manejarSubmit}>
      <input
        type="text"
        name="name"
        value={usuario.name}
        onChange={manejarCambio}
        placeholder="Nombre"
        required
      />
      <input
        type="email"
        name="email"
        value={usuario.email}
        onChange={manejarCambio}
        placeholder="Email"
        required
      />
      <button type="submit">{editando ? 'Actualizar' : 'Agregar'}</button>
    </form>
  );
};

export default UserForm;
