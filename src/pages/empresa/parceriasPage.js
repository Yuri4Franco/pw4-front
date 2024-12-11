import React, { useEffect, useState } from "react";
import axios from "../../config/axiosConfig";
import EmpresaLayout from "../../layouts/empresaLayout";
import ParceriaCard from "../../components/cards/parceriaCard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ParceriasPage() {
  const [contratos, setContratos] = useState([]);

  useEffect(() => {
    // Carrega os contratos
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
    <EmpresaLayout>
      <div className="container mt-4">
        <h1>Parcerias</h1>
        <div className="row">
          {contratos.length > 0 ? (
            contratos.map((contrato) => (
              <div className="col-md-6" key={contrato.id}>
                <ParceriaCard contrato={contrato} />
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>Nenhuma parceria encontrada.</p>
            </div>
          )}
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </EmpresaLayout>
  );
}

export default ParceriasPage;
