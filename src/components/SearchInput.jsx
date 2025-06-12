import React, { useState } from "react";

const SearchInput = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${query}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDdhMGU5MTU0M2MzYjA3NWVhNDU2M2U2YTk5ZGVkNiIsIm5iZiI6MTc0Njc3NjY4MS41NjksInN1YiI6IjY4MWRiMjY5ODUzN2IzNDI4MjkzYjI4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hsw9NwnDVSjldeytaLprOxCbUshgPONP1rNoxGszjqw",
            },
          }
        );
        const data = await response.json();
        onSearch(data.results); // Pass the search results back to App.jsx
      } catch (error) {
        console.error("Error searching for movies:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full flex justify-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="
          w-full
          max-w-lg
          h-11
          rounded-full
          bg-white
          text-black/70
          px-4
          outline-none
          shadow-md
          transition-all
          duration-200
          focus:ring-2
          focus:ring-primary
          text-base
          sm:text-base
          md:text-lg
          lg:text-xl
          placeholder:text-gray-400
        "
        placeholder="Search for movies..."
        style={{ minWidth: 0 }}
      />
    </form>
  );
};

export default SearchInput;