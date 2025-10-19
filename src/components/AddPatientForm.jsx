import { useState } from "react";

export default function AddPatientForm({ API_BASE, fetchPatients }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [disease, setDisease] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const patient = { name, age: parseInt(age), disease };

    const res = await fetch(`${API_BASE}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patient),
    });

    setLoading(false);

    if (res.ok) {
      // alert("✅ Patient added successfully!");
      setName("");
      setAge("");
      setDisease("");
      fetchPatients();
    } else {
      const data = await res.json();
      alert(`❌ ${data.detail}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-gradient-to-r from-blue-50 to-white p-6 rounded-2xl shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
        Add New Patient
      </h2>
      <input
        type="text"
        placeholder="Patient Name"
        className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Age"
        className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Disease"
        className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
        value={disease}
        onChange={(e) => setDisease(e.target.value)}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className={`bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-xl font-bold hover:from-blue-700 hover:to-blue-600 transition-all shadow-md ${
          loading && "opacity-50 cursor-not-allowed"
        }`}
      >
        {loading ? "Adding..." : "Add Patient"}
      </button>
    </form>
  );
}
