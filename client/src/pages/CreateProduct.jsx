import React from "react";

function SuggestionDialog({ suggestions, loading, onSelect }) {
  const hasItems = Array.isArray(suggestions) && suggestions.length > 0;
  if (!loading && !hasItems) return null;
  return (
    <div className="mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="px-3 py-2 text-xs text-gray-500 border-b border-gray-100 flex items-center justify-between">
        <span>AI suggestions</span>
        {loading && <span className="text-gray-400">Thinking…</span>}
      </div>
      <ul className="max-h-56 overflow-auto">
        {hasItems ? (
          suggestions.map((opt, idx) => (
            <li key={idx}>
              <button
                type="button"
                onClick={() => onSelect(opt)}
                className="w-full text-left px-3 py-2 hover:bg-gray-50"
              >
                {opt}
              </button>
            </li>
          ))
        ) : (
          <li className="px-3 py-2 text-gray-400">No suggestions</li>
        )}
      </ul>
    </div>
  );
}

function CreateProduct() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [image, setImage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [didAuto, setDidAuto] = React.useState(false);
  const [titleSuggestions, setTitleSuggestions] = React.useState([]);
  const abortRef = React.useRef(null);

  const suggest = async (type, context, options = {}) => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      setError("");
      setLoading(true);
      const res = await fetch("/api/ai/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, context, num: options.num || 5 }),
        signal: controller.signal
      });

      const contentType = res.headers.get("content-type") || "";
      const rawText = await res.text();
      let payload;
      try {
        payload = contentType.includes("application/json") ? JSON.parse(rawText) : { error: rawText };
      } catch (_) {
        payload = { error: rawText };
      }

      if (!res.ok) {
        const message = (payload && (payload.error || payload.message)) || `HTTP ${res.status}`;
        throw new Error(message);
      }

      const list = Array.isArray(payload?.suggestions)
        ? payload.suggestions.map(v => String(v).trim()).filter(Boolean)
        : (payload?.suggestion ? [String(payload.suggestion).trim()] : []);

      if (type === 'title') {
        let nextList = list;
        const prefix = (options.prefix || '').toLowerCase();
        if (prefix.length > 0) {
          const filtered = list.filter(opt => opt.toLowerCase().startsWith(prefix));
          if (filtered.length > 0) nextList = filtered;
        }
        setTitleSuggestions(nextList);
        if (nextList[0] && options.setFirstToTitle === true) {
          setTitle(nextList[0]);
        }
      }
      if (type === 'description') {
        if (list[0]) setDescription(list[0]);
      }
    } catch (e) {
      if (e.name === 'AbortError') return;
      setError(e.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  // Auto-suggest once on mount
  React.useEffect(() => {
    if (didAuto) return;
    setDidAuto(true);
    const ctx = `${title}\n${description}`;
    suggest('title', ctx, { num: 5, setFirstToTitle: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [didAuto]);

  // Live: Debounce re-suggest based on typed prefix
  React.useEffect(() => {
    if (!didAuto) return;
    const trimmed = title.trim();
    if (trimmed.length === 0) {
      setTitleSuggestions([]);
      return;
    }
    const id = setTimeout(() => {
      const words = trimmed.split(/\s+/).slice(0, 3).join(' ');
      const ctxTitle = words || trimmed;
      const prefix = trimmed.toLowerCase();
      // Ask AI with context, but bias UI list to start-with prefix
      suggest('title', ctxTitle, { num: 6, setFirstToTitle: false, prefix });
    }, 350);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  const handleApplyTitle = (option) => {
    setTitle(option);
    const ctx = `${option}\n${description}`;
    suggest('description', ctx, { num: 3 });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, description, price, image });
    alert("Product saved locally (demo). AI autocomplete working.");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-900">Create Product</h1>
        <p className="text-gray-600 mt-2">Start typing; suggestions prefer your starting letters.</p>

        <form onSubmit={handleSubmit} className="mt-8 bg-white border border-gray-200 rounded-xl p-6 space-y-6">
          {error && (
            <div className="p-3 rounded-md bg-red-50 text-red-700 text-sm">{error}</div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <div className="mt-1">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Desk lamp..."
              />
            </div>
            <SuggestionDialog
              suggestions={titleSuggestions}
              loading={loading}
              onSelect={handleApplyTitle}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <div className="mt-1">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Short, persuasive description"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Price ($)</label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="mt-1 w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct; 