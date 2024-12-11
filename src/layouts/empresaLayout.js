import React from 'react';
import SidebarEmpresa from '../components/sidebarEmpresa';

function EmpresaLayout({ children }) {
  return (
    <div className="d-flex">
      <SidebarEmpresa />
      <div className="flex-grow-1 p-4" style={{ overflow: 'auto' }}>
        {children}
      </div>
    </div>
  );
}

export default EmpresaLayout;
