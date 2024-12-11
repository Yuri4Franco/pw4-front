import React from "react";
import axios from "../../config/axiosConfig";

const backendBaseUrl = "http://127.0.0.1:3001"; // Base URL do backend

function InteresseCard({ interesse, onApprove, onReject }) {
  const { responsavel, proposta, projeto } = interesse;

  // Monta a URL da imagem da ICT
  const imageUrl = responsavel?.ict?.foto_perfil
    ? `${backendBaseUrl}${responsavel.ict.foto_perfil}`
    : "/default-profile.jpeg";

  return (
    <div
      className="card mb-3 p-3"
      style={{
        maxWidth: "600px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="d-flex align-items-center mb-3">
        <img
          src={imageUrl}
          alt={`${responsavel?.ict?.nome} perfil`}
          className="rounded-circle me-3"
          style={{ width: "60px", height: "60px", objectFit: "cover" }}
        />
        <div>
          <h5 className="mb-1">{responsavel?.nome}</h5>
          <p className="text-muted mb-0">{responsavel?.ict?.nome}</p>
        </div>
      </div>
      <h5 className="text-center my-3">{projeto?.nome}</h5>
      <p className="mb-3">
        <strong>Proposta:</strong> {proposta}
      </p>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-success me-2"
          onClick={() => onApprove(interesse.id)}
        >
          Aprovar
        </button>
        <button
          className="btn btn-danger"
          onClick={() => onReject(interesse.id)}
        >
          Rejeitar
        </button>
      </div>
    </div>
  );
}

export default InteresseCard;
