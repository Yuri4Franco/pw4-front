import React from 'react';
import Sidebar from '../components/sidebar';

function AdminLayout({ children }) {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4" style={{ overflow: 'auto' }}>
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
