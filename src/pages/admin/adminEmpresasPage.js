import React, { useEffect, useState } from 'react';
import EmpresaCard from '../../components/cards/empresa/empresaCard';
import AdminLayout from '../../layouts/adminLayout';
import FormularioCadastroEmpresa from '../../components/forms/criarEmpresa';
import ConfirmModal from '../../components/confirmModal';
import axios from '../../config/axiosConfig';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminEmpresasPage() {
  const [empresas, setEmpresas] = useState([]);
  const [filteredEmpresas, setFilteredEmpresas] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);
  const [modalType, setModalType] = useState('create'); // "create" ou "edit"

  useEffect(() => {
    async function fetchEmpresas() {
      try {
        const response = await axios.get('/empresas');
        const sortedEmpresas = response.data.sort((a, b) =>
          a.nome.localeCompare(b.nome)
        );
        setEmpresas(sortedEmpresas);
        setFilteredEmpresas(sortedEmpresas);
      } catch (error) {
        console.error('Erro ao buscar empresas:', error);
        toast.error('Erro ao carregar as empresas.');
      }
    }

    fetchEmpresas();
  }, []);

  useEffect(() => {
    const filtered = empresas.filter((empresa) =>
      empresa.nome.toLowerCase().includes(searchName.toLowerCase())
    );
    setFilteredEmpresas(filtered);
  }, [searchName, empresas]);

  const handleAddEmpresa = async (formData) => {
    try {
      let response;
      if (modalType === 'create') {
        response = await axios.post('/empresas', formData);
      } else {
        response = await axios.put(`/empresas/${selectedEmpresa.id}`, formData);
      }
      const newEmpresas = [...empresas.filter((e) => e.id !== response.data.id), response.data].sort(
        (a, b) => a.nome.localeCompare(b.nome)
      );
      setEmpresas(newEmpresas);
      setFilteredEmpresas(newEmpresas);
      toast.success(
        modalType === 'create' ? 'Empresa cadastrada com sucesso!' : 'Empresa atualizada com sucesso!'
      );
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao salvar empresa:', error);
      toast.error('Erro ao salvar a empresa.');
    }
  };

  const handleDelete = (empresa) => {
    setSelectedEmpresa(empresa);
    setConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/empresas/${selectedEmpresa.id}`);
      const newEmpresas = empresas.filter((e) => e.id !== selectedEmpresa.id);
      setEmpresas(newEmpresas);
      setFilteredEmpresas(newEmpresas);
      toast.success('Empresa excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir empresa:', error);
      toast.error('Erro ao excluir a empresa.');
    } finally {
      setConfirmModal(false);
      setSelectedEmpresa(null);
    }
  };

  const handleEdit = (empresa) => {
    setSelectedEmpresa(empresa);
    setModalType('edit');
    setShowModal(true);
  };

  const handleCreate = () => {
    setSelectedEmpresa(null); // Limpa a empresa selecionada
    setModalType('create'); // Define o tipo para criação
    setShowModal(true); // Abre o modal
  };

  return (
    <AdminLayout>
      <div className="container mt-4">
        <h1>Empresas</h1>

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

        {/* Botão de Nova Empresa */}
            <button className="btn btn-success mb-3" onClick={handleCreate}>
              + NOVA EMPRESA
            </button>
  

        {/* Lista de Empresas */}
        <div className="row">
          {filteredEmpresas.length > 0 ? (
            filteredEmpresas.map((empresa) => (
              <div className="col-md-4 d-flex align-items-stretch" key={empresa.id}>
                <EmpresaCard
                  nome={empresa.nome}
                  email={empresa.email}
                  endereco={empresa.endereco}
                  foto_perfil={empresa.foto_perfil || '/default-profile.png'}
                  cnpj={empresa.cnpj}
                  onEdit={() => handleEdit(empresa)}
                  onDelete={() => handleDelete(empresa)}
                  onViewColaboradores={() => console.log('Ver Responsáveis:', empresa)}
                />
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>Nenhuma empresa encontrada.</p>
            </div>
          )}
        </div>

        {(showModal || confirmModal) && <div className="modal-backdrop"></div>}

        {showModal && (
          <FormularioCadastroEmpresa
            onSubmit={handleAddEmpresa}
            onClose={() => setShowModal(false)}
            empresa={modalType === 'edit' ? selectedEmpresa : null}
          />
        )}

        {confirmModal && (
          <ConfirmModal
            show={confirmModal}
            onClose={() => setConfirmModal(false)}
            onConfirm={confirmDelete}
            message={`Tem certeza que deseja excluir ${selectedEmpresa?.nome}?`}
          />
        )}

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </AdminLayout>
  );
}

export default AdminEmpresasPage;
