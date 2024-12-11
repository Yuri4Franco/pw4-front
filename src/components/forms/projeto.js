import React, { useState } from "react";
import ReactDOM from "react-dom";

function FormularioProjeto({ onSubmit, onClose, projeto }) {
  const [formData, setFormData] = useState(
    projeto || {
      nome: "",
      descricao: "",
      prioridade: "",
      status: "Aberto",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    onClose(); // Fecha o modal após envio
  };

  const modalContent = (
    <div className="modal d-block" style={{ zIndex: 1050 }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{projeto ? "Editar Projeto" : "Novo Projeto"}</h5>
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
                <label htmlFor="descricao" className="form-label">Descrição</label>
                <textarea
                  id="descricao"
                  name="descricao"
                  className="form-control"
                  value={formData.descricao}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="prioridade" className="form-label">Prioridade</label>
                <select
                  id="prioridade"
                  name="prioridade"
                  className="form-select"
                  value={formData.prioridade}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione</option>
                  <option value="Alta">Alta</option>
                  <option value="Média">Média</option>
                  <option value="Baixa">Baixa</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                {projeto ? "Salvar Alterações" : "Cadastrar"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}

export default FormularioProjeto;
