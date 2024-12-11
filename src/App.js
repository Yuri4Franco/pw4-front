import React from 'react';
import './App.css';
import { AuthProvider } from './contexts/authContext';
import LoginPage from './pages/loginPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import AdminEmpresasPage from './pages/admin/adminEmpresasPage';
import AdminIctsPage from './pages/admin/adminIctsPage';
import AdminResponsaveisPage from './pages/admin/adminResponsaveisPage';

import IctPage from './pages/ict/ictPage';

import EmpresaPage from './pages/empresa/empresaPage';
import ProjetosPage from './pages/empresa/projetoPage';
import UnauthorizedPage from './pages/unauthorizedPage';
import ProtectedRoute from './services/protectedRoute';
import { Navigate } from 'react-router-dom';
import InteressesPage from './pages/empresa/interessesPage';
import ParceriasPage from './pages/empresa/parceriasPage';
import IctParceriasPage from './pages/ict/ictParceriaPage';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rota pública */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Rotas do administrador */}

          <Route
            path="/admin/empresas"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminEmpresasPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/icts"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminIctsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/responsaveis"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminResponsaveisPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/empresa/projetos"
            element={
              <ProtectedRoute allowedRoles={['empresa']}>
                <ProjetosPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/empresa"
            element={
              <ProtectedRoute allowedRoles={['empresa']}>
                <EmpresaPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/empresa/interesses"
            element={
              <ProtectedRoute allowedRoles={['empresa']}>
                <InteressesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/empresa/parcerias"
            element={
              <ProtectedRoute allowedRoles={['empresa']}>
                <ParceriasPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ict"
            element={
              <ProtectedRoute allowedRoles={['ict']}>
                <IctPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ict/parcerias"
            element={
              <ProtectedRoute allowedRoles={['ict']}>
                <IctParceriasPage />
              </ProtectedRoute>
            }
          />

          {/* Redireciona a raiz para o login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
