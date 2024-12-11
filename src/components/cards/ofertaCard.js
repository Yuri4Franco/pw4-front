import React from "react";

const backendBaseUrl = "http://127.0.0.1:3001"; // Base URL do backend

function OfertaCard({ projeto, onTenhoInteresse, interesseEnviado }) {
  const { nome, descricao, prioridade, status, empresa } = projeto;

  const imageUrl = empresa?.foto_perfil
    ? `${backendBaseUrl}${empresa.foto_perfil}`
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
          alt={`${empresa?.nome} perfil`}
          className="rounded-circle me-3"
          style={{ width: "60px", height: "60px", objectFit: "cover" }}
        />
        <div>
          <h5 className="mb-1">{nome}</h5>
          <p className="text-muted mb-0">{empresa?.nome}</p>
        </div>
      </div>
      <div className="d-flex justify-content-start mb-3">
        <span
          className="badge bg-primary me-2"
          style={{
            borderRadius: "15px",
            padding: "5px 10px",
            fontSize: "12px",
          }}
        >
          {prioridade}
        </span>
        <span
          className="badge bg-success"
          style={{
            borderRadius: "15px",
            padding: "5px 10px",
            fontSize: "12px",
          }}
        >
          {status}
        </span>
      </div>
      <p className="text-muted">{descricao}</p>
      <div className="text-center">
        {interesseEnviado ? (
          <button className="btn btn-secondary" disabled>
            Proposta Enviada
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => onTenhoInteresse(projeto)}
          >
            Tenho Interesse
          </button>
        )}
      </div>
    </div>
  );
}

export default OfertaCard;
