import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // Aqui você precisaria adicionar a lógica para verificar se o usuário está logado
  const isAuthenticated = true; // Substitua por sua lógica de autenticação

  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          StyleForge
        </Link>
        <div>
          <Link to="/" className="mr-4 hover:underline">
            Início
          </Link>
          {!isAuthenticated && (
            <>
              <Link to="/login" className="mr-4 hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Registro
              </Link>
            </>
          )}
          {isAuthenticated && (
            <>
              <Link to="/profile" className="mr-4 hover:underline">
                Perfil
              </Link>
              <Link to="/design/create" className="hover:underline">
                Criar Design
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 