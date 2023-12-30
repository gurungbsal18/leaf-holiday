import React from "react";
import Header from "./Header";
import Title from "./Title";
import Contents from "./Contents";

export default function AdminPages({ data }) {
  return (
    <div>
      <Header pageName={data.pageName} createComponent={data.createComponent} />
      <Title titles={data.titles} />
      <Contents contents={data.contents} />
    </div>
  );
}
