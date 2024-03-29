"use client";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { GlobalContext } from "@/context";

export default function SearchBar({ searchValue, setPage, setSearchVal }) {
  const { setPageLevelLoader, callExtractAll, setCallExtractAll } =
    useContext(GlobalContext);
  const [searchTerm, setSearchTerm] = useState(searchValue || "");
  const router = useRouter();

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      setCallExtractAll(!callExtractAll);
      // Prevent the default form submission behavior
      event.preventDefault();
      setPageLevelLoader(true);
      setPage(1);
      setSearchVal(searchTerm);
      // Navigate to search page with the search query
      router.push(`/search?searchTerm=${searchTerm}`);
    }
  };
  return (
    <div className="search-page">
      <div className="hero-search-bar d-flex jusitify-content-start mb-3">
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
            setCallExtractAll(!callExtractAll);
            setPageLevelLoader(true);
            setPage(1);
            setSearchVal(searchTerm);
            router.push(`/search?searchTerm=${searchTerm}`);
          }}
        >
          <SearchOutlinedIcon />
          Search
        </button>
      </div>
    </div>
  );
}
