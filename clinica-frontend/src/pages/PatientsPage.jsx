import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientList from '../components/PatientList';
import PatientDetails from '../components/PatientDetails';

const PatientsPage = () => {
  const navigate = useNavigate();

  const [patients] = useState([
    {
      id: '12345',
      name: 'John Doe',
      lastVisit: '12/03/2024',
      address: '123 Main St, Anytown, USA 12345',
      phone: '(555) 123-4567',
      email: 'john.doe@example.com',
      emergency: 'Jane Doe - (555) 987-6543',
      avatar: null
    },
    {
      id: '67890',
      name: 'Jane Smith',
      lastVisit: '11/28/2024',
      address: '456 Oak Ave, Somewhere, USA 67890',
      phone: '(555) 234-5678',
      email: 'jane.smith@example.com',
      emergency: 'John Smith - (555) 876-5432',
      avatar: null
    },
    {
      id: '11223',
      name: 'Robert Johnson',
      lastVisit: '12/01/2024',
      address: '789 Pine Rd, Elsewhere, USA 11223',
      phone: '(555) 345-6789',
      email: 'robert.j@example.com',
      emergency: 'Mary Johnson - (555) 765-4321',
      avatar: null
    }
  ]);

  const [activePatient, setActivePatient] = useState(patients[0]);

  return (
    <div className="flex h-full">
      <PatientList
        patients={patients}
        activePatient={activePatient}
        onSelectPatient={setActivePatient}
        onAddPatient={() => navigate('/patients/register')}
      />
      <PatientDetails patient={activePatient} />
    </div>
  );
};

export default PatientsPage;
