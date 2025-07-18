import React, { useState } from "react";

interface Props {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length >= 3) {
      onSearch(query);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto flex items-center gap-2 border rounded mb-4"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari artikel..."
        className="flex-1 p-2 outline-none"
      />
      <button
        type="submit"
        className="p-2 text-lg hover:bg-gray-100 rounded"
        title="Cari"
      >
        🔍
      </button>
    </form>
  );
}
