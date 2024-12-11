import React, { useEffect, useState } from "react";
import axios from "../../config/axiosConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmpresaLayout from "../../layouts/empresaLayout";
import FormularioProjeto from "../../components/forms/projeto";
import ConfirmModal from "../../components/confirmModal";

function ProjetosPage() {
  const [projetos, setProjetos] = useState([]);
  const [filteredProjetos, setFilteredProjetos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPrioridade, setFilterPrioridade] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [modalType, setModalType] = useState("create"); // "create" ou "edit"
  const [selectedProjeto, setSelectedProjeto] = useState(null);

  useEffect(() => {
    async function fetchProjetos() {
      try {
        const response = await axios.get("/projetos");
        const sortedProjetos = response.data.sort((a, b) =>
          a.nome.localeCompare(b.nome)
        );
        setProjetos(sortedProjetos);
        setFilteredProjetos(sortedProjetos);
      } catch (error) {
        console.error("Erro ao carregar projetos:", error);
        toast.error("Erro ao carregar os projetos.");
      }
    }

    fetchProjetos();
  }, []);

  useEffect(() => {
    let filtered = projetos;

    if (searchTerm) {
      filtered = filtered.filter(
        (projeto) =>
          projeto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          projeto.descricao.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterPrioridade) {
      filtered = filtered.filter(
        (projeto) => projeto.prioridade === filterPrioridade
      );
    }

    setFilteredProjetos(filtered);
  }, [searchTerm, filterPrioridade, projetos]);

  const handleAddProjeto = async (formData) => {
    try {
      let response;
      if (modalType === "create") {
        response = await axios.post("/projetos", formData);
      } else {
        response = await axios.put(`/projetos/${selectedProjeto.id}`, formData);
      }
      const updatedProjetos = [...projetos.filter((p) => p.id !== response.data.id), response.data].sort(
        (a, b) => a.nome.localeCompare(b.nome)
      );
      setProjetos(updatedProjetos);
      setFilteredProjetos(updatedProjetos);
      toast.success(
        modalType === "create" ? "Projeto cadastrado com sucesso!" : "Projeto atualizado com sucesso!"
      );
      setShowModal(false);
    } catch (error) {
      console.error("Erro ao salvar projeto:", error);
      toast.error("Erro ao salvar o projeto.");
    }
  };

  const handleDelete = (projeto) => {
    setSelectedProjeto(projeto);
    setConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/projetos/${selectedProjeto.id}`);
      const updatedProjetos = projetos.filter(
        (projeto) => projeto.id !== selectedProjeto.id
      );
      setProjetos(updatedProjetos);
      setFilteredProjetos(updatedProjetos);
      toast.success("Projeto excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir projeto:", error);
      toast.error("Erro ao excluir o projeto.");
    } finally {
      setConfirmModal(false);
      setSelectedProjeto(null);
    }
  };

  return (
    <EmpresaLayout>
      <div className="container mt-4">
        <h1>Projetos</h1>

        {/* Filtros */}
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Pesquisar por nome ou descrição"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <select
              className="form-control"
              value={filterPrioridade}
              onChange={(e) => setFilterPrioridade(e.target.value)}
            >
              <option value="">Filtrar por Prioridade</option>
              <option value="Alta">Alta</option>
              <option value="Média">Média</option>
              <option value="Baixa">Baixa</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-12 text-init">
            <button
              className="btn btn-success"
              onClick={() => {
                setModalType("create");
                setShowModal(true);
              }}
            >
              + Novo Projeto
            </button>
          </div>
        </div>

        {/* Tabela de Projetos */}
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Prioridade</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjetos.length > 0 ? (
                filteredProjetos.map((projeto) => (
                  <tr key={projeto.id}>
                    <td>{projeto.nome}</td>
                    <td>{projeto.descricao}</td>
                    <td>{projeto.prioridade}</td>
                    <td>{projeto.status}</td>
                    <td>
                      <button
                        className="btn btn-warning me-2"
                        onClick={() => {
                          setSelectedProjeto(projeto);
                          setModalType("edit");
                          setShowModal(true);
                        }}
                      >
                        <i className="bi bi-pencil"></i> Editar
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(projeto)}
                      >
                        <i className="bi bi-trash"></i> Excluir
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    Nenhum projeto encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modais */}
        {(showModal || confirmModal) && <div className="modal-backdrop"></div>}

        {showModal && (
          <FormularioProjeto
            onSubmit={handleAddProjeto}
            onClose={() => setShowModal(false)}
            projeto={modalType === "edit" ? selectedProjeto : null}
          />
        )}

        {confirmModal && (
          <ConfirmModal
            show={confirmModal}
            onClose={() => setConfirmModal(false)}
            onConfirm={confirmDelete}
            message={`Tem certeza que deseja excluir o projeto ${selectedProjeto?.nome}?`}
          />
        )}

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </EmpresaLayout>
  );
}

export default ProjetosPage;
