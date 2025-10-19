// import { useEffect, useState } from "react";
// import AddPatientForm from "./components/AddPatientForm";
// import PatientList from "./components/PatientList";

// export default function App() {
//   const [patients, setPatients] = useState([]);

//   const API_BASE = "https://personalized-text-to-handwriting.onrender.com"; // Replace with your backend URL

//   const fetchPatients = async () => {
//     try {
//       const res = await fetch(`${API_BASE}/view`);
//       const data = await res.json();
//       setPatients(data);
//     } catch (error) {
//       console.error("Error fetching patients:", error);
//     }
//   };

//   useEffect(() => {
//     fetchPatients();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-10">
//       <h1 className="text-5xl font-extrabold text-center text-blue-700 mb-10 drop-shadow-lg">
//         🏥 Hospital Management System
//       </h1>

//       <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-xl border-t-4 border-blue-500">
//         <AddPatientForm API_BASE={API_BASE} fetchPatients={fetchPatients} />
//       </div>

//       <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         <PatientList
//           patients={patients}
//           API_BASE={API_BASE}
//           fetchPatients={fetchPatients}
//         />
//       </div>
//     </div>
//   );
// }

// ...existing code...
import { useEffect, useState } from "react";
import AddPatientForm from "./components/AddPatientForm";
import PatientList from "./components/PatientList";

export default function App() {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE = "https://personalized-text-to-handwriting.onrender.com"; // Replace with your backend URL

  // fetchPatients accepts an optional AbortSignal so callers (including useEffect) can cancel.
  const fetchPatients = async (signal) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/view`, { signal });

      if (!res.ok) {
        const text = await res.text().catch(() => res.statusText || `Status ${res.status}`);
        throw new Error(text || `Request failed with status ${res.status}`);
      }

      const data = await res.json();
      setPatients(data);
      return data;
    } catch (err) {
      // Ignore abort errors — they are expected on cleanup.
      if (err.name === "AbortError") {
        console.log("fetchPatients aborted");
        return;
      }
      console.error("Error fetching patients:", err);
      setError(err?.message || "Failed to fetch patients");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchPatients(controller.signal);

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-10">
      <h1 className="text-5xl font-extrabold text-center text-blue-700 mb-10 drop-shadow-lg">
        🏥 Hospital Management System
      </h1>

      {error && (
        <div className="max-w-3xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg">
          {error}
        </div>
      )}

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-xl border-t-4 border-blue-500 relative">
        <AddPatientForm API_BASE={API_BASE} fetchPatients={fetchPatients} />
      </div>

      <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PatientList
          patients={patients}
          API_BASE={API_BASE}
          fetchPatients={fetchPatients}
        />
      </div>

      {/* Global loading overlay while fetching patients */}
      {isLoading && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-white/60 z-50"
          role="status"
          aria-live="polite"
        >
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
            <span className="mt-2 text-sm text-gray-700">
              Loading patients — waiting for backend…
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
// ...existing code...