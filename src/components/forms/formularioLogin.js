import React, { useState } from 'react';

function FormularioLogin({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });

  const [error, setError] = useState('');

  // Função para lidar com mudanças nos campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação básica
    if (!formData.email || !formData.senha) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if (onLogin) {
      onLogin(formData); // Envia os dados para a função de callback
    }

    console.log('Tentativa de login:', formData);
  };

  return (
    <div className="container mt-4">
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="senha" className="form-label">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            className="form-control"
            value={formData.senha}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Entrar</button>
      </form>
    </div>
  );
}

export default FormularioLogin;
