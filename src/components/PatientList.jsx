import PatientCard from "./PatientCard";

export default function PatientList({ patients, API_BASE, fetchPatients }) {
  if (patients.length === 0)
    return (
      <p className="text-center text-gray-500 text-xl mt-6">
        No patients found. Add a new patient above.
      </p>
    );

  return (
    <>
      {patients.map((patient) => (
        <PatientCard
          key={patient.name}
          patient={patient}
          API_BASE={API_BASE}
          fetchPatients={fetchPatients}
        />
      ))}
    </>
  );
}
