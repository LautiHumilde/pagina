import React from 'react';

const UserFilter = ({ onFiltroChange }) => {
  const manejarCambio = (e) => {
    onFiltroChange(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Buscar por nombre"
      onChange={manejarCambio}
    />
  );
};

export default UserFilter;
