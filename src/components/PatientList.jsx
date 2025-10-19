import PatientCard from "./PatientCard";

export default function PatientList({
  patients,
  API_BASE,
  fetchPatients,
  isLoading, // <-- Destructure the new prop
}) {
  // If the app is in a loading state, don't show the "No patients" message.
  // The main App component is already handling the loading UI.
  if (isLoading) {
    return null; // <-- Render nothing while loading
  }

  // If loading is finished and the list is still empty, display the message card.
  if (patients.length === 0) {
    return (
      <div className="col-span-1 md:col-span-2 lg:col-span-3">
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl shadow-inner text-center">
          <p className="text-xl font-semibold text-gray-700">No Patients Found</p>
          <p className="text-gray-500 mt-2">
            Use the form above to add the first patient to the system.
          </p>
        </div>
      </div>
    );
  }

  // If patients exist, map over them and render a card for each one.
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