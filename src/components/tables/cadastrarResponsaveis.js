import React, { useState } from 'react';

function FormularioCadastroResponsaveis({ onSubmit }) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cargo: '',
    tipo: '',
    empresa_id: '',
    ict_id: '',
  });

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
    if (onSubmit) {
      onSubmit(formData); // Envia os dados para a função recebida via props
    }
    console.log('Responsável cadastrado:', formData);
    // Resetar formulário (opcional)
    setFormData({
      nome: '',
      email: '',
      cargo: '',
      tipo: '',
    });
  };

  return (
    <div className="container mt-4">
      <h2>Cadastro de Responsável</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            className="form-control"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>
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
          <label htmlFor="cargo" className="form-label">Cargo</label>
          <input
            type="text"
            id="cargo"
            name="cargo"
            className="form-control"
            value={formData.cargo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tipo" className="form-label">Tipo</label>
          <select
            id="tipo"
            name="tipo"
            className="form-select"
            value={formData.tipo}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Selecione o Tipo</option>
            <option value="Administrador">Administrador</option>
            <option value="Usuário">Usuário</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Cadastrar</button>
      </form>
    </div>
  );
}

export default FormularioCadastroResponsaveis;
