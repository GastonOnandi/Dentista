import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';

import DashboardPage from './pages/DashboardPage';
import CalendarPage from './pages/CalendarPage';
import PatientsPage from './pages/PatientsPage';
import ReportsPage from './pages/ReportsPage';
import RegisterPatientPage from './pages/RegisterPatientPage';
import RegisterAppointmentPage from './pages/RegisterAppointmentPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* DASHBOARD → sidebar, sin header */}
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        {/* APP NORMAL → header, sin sidebar */}
        <Route element={<MainLayout />}>
          <Route path="/calendario" element={<CalendarPage />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Route>

        {/* Pantallas especiales (sin layout) */}
        <Route path="/patients/register" element={<RegisterPatientPage />} />
        <Route path="/appointments/register" element={<RegisterAppointmentPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;