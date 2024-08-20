import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import UserPagination from './components/UserPagination';
import UserFilter from './components/UserFilter';
import './App.css';

const App = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const porPagina = 5;

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(res => {
        setUsuarios(res.data);
        setUsuariosFiltrados(res.data);
      })
      .catch(error => console.error('Error al obtener usuarios:', error));
  }, []);

  const agregarUsuario = (usuario) => {
    axios.post('http://localhost:5000/users', usuario)
      .then(res => {
        setUsuarios(prev => [...prev, res.data]);
        setUsuariosFiltrados(prev => [...prev, res.data]);
      })
      .catch(error => console.error('Error al agregar usuario:', error));
  };

  const actualizarUsuario = (usuarioActualizado) => {
    axios.put(`http://localhost:5000/users/${usuarioActualizado.id}`, usuarioActualizado)
      .then(() => {
        setUsuarios(prev => prev.map(u => u.id === usuarioActualizado.id ? usuarioActualizado : u));
        setUsuariosFiltrados(prev => prev.map(u => u.id === usuarioActualizado.id ? usuarioActualizado : u));
      })
      .catch(error => console.error('Error al actualizar usuario:', error));
  };

  const eliminarUsuario = (id) => {
    axios.delete(`http://localhost:5000/users/${id}`)
      .then(() => {
        setUsuarios(prev => prev.filter(u => u.id !== id));
        setUsuariosFiltrados(prev => prev.filter(u => u.id !== id));
      })
      .catch(error => console.error('Error al eliminar usuario:', error));
  };

  const filtrarUsuarios = (texto) => {
    const resultados = usuarios.filter(u =>
      u.name.toLowerCase().includes(texto.toLowerCase())
    );
    setUsuariosFiltrados(resultados);
    setPaginaActual(1);
  };

  const cambiarPagina = (pagina) => {
    setPaginaActual(pagina);
  };

  const ultimoUsuarioIndex = paginaActual * porPagina;
  const primerUsuarioIndex = ultimoUsuarioIndex - porPagina;
  const usuariosEnPagina = usuariosFiltrados.slice(primerUsuarioIndex, ultimoUsuarioIndex);

  return (
    <div className="App">
      <h1>Mi Aplicación de Usuarios</h1>
      <UserFilter onFiltroChange={filtrarUsuarios} />
      <UserForm onAgregar={agregarUsuario} onActualizar={actualizarUsuario} />
      <UserList
        usuarios={usuariosEnPagina}
        onEliminar={eliminarUsuario}
        onActualizar={actualizarUsuario}
      />
      <UserPagination
        total={usuariosFiltrados.length}
        porPagina={porPagina}
        actual={paginaActual}
        onPaginaChange={cambiarPagina}
      />
    </div>
  );
};

export default App;
