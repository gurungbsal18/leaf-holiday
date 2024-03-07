"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export default function SearchBar({ searchValue, page, maxPage }) {
  const [searchTerm, setSearchTerm] = useState(searchValue || "");
  const router = useRouter();

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      // Prevent the default form submission behavior
      event.preventDefault();
      //   setPageLevelLoader(true);
      // Navigate to search page with the search query
      router.push(`/search?searchTerm=${searchTerm}&page=1`);
    }
  };
  return (
    <div>
      <div className="hero-search-bar d-flex jusitify-content-center mx-auto">
        <input
          type="text"
          className="form-control"
          placeholder="Search your next adventure"
          onKeyDown={handleEnter}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="search-btn btn btn-sm btn-success"
          onClick={() => {
            //   setPageLevelLoader(true);
            router.push(`/search?searchTerm=${searchTerm}&page=1`);
          }}>
          <SearchOutlinedIcon />
          Search
        </button>
      </div>
      <div>
        <button
          disabled={page < 2}
          onClick={() =>
            router.push(`/search?searchTerm=${searchTerm}&page=${page - 1}`)
          }>
          Prev
        </button>
        <button
          disabled={page >= maxPage}
          onClick={() =>
            router.push(`/search?searchTerm=${searchTerm}&page=${page + 1}`)
          }>
          Next
        </button>
      </div>
    </div>
  );
}
