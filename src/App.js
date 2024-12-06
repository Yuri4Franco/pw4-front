import React from 'react';
import './App.css';
import { AuthProvider } from './contexts/authContext';
import LoginPage from './pages/loginPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AdminPage from './pages/admin/adminPage';
import AdminEmpresasPage from './pages/admin/adminEmpresasPage';
import AdminIctsPage from './pages/admin/adminIctsPage';
import AdminResponsaveisPage from './pages/admin/adminResponsaveisPage';

import IctPage from './pages/ict/ictPage';

import EmpresaPage from './pages/empresa/empresaPage';
import UnauthorizedPage from './pages/unauthorizedPage';
import ProtectedRoute from './services/protectedRoute';
import { Navigate } from 'react-router-dom';


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
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
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
            path="/empresa"
            element={
              <ProtectedRoute allowedRoles={['empresa']}>
                <EmpresaPage />
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

          {/* Redireciona a raiz para o login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
