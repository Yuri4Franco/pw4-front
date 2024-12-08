import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function FormularioCadastroResponsaveis({ onSubmit, onClose, empresas, icts }) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cargo: '',
    tipo: '',
    empresa_id: '',
    ict_id: '',
    password: '',
    password_confirmation: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Limpa os campos de empresa_id ou ict_id com base no tipo selecionado
  useEffect(() => {
    if (formData.tipo === 'empresa') {
      setFormData((prev) => ({ ...prev, ict_id: '' }));
    } else if (formData.tipo === 'ict') {
      setFormData((prev) => ({ ...prev, empresa_id: '' }));
    }
  }, [formData.tipo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ responsavel: formData }); // Ajuste aqui
    }
    setFormData({
      nome: '',
      email: '',
      cargo: '',
      tipo: '',
      empresa_id: '',
      ict_id: '',
      password: '',
      password_confirmation: '',
    });
  };

  const modalContent = (
    <div className="modal d-block" style={{ zIndex: 1050 }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Cadastro de Responsável</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
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
                <label htmlFor="password" className="form-label">Senha</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password_confirmation" className="form-label">Confirme a Senha</label>
                <input
                  type="password"
                  id="password_confirmation"
                  name="password_confirmation"
                  className="form-control"
                  value={formData.password_confirmation}
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
                  <option value="empresa">Empresa</option>
                  <option value="ict">ICT</option>
                </select>
              </div>
              {formData.tipo === 'empresa' && (
                <div className="mb-3">
                  <label htmlFor="empresa_id" className="form-label">Empresa</label>
                  <select
                    id="empresa_id"
                    name="empresa_id"
                    className="form-select"
                    value={formData.empresa_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione uma empresa</option>
                    {empresas.map((empresa) => (
                      <option key={empresa.id} value={empresa.id}>
                        {empresa.nome}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {formData.tipo === 'ict' && (
                <div className="mb-3">
                  <label htmlFor="ict_id" className="form-label">ICT</label>
                  <select
                    id="ict_id"
                    name="ict_id"
                    className="form-select"
                    value={formData.ict_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione uma ICT</option>
                    {icts.map((ict) => (
                      <option key={ict.id} value={ict.id}>
                        {ict.nome}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <button type="submit" className="btn btn-primary">Cadastrar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}

export default FormularioCadastroResponsaveis;
