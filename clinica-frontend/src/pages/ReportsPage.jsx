import React, { useEffect, useState, useCallback } from "react";
import { Download, Printer } from "lucide-react";
import FilterSection from "../components/FilterSection";
import ReportsTable from "../components/ReportsTable";
import PaymentModal from "../components/modal/PaymentModal";

const BASE_URL = "http://localhost:8080/api/clientetratamiento";

const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    idCliente: "",
    fechaInicio: "",
    fechaFin: "",
    soloPendientes: true,
  });

  const fetchData = useCallback(async (url) => {
    console.log("GET →", url);
    setLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      if (!Array.isArray(data)) {
        setReports([]);
        return;
      }

      setReports(data);
    } catch (err) {
      console.error("Error cargando reportes:", err);
      setReports([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const cargarPendientes = useCallback(() => {
    fetchData(`${BASE_URL}/deudas/pendientes`);
  }, [fetchData]);

  const cargarTodas = useCallback(() => {
    fetchData(`${BASE_URL}/deudas`);
  }, [fetchData]);

  const handleFilterChange = useCallback((filters) => {
    setActiveFilters(filters);

    if (filters.idCliente) {
      fetchData(`${BASE_URL}/cliente/${filters.idCliente}`);
      return;
    }

    if (filters.fechaInicio && filters.fechaFin) {
      fetchData(
        `${BASE_URL}/fechas?inicio=${filters.fechaInicio}&fin=${filters.fechaFin}`
      );
      return;
    }

    if (filters.soloPendientes) {
      cargarPendientes();
      return;
    }

    cargarTodas();
  }, [fetchData, cargarPendientes, cargarTodas]);

  useEffect(() => {
    cargarPendientes();
  }, [cargarPendientes]);

  const handlePaymentSuccess = useCallback(() => {
    setPaymentData(null);
    handleFilterChange(activeFilters);
  }, [activeFilters, handleFilterChange]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-8 py-8">

        {paymentData && (
          <PaymentModal
            data={paymentData}
            onClose={() => setPaymentData(null)}
            onSuccess={handlePaymentSuccess}
          />
        )}

        <div className="flex justify-between mb-6">
          <h1 className="text-4xl font-bold">Reportes</h1>
          <div className="flex gap-3">
            <button className="px-4 py-2 border rounded hover:bg-gray-100 transition-colors">
              <Printer size={16} />
            </button>
            <button className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition-colors">
              <Download size={16} />
            </button>
          </div>
        </div>

        <FilterSection onFilterChange={handleFilterChange} />

        <ReportsTable
          data={reports}
          loading={loading}
          onPaymentClick={setPaymentData}
        />
      </div>
    </div>
  );
};

export default ReportsPage;