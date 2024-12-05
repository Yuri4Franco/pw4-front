import React, { useState, useEffect } from 'react';
import ResponsaveisTable from '../../components/tables/responsaveisTable';
function ResponsaveisPage() {
  const [usuarios, setUsuarios] = useState([]);

  // Simula a busca de dados (poderia ser uma chamada de API)
  useEffect(() => {
    const dadosFicticios = [
      { nome: 'João Silva', email: 'joao@email.com', cargo: 'Gerente', tipo: 'Admin' },
      { nome: 'Maria Oliveira', email: 'maria@email.com', cargo: 'Assistente', tipo: 'Usuário' },
    ];
    setUsuarios(dadosFicticios);
  }, []);

  const handleEdit = (usuario) => {
    console.log('Editar:', usuario);
    // Adicione aqui a lógica para editar o usuário
  };

  const handleDelete = (usuario) => {
    console.log('Excluir:', usuario);
    // Adicione aqui a lógica para excluir o usuário
  };

  return (
    <div className="container mt-4">
      <h1>Lista de Usuários</h1>
      <ResponsaveisTable 
        usuarios={usuarios} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
    </div>
  );
}

export default ResponsaveisPage;
