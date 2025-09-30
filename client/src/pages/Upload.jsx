import React from "react";

function Upload() {
  const [file, setFile] = React.useState(null);
  const [status, setStatus] = React.useState("");
  const [uploaded, setUploaded] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Uploading...");
    setUploaded(null);

    if (!file) {
      setStatus("Please choose a file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "Upload failed");
      }

      setUploaded(data.file);
      setStatus("Upload successful.");
    } catch (err) {
      setStatus(err.message || "Upload failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900">Upload a File</h1>
        <p className="text-gray-600 mt-1">Select an image and submit to upload.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="block w-full text-gray-700"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Upload
          </button>
        </form>

        {status && (
          <p className="mt-4 text-sm text-gray-700">{status}</p>
        )}

        {uploaded && (
          <div className="mt-6">
            <h2 className="font-semibold">Uploaded File</h2>
            <p className="text-sm text-gray-600">{uploaded.originalName} ({Math.round(uploaded.size / 1024)} KB)</p>
            <a className="text-blue-600 underline" href={`http://localhost:3000${uploaded.url}`} target="_blank" rel="noreferrer">
              View
            </a>
            <div className="mt-3">
              <img src={`http://localhost:3000${uploaded.url}`} alt={uploaded.originalName} className="max-h-64 rounded border" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Upload; 