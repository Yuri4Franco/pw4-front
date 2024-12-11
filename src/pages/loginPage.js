import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function LoginPage() {
  const { login } = useAuth(); // Não usa `user` aqui
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Login retorna os dados do usuário diretamente
      const userData = await login(email, password);

      // Redirecionar com base no tipo de usuário retornado
      if (userData.tipo === 'admin') {
        navigate('/admin/empresas');
      } else if (userData.tipo === 'empresa') {
        navigate('/empresa');
      } else if (userData.tipo === 'ict') {
        navigate('/ict');
      } else {
        navigate('/unauthorized'); // Redireciona para uma página de acesso negado, caso necessário
      }
    } catch (error) {
      setErro('Falha ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h1 className="text-center">Login</h1>
          {erro && <div className="alert alert-danger">{erro}</div>}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Senha</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Entrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
