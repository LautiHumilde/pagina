import React from 'react';

const UserPagination = ({ total, porPagina, actual, onPaginaChange }) => {
  const totalPaginas = Math.ceil(total / porPagina);

  return (
    <div>
      {Array.from({ length: totalPaginas }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => onPaginaChange(index + 1)}
          disabled={actual === index + 1}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default UserPagination;
