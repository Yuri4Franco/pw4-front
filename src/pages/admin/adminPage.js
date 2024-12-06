import React from 'react';
import AdminLayout from '../../layouts/adminLayout';

function AdminPage() {
  return (
    <AdminLayout>
      <h1 className="mb-4">Bem-vindo, Administrador!</h1>
      <p>Abaixo estão os números gerais do sistema:</p>
      <div className="row">
        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Empresas</h5>
              <p className="card-text fs-4">20</p> {/* Número fictício */}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">ICTs</h5>
              <p className="card-text fs-4">15</p> {/* Número fictício */}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Responsáveis</h5>
              <p className="card-text fs-4">30</p> {/* Número fictício */}
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Projetos Cadastrados</h5>
              <p className="card-text fs-4">50</p> {/* Número fictício */}
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Interesses Demonstrados</h5>
              <p className="card-text fs-4">25</p> {/* Número fictício */}
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Contratos Firmados</h5>
              <p className="card-text fs-4">10</p> {/* Número fictício */}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminPage;
