"use client";

import { useEffect, useState } from "react";
import Header from "./components/header";
import DashboardCopyButton from "./client/DashboardCopyButton";


export default function Dashboard() {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);


  async function fetchLinks() {
    const res = await fetch("/api/links");
    const data = await res.json();
    setLinks(data);
  }

  useEffect(() => {
    fetchLinks();
  }, []);

  async function handleSubmit(e: any) {
  e.preventDefault();
  setLoading(true);
  setError("");

  const res = await fetch("/api/links", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, code }),
  });

  const data = await res.json();

  if (!res.ok) {
    setError(data.error || "Something went wrong");
    setLoading(false);
    return;
  }

  setUrl("");
  setCode("");
  setLoading(false);
  fetchLinks();
}


  async function handleDelete(code: string) {
  setDeleting(code);

  setLinks((prev) => prev.filter((item) => item.code !== code));

  await fetch(`/api/links/${code}`, { method: "DELETE" });
  setTimeout(() => {
    setDeleting(null);
  }, 300);
}

  
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Header />
      <h1 className="text-3xl font-bold">TinyLink Dashboard</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter shortcode (example: docs)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Link"}
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>

      <hr />

      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">Code</th>
            <th className="py-2">URL</th>
            <th className="py-2">Clicks</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map((l: any) => (
            <tr 
                key={l.code} 
                className={`transition-all duration-300 ${
                  deleting === l.code ? "opacity-0 scale-95" : ""
                }`}
            >

              <td className="py-2 font-mono">{l.code}</td>
              <td className="py-2 truncate max-w-[200px]">{l.url}</td>
              <td className="py-2">{l.clicks}</td>
              <td className="py-2 space-x-2">
                <a href={`/code/${l.code}`} className="text-blue-700 underline">
                  Stats
                </a>

                <DashboardCopyButton code={l.code} />

                <button
                  onClick={() => handleDelete(l.code)}
                  className="text-red-600 underline cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
