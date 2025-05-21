import React from 'react';
import { Navigate } from 'react-router-dom';
// Importe sua lógica de autenticação aqui (ex: contexto de usuário)

const PrivateRoute = ({ children }) => {
  // Substitua com sua lógica de verificação de autenticação real
  const isAuthenticated = true; // Exemplo: mude para false para testar rotas protegidas

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute; 