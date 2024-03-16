"use client";

import React, { useContext } from "react";
import Image from "next/image";
import { GlobalContext } from "@/context";
import Link from "next/link";

export default function TeamCard({ teamDetail }) {
  const { setPageLevelLoader, pageLevelLoader } = useContext(GlobalContext);
  return (
    <div className="col-12 col-md-3 pb-3">
      <div className="team-card border">
        <Image
          src={teamDetail?.imageUrl}
          width={250}
          height={300}
          alt="blog-image"
        />
        <div className="px-3">
          <h4 className="my-4 title">{teamDetail?.name}</h4>
          <p className="m-0 text-muted">{teamDetail?.designation}</p>
          <Link
            href={`/ourTeam/${teamDetail.slug}`}
            onClick={() => {
              setPageLevelLoader(true);
            }}
          >
            <div className="mb-2 d-flex justify-content-end pt-2 border-top">
              <button className="btn btn-sm btn-success">View Detail</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
