import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';

import DashboardPage from './pages/DashboardPage';
import CalendarPage from './pages/CalendarPage';
import PatientsPage from './pages/PatientsPage';
import PatientDetailPage from './pages/PatientDetailPage';
import ReportsPage from './pages/ReportsPage';
import RegisterPatientPage from './pages/RegisterPatientPage';
import RegisterAppointmentPage from './pages/RegisterAppointmentPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* DASHBOARD → sidebar del dashboard, sin header */}
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        {/* APP NORMAL → header, sin sidebar del dashboard */}
        <Route element={<MainLayout />}>
          <Route path="/calendario" element={<CalendarPage />} />
          <Route path="/patients" element={<PatientsPage />} />
          
          {/* IMPORTANTE: Las rutas específicas van ANTES de las dinámicas */}
          <Route path="/patients/register" element={<RegisterPatientPage />} />
          <Route path="/patients/:idCliente" element={<PatientDetailPage />} />
          
          <Route path="/reports" element={<ReportsPage />} />
          
          {/* Appointments register también dentro del layout */}
          <Route path="/appointments/register" element={<RegisterAppointmentPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;