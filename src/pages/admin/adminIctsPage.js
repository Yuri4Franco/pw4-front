import React, { useEffect, useState } from 'react';
import IctCard from '../../components/cards/ict/ictCard';
import AdminLayout from '../../layouts/adminLayout';
import FormularioCadastroIct from '../../components/forms/criarIct';
import ConfirmModal from '../../components/confirmModal';
import axios from '../../config/axiosConfig';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminIctsPage() {
  const [icts, setIcts] = useState([]);
  const [filteredIcts, setFilteredIcts] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedIct, setSelectedIct] = useState(null);
  const [modalType, setModalType] = useState('create'); // "create" ou "edit"

  useEffect(() => {
    async function fetchIcts() {
      try {
        const response = await axios.get('/icts');
        const sortedIcts = response.data.sort((a, b) =>
          a.nome.localeCompare(b.nome)
        );
        setIcts(sortedIcts);
        setFilteredIcts(sortedIcts);
      } catch (error) {
        console.error('Erro ao buscar icts:', error);
        toast.error('Erro ao carregar as icts.');
      }
    }

    fetchIcts();
  }, []);

  useEffect(() => {
    const filtered = icts.filter((ict) =>
      ict.nome.toLowerCase().includes(searchName.toLowerCase())
    );
    setFilteredIcts(filtered);
  }, [searchName, icts]);

  const handleAddIct = async (formData) => {
    try {
      let response;
      if (modalType === 'create') {
        response = await axios.post('/icts', formData);
      } else {
        response = await axios.put(`/icts/${selectedIct.id}`, formData);
      }
      const newIcts = [...icts.filter((e) => e.id !== response.data.id), response.data].sort(
        (a, b) => a.nome.localeCompare(b.nome)
      );
      setIcts(newIcts);
      setFilteredIcts(newIcts);
      toast.success(
        modalType === 'create' ? 'Ict cadastrada com sucesso!' : 'Ict atualizada com sucesso!'
      );
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao salvar ict:', error);
      toast.error('Erro ao salvar a ict.');
    }
  };

  const handleDelete = (ict) => {
    setSelectedIct(ict);
    setConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/icts/${selectedIct.id}`);
      const newIcts = icts.filter((e) => e.id !== selectedIct.id);
      setIcts(newIcts);
      setFilteredIcts(newIcts);
      toast.success('Ict excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir ict:', error);
      toast.error('Erro ao excluir a ict.');
    } finally {
      setConfirmModal(false);
      setSelectedIct(null);
    }
  };

  const handleEdit = (ict) => {
    setSelectedIct(ict);
    setModalType('edit');
    setShowModal(true);
  };

  const handleCreate = () => {
    setSelectedIct(null); // Limpa a ict selecionada
    setModalType('create'); // Define o tipo para criação
    setShowModal(true); // Abre o modal
  };

  return (
    <AdminLayout>
      <div className="container mt-4">
        <h1>Icts</h1>

        {/* Filtros */}
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Pesquisar por nome"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
        </div>

        {/* Botão de Nova Ict */}
            <button className="btn btn-success mb-3" onClick={handleCreate}>
              + NOVA ICT
            </button>
  

        {/* Lista de Icts */}
        <div className="row">
          {filteredIcts.length > 0 ? (
            filteredIcts.map((ict) => (
              <div className="col-md-4 d-flex align-items-stretch" key={ict.id}>
                <IctCard
                  nome={ict.nome}
                  email={ict.email}
                  endereco={ict.endereco}
                  foto_perfil={ict.foto_perfil || '/default-profile.png'}
                  cnpj={ict.cnpj}
                  onEdit={() => handleEdit(ict)}
                  onDelete={() => handleDelete(ict)}
                  onViewColaboradores={() => console.log('Ver Responsáveis:', ict)}
                />
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>Nenhuma ict encontrada.</p>
            </div>
          )}
        </div>

        {(showModal || confirmModal) && <div className="modal-backdrop"></div>}

        {showModal && (
          <FormularioCadastroIct
            onSubmit={handleAddIct}
            onClose={() => setShowModal(false)}
            ict={modalType === 'edit' ? selectedIct : null}
          />
        )}

        {confirmModal && (
          <ConfirmModal
            show={confirmModal}
            onClose={() => setConfirmModal(false)}
            onConfirm={confirmDelete}
            message={`Tem certeza que deseja excluir ${selectedIct?.nome}?`}
          />
        )}

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </AdminLayout>
  );
}

export default AdminIctsPage;
