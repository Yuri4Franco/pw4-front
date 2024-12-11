import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SidebarEmpresa() {
  const location = useLocation();
  const navigate = useNavigate();

  // Links do menu
  const menuItems = [
    { path: '/empresa', label: 'Início' },
    { path: '/empresa/projetos', label: 'Meus Projetos' },
    { path: '/empresa/interesses', label: 'Interessados' },
    { path: '/empresa/parcerias', label: 'Parcerias' },
  ];

  // Função para deslogar
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove o token armazenado
    toast.success('Você saiu do sistema!');
    navigate('/login'); // Redireciona para a página de login
  };


  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-light"
      style={{ width: '250px', height: '100vh' }}
    >

      <h3 className="text-center">Empresa</h3>
      <ul className="nav nav-pills flex-column mb-auto">
        {menuItems.map((item) => (
          <li key={item.path} className="nav-item">
            <Link
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : 'text-dark'}`}
              aria-current="page"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-auto text-center">
        <button
          className="btn btn-outline-danger"
          title="Sair"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right" style={{ fontSize: '1.5rem' }}></i>
        </button>
      </div>
    </div>
  );
}

export default SidebarEmpresa;
