import React, { useState } from 'react';

function FormularioCadastroEmpresa({ onSubmit }) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    endereco: '',
    foto_perfil: '',
    cnpj: '',
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
    console.log('Dados da empresa cadastrada:', formData);
    // Resetar formulário (opcional)
    setFormData({
      nome: '',
      email: '',
      endereco: '',
      foto_perfil: '',
      cnpj: '',
    });
  };

  return (
    <div className="container mt-4">
      <h2>Cadastro de Empresa</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome da Empresa</label>
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
          <label htmlFor="endereco" className="form-label">Endereço</label>
          <input
            type="text"
            id="endereco"
            name="endereco"
            className="form-control"
            value={formData.endereco}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="foto_perfil" className="form-label">URL da Foto do Perfil</label>
          <input
            type="url"
            id="foto_perfil"
            name="foto_perfil"
            className="form-control"
            value={formData.foto_perfil}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cnpj" className="form-label">CNPJ</label>
          <input
            type="text"
            id="cnpj"
            name="cnpj"
            className="form-control"
            value={formData.cnpj}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Cadastrar</button>
      </form>
    </div>
  );
}

export default FormularioCadastroEmpresa;
