import React from "react";
import ClientSearch from "./SearchPage";

export default async function SearchPage(context) {
  const searchTerm = context.searchParams.searchTerm;
  return <ClientSearch searchTerm={searchTerm} />;
}
