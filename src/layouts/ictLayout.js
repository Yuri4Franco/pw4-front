import React from 'react';
import SidebarIct from '../components/sidebarIct';

function IctLayout({ children }) {
  return (
    <div className="d-flex">
      <SidebarIct />
      <div className="flex-grow-1 p-4" style={{ overflow: 'auto' }}>
        {children}
      </div>
    </div>
  );
}

export default IctLayout;
