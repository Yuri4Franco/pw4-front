import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


function CrudButtons({ types = [], onCreate, onRead, onUpdate, onDelete }) {
    const renderButton = (type) => {
      switch (type) {
        case 'create':
          return (
            <button key="create" type="button" className="btn btn-success" onClick={onCreate}>
              <i className="bi bi-plus-circle"></i> Criar
            </button>
          );
        case 'read':
          return (
            <button key="read" type="button" className="btn btn-primary" onClick={onRead}>
              <i className="bi bi-eye"></i> Visualizar
            </button>
          );
        case 'update':
          return (
            <button key="update" type="button" className="btn btn-warning text-white" onClick={onUpdate}>
              <i className="bi bi-pencil"></i> Editar
            </button>
          );
        case 'delete':
          return (
            <button key="delete" type="button" className="btn btn-danger" onClick={onDelete}>
              <i className="bi bi-trash"></i> Excluir
            </button>
          );
        default:
          return null; // Não renderiza nada para tipos desconhecidos
      }
    };
  
    return <div className="btn-group">{types.map((type) => renderButton(type))}</div>;
  }
  

export default CrudButtons;
