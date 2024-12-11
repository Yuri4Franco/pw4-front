import React, { useState, useEffect } from 'react';
import ResponsaveisTable from '../../components/tables/responsaveisTable';
import FormularioCadastroResponsaveis from '../../components/forms/cadastrarResponsaveis';
import AdminLayout from '../../layouts/adminLayout';
import axios from '../../config/axiosConfig';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmModal from '../../components/confirmModal';

function AdminResponsaveisPage() {
  const [responsaveis, setResponsaveis] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [icts, setIcts] = useState([]);
  const [filteredResponsaveis, setFilteredResponsaveis] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [filterEmpresa, setFilterEmpresa] = useState('');
  const [filterIct, setFilterIct] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedResponsavel, setSelectedResponsavel] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const responsaveisResponse = await axios.get('/responsaveis');
        const empresasResponse = await axios.get('/empresas');
        const ictsResponse = await axios.get('/icts');

        setResponsaveis(responsaveisResponse.data);
        setEmpresas(empresasResponse.data);
        setIcts(ictsResponse.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        toast.error('Erro ao carregar dados.');
      }
    }

    fetchData();
  }, []);

  // Aplica os filtros nos responsáveis
  useEffect(() => {
    let filtered = responsaveis;

    if (searchName) {
      filtered = filtered.filter((responsavel) =>
        responsavel.nome.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (filterEmpresa) {
      filtered = filtered.filter(
        (responsavel) => responsavel.empresa?.id.toString() === filterEmpresa
      );
    }

    if (filterIct) {
      filtered = filtered.filter(
        (responsavel) => responsavel.ict?.id.toString() === filterIct
      );
    }

    setFilteredResponsaveis(filtered);
  }, [searchName, filterEmpresa, filterIct, responsaveis]);

  const handleAddResponsavel = async (formData) => {
    try {
      const response = await axios.post('/responsaveis', formData);
      setResponsaveis([...responsaveis, response.data]);
      toast.success('Responsável cadastrado com sucesso!');
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao cadastrar responsável:', error);
      toast.error('Erro ao cadastrar responsável.');
    }
  };

  const handleDelete = (responsavel) => {
    setSelectedResponsavel(responsavel);
    setConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (selectedResponsavel) {
      try {
        await axios.delete(`/responsaveis/${selectedResponsavel.id}`);
        setResponsaveis(responsaveis.filter((r) => r.id !== selectedResponsavel.id));
        toast.success('Responsável excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir responsável:', error);
        toast.error('Erro ao excluir responsável.');
      } finally {
        setConfirmModal(false);
        setSelectedResponsavel(null);
      }
    }
  };

  return (
    <AdminLayout>
      <div className="container mt-4">
        <h1>Gerenciamento de Responsáveis</h1>

        {/* Filtros */}
        <div className="row mb-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Pesquisar por nome"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-control"
              value={filterEmpresa}
              onChange={(e) => setFilterEmpresa(e.target.value)}
            >
              <option value="">Filtrar por Empresa</option>
              {empresas.map((empresa) => (
                <option key={empresa.id} value={empresa.id}>
                  {empresa.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <select
              className="form-control"
              value={filterIct}
              onChange={(e) => setFilterIct(e.target.value)}
            >
              <option value="">Filtrar por ICT</option>
              {icts.map((ict) => (
                <option key={ict.id} value={ict.id}>
                  {ict.nome}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button className="btn btn-success mb-3" onClick={() => setShowModal(true)}>
          + Novo Responsável
        </button>

        <ResponsaveisTable
          responsaveis={filteredResponsaveis}
          onDelete={handleDelete}
        />

        {(showModal || confirmModal) && <div className="modal-backdrop"></div>}

        {showModal && (
          <FormularioCadastroResponsaveis
            onSubmit={handleAddResponsavel}
            onClose={() => setShowModal(false)}
            empresas={empresas}
            icts={icts}
          />
        )}

        {confirmModal && (
          <ConfirmModal
            show={confirmModal}
            onClose={() => setConfirmModal(false)}
            onConfirm={confirmDelete}
            message={`Tem certeza que deseja excluir ${selectedResponsavel?.nome}?`}
          />
        )}

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </AdminLayout>
  );
}

export default AdminResponsaveisPage;
