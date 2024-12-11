import React, { useState } from "react";
import ReactDOM from "react-dom";

function PropostaModal({ show, onClose, onSubmit }) {
  const [proposta, setProposta] = useState("");

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(proposta);
    setProposta("");
  };

  const modalContent = (
    <div className="modal d-block" style={{ zIndex: 1050 }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Enviar Proposta</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="proposta" className="form-label">
                  Proposta
                </label>
                <textarea
                  id="proposta"
                  className="form-control"
                  value={proposta}
                  onChange={(e) => setProposta(e.target.value)}
                  rows="4"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Enviar Proposta
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}

export default PropostaModal;
