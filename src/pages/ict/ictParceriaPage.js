import React, { useEffect, useState } from "react";
import axios from "../../config/axiosConfig";
import IctParceriaCard from "../../components/cards/ictParceriaCard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IctLayout from "../../layouts/ictLayout";

function IctParceriasPage() {
    const [contratos, setContratos] = useState([]);

    useEffect(() => {
        async function fetchContratos() {
            try {
                const response = await axios.get("/contratos");
                setContratos(response.data);
            } catch (error) {
                console.error("Erro ao carregar contratos:", error);
                toast.error("Erro ao carregar os contratos.");
            }
        }

        fetchContratos();
    }, []);

    return (
        <IctLayout>
            <div className="container mt-4">
                <h1>Parcerias Ativas</h1>
                <div className="row">
                    {contratos.length > 0 ? (
                        contratos.map((contrato) => (
                            <div className="col-12 col-md-6" key={contrato.id}>
                                <IctParceriaCard contrato={contrato} />
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center">
                            <p>Nenhuma parceria ativa no momento.</p>
                        </div>
                    )}
                </div>
                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        </IctLayout>
    );
}

export default IctParceriasPage;
