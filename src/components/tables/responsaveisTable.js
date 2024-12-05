import React from 'react';

function ResponsaveisTable({ usuarios, onEdit, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Cargo</th>
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((usuario, index) => (
              <tr key={index}>
                <td>{usuario.nome}</td>
                <td>{usuario.email}</td>
                <td>{usuario.cargo}</td>
                <td>{usuario.tipo}</td>
                <td>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => onEdit(usuario)}
                  >
                    <i className="bi bi-pencil"></i> Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDelete(usuario)}
                  >
                    <i className="bi bi-trash"></i> Excluir
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                Nenhum usuário encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ResponsaveisTable;
