import React, { useEffect, useState } from "react";
import axios from "../../config/axiosConfig";
import OfertaCard from "../../components/cards/ofertaCard";
import PropostaModal from "../../components/propostaModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IctLayout from "../../layouts/ictLayout";

function IctOfertaPage() {
  const [projetos, setProjetos] = useState([]);
  const [interesses, setInteresses] = useState([]); // IDs dos projetos com interesse enviado
  const [selectedProjeto, setSelectedProjeto] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [projetosResponse, interessesResponse] = await Promise.all([
          axios.get("/projetos"),
          axios.get("/interesses"), // Garante que apenas interesses do ICT sejam retornados
        ]);
  
        setProjetos(projetosResponse.data);
  
        // Extrai os IDs dos projetos que já possuem interesses enviados
        const interessesEnviados = interessesResponse.data.map(
          (interesse) => interesse.projeto.id
        );
  
        setInteresses(interessesEnviados);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        toast.error("Erro ao carregar os dados.");
      }
    }
  
    fetchData();
  }, []);
  

  const handleTenhoInteresse = (projeto) => {
    setSelectedProjeto(projeto);
    setShowModal(true);
  };

  const handleEnviarProposta = async (proposta) => {
    try {
      await axios.post("/interesses", {
        projeto_id: selectedProjeto.id,
        proposta,
      });
      setInteresses((prev) => [...prev, selectedProjeto.id]);
      toast.success("Proposta enviada com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar proposta:", error);
      toast.error("Erro ao enviar proposta.");
    } finally {
      setShowModal(false);
      setSelectedProjeto(null);
    }
  };

  return (
    <IctLayout>
      <div className="container mt-4">
        <h1>Projetos Disponíveis</h1>
        <div className="row">
          {projetos.length > 0 ? (
            projetos.map((projeto) => (
              <div className="col-12 col-md-6" key={projeto.id}>
                <OfertaCard
                  projeto={projeto}
                  onTenhoInteresse={handleTenhoInteresse}
                  interesseEnviado={interesses.includes(projeto.id)}
                />
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>Nenhum projeto disponível no momento.</p>
            </div>
          )}
        </div>
        {(showModal) && <div className="modal-backdrop"></div>}
        <PropostaModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleEnviarProposta}
        />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </IctLayout>
  );
}

export default IctOfertaPage;
