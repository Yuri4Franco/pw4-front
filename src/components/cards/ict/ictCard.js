import React, { useState } from 'react';

function IctCard({ nome, email, endereco, foto_perfil, cnpj, onEdit, onDelete, onViewColaboradores }) {
    const [showCnpj, setShowCnpj] = useState(false);

    return (
        <div className="card mb-3" style={{ width: '18rem' }}>
            <img src={foto_perfil} className="card-img-top" alt={`${nome} perfil`} />
            <div className="card-body">
                <h5 className="card-title">{nome}</h5>
                <p className="card-text"><strong>Email:</strong> {email}</p>
                <p className="card-text"><strong>Endereço:</strong> {endereco}</p>
                <p className="card-text">
                    <strong>CNPJ:</strong>{' '}
                    {showCnpj ? (
                        cnpj
                    ) : (
                        <span>*************</span>
                    )}
                    <button
                        type="button"
                        className="btn btn-link p-0 ms-2"
                        onClick={() => setShowCnpj(!showCnpj)}
                    >
                        <i className={`bi ${showCnpj ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                    </button>
                </p>
                <div className="btn-group mt-2">
                    <button className="btn btn-primary" onClick={onViewColaboradores}>
                        <i className="bi bi-people"></i> Ver Responsaveis
                    </button>
                    <button className="btn btn-warning" onClick={onEdit}>
                        <i className="bi bi-pencil"></i> Editar
                    </button>
                    <button className="btn btn-danger" onClick={onDelete}>
                        <i className="bi bi-trash"></i> Excluir
                    </button>
                </div>
            </div>
        </div>
    );
}

export default IctCard;
