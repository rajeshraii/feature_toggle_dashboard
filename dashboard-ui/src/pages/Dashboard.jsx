import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [environments, setEnvironments] = useState([]);
  const [features, setFeatures] = useState([]);
  const [selectedEnv, setSelectedEnv] = useState(null);
  const [newEnv, setNewEnv] = useState("");
  const [newFeature, setNewFeature] = useState({
    name: "",
    description: "",
    enabled: false,
    rolloutPercentage: 100,
    environmentId: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEnvironments();
  }, []);

  useEffect(() => {
    if (selectedEnv) fetchFeatures(selectedEnv);
  }, [selectedEnv]);

  const fetchEnvironments = async () => {
    const res = await api.get("/environments");
    setEnvironments(res.data);
    if (res.data.length > 0) {
      setSelectedEnv(res.data[0].id);
      setNewFeature((f) => ({ ...f, environmentId: res.data[0].id }));
    }
  };

  const fetchFeatures = async (envId) => {
    const res = await api.get(`/features/env/${envId}`);
    setFeatures(res.data);
  };

  const createEnvironment = async () => {
    if (!newEnv.trim()) return;
    await api.post("/environments", { name: newEnv });
    setNewEnv("");
    fetchEnvironments();
  };

  const createFeature = async () => {
    if (!newFeature.name.trim()) return;
    setLoading(true);
    await api.post("/features", newFeature);
    setNewFeature({ name: "", description: "", enabled: false, rolloutPercentage: 100, environmentId: selectedEnv });
    fetchFeatures(selectedEnv);
    setLoading(false);
  };

  const toggleFeature = async (id) => {
    await api.patch(`/features/${id}/toggle`);
    fetchFeatures(selectedEnv);
  };

  const deleteFeature = async (id) => {
    await api.delete(`/features/${id}`);
    fetchFeatures(selectedEnv);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Feature Toggle Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600 text-sm">{user?.email}</span>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-sm">
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Environments Panel */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Environments</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="New environment"
              className="border rounded px-3 py-1 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newEnv}
              onChange={(e) => setNewEnv(e.target.value)}
            />
            <button onClick={createEnvironment} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
              Add
            </button>
          </div>
          <ul className="space-y-2">
            {environments.map((env) => (
              <li
                key={env.id}
                onClick={() => {
                  setSelectedEnv(env.id);
                  setNewFeature((f) => ({ ...f, environmentId: env.id }));
                }}
                className={`px-3 py-2 rounded cursor-pointer text-sm font-medium ${
                  selectedEnv === env.id ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {env.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Features Panel */}
        <div className="md:col-span-2 bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Features</h2>

          {/* Add Feature Form */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <input
              type="text"
              placeholder="Feature name"
              className="border rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newFeature.name}
              onChange={(e) => setNewFeature({ ...newFeature, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              className="border rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newFeature.description}
              onChange={(e) => setNewFeature({ ...newFeature, description: e.target.value })}
            />
            <input
              type="number"
              placeholder="Rollout % (0-100)"
              min="0"
              max="100"
              className="border rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newFeature.rolloutPercentage}
              onChange={(e) => setNewFeature({ ...newFeature, rolloutPercentage: parseInt(e.target.value) })}
            />
            <button
              onClick={createFeature}
              disabled={loading}
              className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Feature"}
            </button>
          </div>

          {/* Feature List */}
          <div className="space-y-3">
            {features.length === 0 && (
              <p className="text-gray-400 text-sm text-center py-4">No features yet. Add one above!</p>
            )}
            {features.map((feature) => (
              <div key={feature.id} className="border rounded-lg p-3 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">{feature.name}</p>
                  <p className="text-xs text-gray-500">{feature.description}</p>
                  <p className="text-xs text-gray-400 mt-1">Rollout: {feature.rolloutPercentage}%</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleFeature(feature.id)}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      feature.enabled ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {feature.enabled ? "ON" : "OFF"}
                  </button>
                  <button
                    onClick={() => deleteFeature(feature.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}