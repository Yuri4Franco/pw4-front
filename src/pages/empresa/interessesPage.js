import React, { useEffect, useState } from "react";
import axios from "../../config/axiosConfig";
import InteresseCard from "../../components/cards/interesseCard";
import ConfirmModal from "../../components/confirmModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmpresaLayout from "../../layouts/empresaLayout";

function InteressesPage() {
    const [interesses, setInteresses] = useState([]);
    const [confirmModal, setConfirmModal] = useState(false);
    const [selectedInteresse, setSelectedInteresse] = useState(null);

    useEffect(() => {
        async function fetchInteresses() {
            try {
                const response = await axios.get("/interesses");
                setInteresses(response.data);
            } catch (error) {
                console.error("Erro ao carregar interesses:", error);
                toast.error("Erro ao carregar interesses.");
            }
        }

        fetchInteresses();
    }, []);

    const handleApprove = async (interesseId) => {
        try {
            await axios.post("/contratos", { interesse_id: interesseId });
            toast.success("Interesse aprovado e contrato criado!");

            // Atualiza a lista de interesses
            setInteresses(interesses.filter((i) => i.id !== interesseId));
        } catch (error) {
            console.error("Erro ao aprovar interesse:", error);
            toast.error("Erro ao aprovar interesse.");
        }
    };

    const handleReject = async () => {
        try {
            await axios.delete(`/interesses/${selectedInteresse.id}`);
            toast.success("Interesse rejeitado!");
            setInteresses(interesses.filter((i) => i.id !== selectedInteresse.id));
        } catch (error) {
            console.error("Erro ao rejeitar interesse:", error);
            toast.error("Erro ao rejeitar interesse.");
        } finally {
            setConfirmModal(false);
            setSelectedInteresse(null);
        }
    };

    return (
        <EmpresaLayout>
            <div className="container mt-4">
                <h1>Interesses</h1>

                {interesses.length === 0 ? (
                    <p className="text-center text-muted mt-4">
                        Ainda não há interesses nos projetos da sua empresa.
                    </p>
                ) : (
                    <div className="row">
                        {interesses.map((interesse) => (
                            <div className="col-md-6" key={interesse.id}>
                                <InteresseCard
                                    interesse={interesse}
                                    onApprove={handleApprove}
                                    onReject={() => {
                                        setSelectedInteresse(interesse);
                                        setConfirmModal(true);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                )}
                
                {confirmModal && (
                    <ConfirmModal
                        show={confirmModal}
                        onClose={() => setConfirmModal(false)}
                        onConfirm={handleReject}
                        message={`Tem certeza que deseja rejeitar o interesse de ${selectedInteresse?.responsavel?.nome}?`}
                    />
                )}

                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        </EmpresaLayout>
    );
}

export default InteressesPage;
