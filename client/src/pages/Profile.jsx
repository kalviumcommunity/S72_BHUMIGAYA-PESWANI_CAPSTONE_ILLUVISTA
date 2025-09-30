import React from "react";
import { me } from "../services/auth";

function Profile() {
  const [user, setUser] = React.useState(null);
  const [status, setStatus] = React.useState("");

  const loadProfile = async () => {
    setStatus("Loading profile...");
    try {
      const data = await me();
      setUser(data);
      setStatus("Loaded.");
    } catch (err) {
      setStatus(err.message || "Failed to load profile");
    }
  };

  React.useEffect(() => {
    loadProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        {status && <p className="mt-3 text-sm text-gray-700">{status}</p>}
        {user && (
          <pre className="mt-4 bg-gray-100 p-3 rounded text-sm overflow-auto">{JSON.stringify(user, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}

export default Profile; 