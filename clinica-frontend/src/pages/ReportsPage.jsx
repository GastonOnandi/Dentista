import React, { useState, useEffect } from "react";
import { Download, Printer } from "lucide-react";
import FilterSection from "../components/FilterSection";
import ReportsTable from "../components/ReportsTable";
import PaymentModal from "../components/modal/PaymentModal";

const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8080/api/clientetratamiento/deudas/pendientes"
      );
      const data = await response.json();
      setReports(data);
    } catch (err) {
      console.error("Error cargando reportes:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentClick = (rowData) => {
    setPaymentData(rowData);
  };

  const handleCloseModal = () => {
    setPaymentData(null);
  };

  const handlePaymentSuccess = () => {
    setPaymentData(null);
    fetchReports(); // 🔁 refresca tabla
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-8 py-8">

        {paymentData && (
          <PaymentModal
            data={paymentData}
            onClose={handleCloseModal}
            onSuccess={handlePaymentSuccess}
          />
        )}

        <div className="flex justify-between mb-6">
          <h1 className="text-4xl font-bold">Reportes</h1>
          <div className="flex gap-3">
            <button className="px-4 py-2 border rounded">
              <Printer size={16} />
            </button>
            <button className="px-4 py-2 bg-cyan-500 text-white rounded">
              <Download size={16} />
            </button>
          </div>
        </div>

        <FilterSection />

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
