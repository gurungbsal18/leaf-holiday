"use client";

import React, { useContext } from "react";
import Image from "next/image";
import { GlobalContext } from "@/context";
import Link from "next/link";

export default function TeamCard({ teamDetail }) {
  const { setPageLevelLoader, pageLevelLoader } = useContext(GlobalContext);
  return (
    <div className="col-2 border pb-3">
      <Image
        src={teamDetail?.imageUrl}
        width={250}
        height={300}
        alt="blog-image"
      />
      <div className="px-3">
        <h4 className="my-4 title">{teamDetail?.name}</h4>
        <p>{teamDetail?.designation}</p>
        <Link
          href={`/ourTeam/${teamDetail.slug}`}
          onClick={() => {
            setPageLevelLoader(true);
          }}>
          <button>View Detail</button>
        </Link>
      </div>
    </div>
  );
}
