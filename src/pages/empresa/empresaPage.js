import React, { useEffect, useState } from "react";
import axios from "../../config/axiosConfig";
import EmpresaLayout from "../../layouts/empresaLayout";

function EmpresaPage() {
  const [dashboardData, setDashboardData] = useState({
    total_projetos: 0,
    total_interesses: 0,
    total_contratos: 0,
  });

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await axios.get("/empresa/dashboard");
        setDashboardData(response.data); // Atualiza o estado com os dados recebidos
      } catch (error) {
        console.error("Erro ao carregar os dados do dashboard:", error);
      }
    }

    fetchDashboardData();
  }, []);

  return (
    <EmpresaLayout>
      <div className="container mt-4">
        <h1 className="mb-4">Dashboard da Empresa</h1>
        <div className="row">
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">Projetos</h5>
                <p className="card-text">
                  Você possui <strong>{dashboardData.total_projetos}</strong> projetos cadastrados no sistema.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">Interesses Pendentes</h5>
                <p className="card-text">
                  Seus projetos possuem <strong>{dashboardData.total_interesses}</strong> interesses pendentes.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">Contratos</h5>
                <p className="card-text">
                  Você possui <strong>{dashboardData.total_contratos}</strong> contratos ativos relacionados aos seus projetos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EmpresaLayout>
  );
}

export default EmpresaPage;
