import React from 'react';

function ResponsaveisTable({ responsaveis, onEdit, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Cargo</th>
            <th>Tipo</th>
            <th>Vínculo</th> {/* Mostra Empresa ou ICT */}
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {responsaveis.length > 0 ? (
            responsaveis.map((responsavel, index) => (
              <tr key={index}>
                <td>{responsavel.nome}</td>
                <td>{responsavel.email}</td>
                <td>{responsavel.cargo}</td>
                <td>{responsavel.tipo}</td>
                <td>
                  {responsavel.empresa
                    ? responsavel.empresa.nome
                    : responsavel.ict
                    ? responsavel.ict.nome
                    : 'Sem vínculo'}
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDelete(responsavel)}
                  >
                    <i className="bi bi-trash"></i> Excluir
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                Nenhum responsável encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ResponsaveisTable;
