import { useState } from "react";

export default function PatientCard({ patient, API_BASE, fetchPatients }) {
  const [editing, setEditing] = useState(false);
  const [edited, setEdited] = useState({ ...patient });

  const handleDelete = async () => {
    // if (!window.confirm(`Delete ${patient.name}?`)) return;
    await fetch(`${API_BASE}/delete/${patient.name}`, { method: "DELETE" });
    fetchPatients();
  };

  const handleSave = async () => {
    await fetch(`${API_BASE}/update/${patient.name}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(edited),
    });
    setEditing(false);
    fetchPatients();
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg border-t-4 border-blue-400">
      {editing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={edited.name}
            onChange={(e) => setEdited({ ...edited, name: e.target.value })}
            className="border p-2 rounded-xl w-full focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="number"
            value={edited.age}
            onChange={(e) =>
              setEdited({ ...edited, age: parseInt(e.target.value) })
            }
            className="border p-2 rounded-xl w-full focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="text"
            value={edited.disease}
            onChange={(e) => setEdited({ ...edited, disease: e.target.value })}
            className="border p-2 rounded-xl w-full focus:ring-2 focus:ring-blue-300"
          />
          <div className="flex justify-end gap-3">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-600 transition-all"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded-xl font-semibold hover:bg-gray-500 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-blue-600">{patient.name}</h2>
          <p className="text-gray-700 mt-1">Age: {patient.age}</p>
          <p className="text-gray-700">Disease: {patient.disease}</p>
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => setEditing(true)}
              className="bg-yellow-400 text-white px-4 py-2 rounded-xl font-semibold hover:bg-yellow-500 transition-all"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-red-600 transition-all"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
