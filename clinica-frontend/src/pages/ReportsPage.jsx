import React, { useState, useEffect } from 'react';
import { Download, Printer } from 'lucide-react';
import FilterSection from '../components/FilterSection';
import ReportsTable from '../components/ReportsTable';
import PaymentModal from '../components/modal/PaymentModal';

const ReportsPage = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [reports, setReports] = useState([]); 
  const [loading, setLoading] = useState(false);

  // === CARGAR TODAS LAS DEUDAS ===
  useEffect(() => {
    fetchAllReports();
  }, []);

  const fetchAllReports = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/clientetratamiento/deudas/pendientes");
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error("Error obteniendo todas las deudas:", error);
    } finally {
      setLoading(false);
    }
  };

  // === FILTRO FECHAS ===
  const handleFilterChange = async (filters) => {
    console.log("Filtros recibidos:", filters);

    if (!filters.startDate || !filters.endDate) {
      fetchAllReports();
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/clientetratamiento/fechas", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inicio: filters.startDate,
          fin: filters.endDate,
        })
      });

      const data = await response.json();
      setReports(data);

    } catch (error) {
      console.error("Error filtrando por rango:", error);
    } finally {
      setLoading(false);
    }
  };

  // === FILTRO ESTADO ===
  const handlePaymentStatusChange = async (status) => {
    if (!status || status === "todos") {
      fetchAllReports();
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8080/api/clientetratamiento/deudas/estado/${status}`,
        { method: "GET" }
      );

      const data = await response.json();
      setReports(data);

    } catch (error) {
      console.error("Error filtrando por estado de pago:", error);
    } finally {
      setLoading(false);
    }
  };

  // === FILTRO TRATAMIENTO ===
  const handleTreatmentChange = async (treatment) => {
    if (!treatment || treatment === "todos") {
      fetchAllReports();
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/clientetratamiento/tratamiento/${treatment}`,
        { method: "GET" }
      );

      const data = await response.json();
      setReports(data);

    } catch (error) {
      console.error("Error filtrando por tratamiento:", error);
    } finally {
      setLoading(false);
    }
  };

  // === ESTA FUNCIÓN TE FALTABA ===
  const handlePaymentClick = (rowData) => {
    console.log("Abrir modal con:", rowData);
    setPaymentData(rowData); // guardás datos del tratamiento seleccionado
  };

  // === Cerrar modal ===
  const handleCloseModal = () => {
    setPaymentData(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-8 py-8">

        {/* === Payment Modal === */}
        {paymentData && (
          <PaymentModal 
            data={paymentData}
            onClose={handleCloseModal}
          />
        )}

        {/* === Header === */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Reports</h1>
            <p className="text-gray-600">Filter and view various reports.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
              <Download className="w-4 h-4" />
              Export to CSV
            </button>
          </div>
        </div>

        {/* === Filters === */}
        <FilterSection onFilterChange={handleFilterChange} />

        {/* === Table === */}
        {/* ACÁ LE PASÁS LOS DATOS + LA FUNCIÓN */}
        <ReportsTable 
          data={reports} 
          loading={loading}
          onPaymentClick={handlePaymentClick}
        />

      </div>
    </div>
  );
};

export default ReportsPage;
