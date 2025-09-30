import React from "react";

function Protected() {
  const [result, setResult] = React.useState(null);
  const [status, setStatus] = React.useState("");

  const callProtected = async () => {
    setStatus("Calling protected endpoint...");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/protected/ping", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Request failed");
      setResult(data);
      setStatus("Success.");
    } catch (err) {
      setStatus(err.message || "Failed");
    }
  };

  React.useEffect(() => {
    callProtected();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900">Protected Page</h1>
        <p className="text-gray-600">This page calls a JWT-protected API.</p>
        {status && <p className="mt-3 text-sm text-gray-700">{status}</p>}
        {result && (
          <pre className="mt-4 bg-gray-100 p-3 rounded text-sm overflow-auto">{JSON.stringify(result, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}

export default Protected; 