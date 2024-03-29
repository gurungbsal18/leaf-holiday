"use client";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import PackageCard from "@/components/PackageCard";
import SearchBar from "@/components/ui/SearchBar";
import { GlobalContext } from "@/context";
import axios from "@/utils/axios";
import React, { useContext, useEffect, useState } from "react";

const searchNumber = 6;

const getMaxPage = (length) => {
  if (length % searchNumber === 0) {
    return length / searchNumber;
  } else {
    return length / searchNumber;
  }
};

export default function ClientSearch({ searchTerm }) {
  const { pageLevelLoader, setPageLevelLoader, callExtractAll } =
    useContext(GlobalContext);
  const [searchVal, setSearchVal] = useState(searchTerm);
  const [searchData, setSearchData] = useState(null);
  const [page, setPage] = useState(1);

  const maxPage = getMaxPage(searchData?.length);

  const filteredData = searchData?.slice(
    (page - 1) * searchNumber,
    (page - 1) * searchNumber + searchNumber
  );

  const getSearchData = async () => {
    setPageLevelLoader(true);
    try {
      const res = await axios.get(`/package/search/${searchVal}`);
      if (res.data.length > 0) {
        setSearchData(res.data);
      } else {
        setSearchData(null);
      }
      setPageLevelLoader(false);
    } catch (error) {
      console.log(error);
      setPageLevelLoader(false);
    }
  };
  useEffect(() => {
    getSearchData();
  }, [callExtractAll]);
  return (
    <div className="container pt-5">
      <SearchBar
        setPage={setPage}
        searchValue={searchVal}
        setSearchVal={setSearchVal}
      />
      <p className="m-0">Search Term : {searchVal}</p>
      {pageLevelLoader ? (
        <PageLevelLoader />
      ) : (
        <>
          {searchData ? (
            <div className="">
              <div className="row">
                {filteredData.map((item) => (
                  <PackageCard key={item._id} packageDetail={item} />
                ))}
              </div>
              <div className="d-flex gap-2 mb-5">
                <button
                  className="btn btn-sm btn-success"
                  disabled={page < 2}
                  onClick={() => setPage(page - 1)}
                >
                  Prev
                </button>
                <button
                  className="btn btn-sm btn-success"
                  disabled={page >= maxPage}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            <h4>No Package Found</h4>
          )}
        </>
      )}
    </div>
  );
}
