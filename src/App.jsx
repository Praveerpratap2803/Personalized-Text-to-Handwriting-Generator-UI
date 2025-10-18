import { useEffect, useState } from "react";
import AddPatientForm from "./components/AddPatientForm";
import PatientList from "./components/PatientList";

export default function App() {
  const [patients, setPatients] = useState([]);

  const API_BASE = "https://personalized-text-to-handwriting.onrender.com"; // Replace with your backend URL

  const fetchPatients = async () => {
    try {
      const res = await fetch(`${API_BASE}/view`);
      const data = await res.json();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-10">
      <h1 className="text-5xl font-extrabold text-center text-blue-700 mb-10 drop-shadow-lg">
        🏥 Hospital Management System
      </h1>

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-xl border-t-4 border-blue-500">
        <AddPatientForm API_BASE={API_BASE} fetchPatients={fetchPatients} />
      </div>

      <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PatientList
          patients={patients}
          API_BASE={API_BASE}
          fetchPatients={fetchPatients}
        />
      </div>
    </div>
  );
}
