import React, { useState, useEffect } from 'react';

function ConfirmModal({ show, onClose, onConfirm, message }) {
  const [canConfirm, setCanConfirm] = useState(false);
  const [countdown, setCountdown] = useState(3); // Contagem inicial de 3 segundos

  useEffect(() => {
    let timer;
    let countdownInterval;

    if (show) {
      setCanConfirm(false);
      setCountdown(3); // Reseta a contagem para 3 segundos

      countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(countdownInterval); // Para a contagem ao atingir 0
            return prev;
          }
          return prev - 1;
        });
      }, 1000);

      // Desbloqueia o botão após 3 segundos
      timer = setTimeout(() => {
        setCanConfirm(true);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <div className="modal d-block" style={{ zIndex: 1050 }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirmação</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button
              className="btn btn-danger"
              onClick={onConfirm}
              disabled={!canConfirm}
            >
              {canConfirm ? 'Sim, excluir' : `Aguarde... ${countdown}s`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
