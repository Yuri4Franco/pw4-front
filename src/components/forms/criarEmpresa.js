import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function FormularioCadastroEmpresa({ onSubmit, onClose, empresa }) {
  const [formData, setFormData] = useState(
    empresa || {
      nome: '',
      email: '',
      endereco: '',
      foto_perfil: null, // Inicializado como null para suportar arquivos
      cnpj: '',
    }
  );

  // Função para lidar com mudanças nos campos
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Se for um campo de arquivo, pega o arquivo. Caso contrário, usa o valor.
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) formDataToSend.append(key, value); // Adiciona apenas campos preenchidos
    });
  
    console.log('FormData enviado:');
    for (let [key, value] of formDataToSend.entries()) {
      console.log(`${key}:`, value);
    }
  
    if (onSubmit) {
      onSubmit(formDataToSend); // Envia os dados formatados para a função recebida via props
    }
  
    setFormData({
      nome: '',
      email: '',
      endereco: '',
      foto_perfil: '',
      cnpj: '',
    });
    onClose(); // Fecha o modal após envio
  };

  console.log(formData);
  const modalContent = (
    <div className="modal d-block" style={{ zIndex: 1050 }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{empresa ? 'Editar Empresa' : 'Cadastrar Empresa'}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
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
              <div className="mb-3">
                <label htmlFor="foto_perfil" className="form-label">Foto do Perfil</label>
                <input
                  type="file"
                  id="foto_perfil"
                  name="foto_perfil"
                  className="form-control"
                  onChange={handleChange}
                  accept="image/*"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                {empresa ? 'Salvar Alterações' : 'Cadastrar'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}

export default FormularioCadastroEmpresa;
