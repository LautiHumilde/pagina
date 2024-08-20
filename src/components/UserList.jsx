import React from 'react';

const UserList = ({ usuarios, onEliminar, onActualizar }) => {
  const [usuarioEditado, setUsuarioEditado] = useState(null);

  const manejarEditar = (usuario) => {
    setUsuarioEditado(usuario);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <button onClick={() => manejarEditar(u)}>Editar</button>
                <button onClick={() => onEliminar(u.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {usuarioEditado && (
        <UserForm
          usuario={usuarioEditado}
          onActualizar={onActualizar}
        />
      )}
    </>
  );
};

export default UserList;
