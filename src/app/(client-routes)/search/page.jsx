import PackageCard from "@/components/PackageCard";
import SearchBar from "@/components/ui/SearchBar";
import axios from "@/utils/axios";
import React, { Suspense } from "react";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";

const getMaxPage = (length) => {
  if (length % 3 === 0) {
    return length / 3;
  } else {
    return length / 3;
  }
};
export default async function SearchPage(context) {
  const searchTerm = context.searchParams.searchTerm;
  const page = Number(context.searchParams.page);
  let res = { data: [] };
  let searchData = null;
  try {
    res = await axios.get(`/package/search/${searchTerm}`);
    if (res.data.length > 0) {
      searchData = res.data.slice((page - 1) * 3, (page - 1) * 3 + 3);
    }
  } catch (e) {
    console.log(e);
  }
  return (
    <>
      <SearchBar
        searchValue={searchTerm}
        page={page}
        maxPage={getMaxPage(res.data.length)}
      />
      <p>Search Term : {searchTerm}</p>
      {searchData ? (
        <div>
          <Suspense fallback={<PageLevelLoader />}>
            <div className="d-flex flex-wrap justify-content-center gap-3 my-5">
              {searchData.map((item) => (
                <PackageCard key={item._id} packageDetail={item} />
              ))}
            </div>
          </Suspense>
        </div>
      ) : (
        <h4>No Package Found</h4>
      )}
    </>
  );
}
