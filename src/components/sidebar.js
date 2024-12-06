import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  // Links do menu
  const menuItems = [
    { path: '/admin', label: 'Início' },
    { path: '/admin/empresas', label: 'Empresas' },
    { path: '/admin/icts', label: 'ICTs' },
    { path: '/admin/responsaveis', label: 'Responsáveis' },
  ];

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: '250px', height: '100vh' }}>
      <h3 className="text-center">Admin</h3>
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
    </div>
  );
}

export default Sidebar;
