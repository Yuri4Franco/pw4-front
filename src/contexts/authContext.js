import React, { createContext, useContext, useState, useEffect } from 'react';
import { setAuthToken, getAuthToken, clearAuthData } from '../config/authConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Recuperar os dados do localStorage ao carregar o contexto
  useEffect(() => {
    const token = getAuthToken();
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (token && userData) {
      setUser(userData); // Atualiza o estado global com os dados persistidos
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://127.0.0.1:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login falhou');
      }

      const data = await response.json();
      setAuthToken(data.token); // Salva o token no localStorage
      localStorage.setItem('userData', JSON.stringify(data)); // Salva os dados do usuário no localStorage
      setUser(data); // Atualiza o estado global do usuário
      return data; // Retorna os dados do usuário
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  };

  const logout = () => {
    clearAuthData(); // Remove o token e dados do localStorage
    localStorage.removeItem('userData'); // Remove os dados do usuário
    setUser(null); // Reseta o estado global
    window.location.href = '/login'; // Redireciona para o login
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
