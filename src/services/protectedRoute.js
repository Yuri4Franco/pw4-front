import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  if (user === null) {
    // Exibe um indicador de carregamento enquanto os dados são recuperados
    return <div>Carregando...</div>;
  }

  if (!user) {
    // Redireciona para o login se o usuário não estiver logado
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.tipo)) {
    // Redireciona para uma página de acesso negado se o tipo do usuário não for permitido
    return <Navigate to="/unauthorized" replace />;
  }

  // Renderiza o conteúdo protegido
  return children;
}

export default ProtectedRoute;
