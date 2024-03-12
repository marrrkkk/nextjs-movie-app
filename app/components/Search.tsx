"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Search = () => {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();

  const handleRefresh = () => {
    router.push("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!query) return;
    e.preventDefault();
    router.push(`/search/${query}`);
  };

  return (
    <div className="flex flex-col items-center justify-center py-2 font-outfit">
      <h1 className="text-3xl m-10 cursor-pointer select-none" onClick={handleRefresh}>
        Search Movie
      </h1>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row md:items-center md:justify-center"
        >
          <input
            type="text"
            value={query}
            onChange={handleChange}
            className="bg-inherit border border-gray-800 text-white focus:outline-none focus:border-gray-500 h-10 rounded-lg p-3"
          />
          <button
            type="submit"
            className="bg-white text-black rounded-md m-1 py-1 px-20 md:p-2"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;
