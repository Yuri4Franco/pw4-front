import React from "react";

const backendBaseUrl = "http://127.0.0.1:3001"; // Base URL do backend

function IctParceriaCard({ contrato }) {
  const { interesse } = contrato;
  const { projeto } = interesse;
  const empresa = projeto?.empresa;

  // Monta a URL da imagem da empresa
  const imageUrl = empresa?.foto_perfil
    ? `${backendBaseUrl}${empresa.foto_perfil}`
    : "/default-profile.jpeg";

  return (
    <div
      className="card mb-3 p-3 text-center"
      style={{
        maxWidth: "400px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <img
        src={imageUrl}
        alt={`${empresa?.nome} perfil`}
        className="rounded-circle mx-auto"
        style={{ width: "80px", height: "80px", objectFit: "cover" }}
      />
      <h5 className="my-3">{empresa?.nome}</h5>
      <h5 className="text-muted">{projeto?.nome}</h5>
    </div>
  );
}

export default IctParceriaCard;
