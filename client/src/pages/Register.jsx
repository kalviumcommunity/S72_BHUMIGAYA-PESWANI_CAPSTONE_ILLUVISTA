import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { register as registerApi } from "../services/auth";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [status, setStatus] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Creating account...");
    try {
      const res = await registerApi({ name, email, password });
      localStorage.setItem("token", res.token);
      setStatus("Success.");
      navigate("/");
    } catch (err) {
      setStatus(err.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900">Register</h1>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border rounded px-3 py-2"
          />
          <button type="submit" className="w-full bg-blue-600 text-white rounded py-2">Create Account</button>
        </form>
        {status && <p className="mt-3 text-sm text-gray-700">{status}</p>}
        <p className="mt-4 text-sm">
          Have an account? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register; 