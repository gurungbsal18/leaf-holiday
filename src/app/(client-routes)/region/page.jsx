"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { GlobalContext } from "@/context";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import { useRouter } from "next/navigation";

export default function RegionPage() {
  const { pageLevelLoader, setPageLevelLoader } = useContext(GlobalContext);
  const [allRegions, setAllRegions] = useState(null);
  const router = useRouter();
  const getAllRegions = async () => {
    setPageLevelLoader(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/region/`
      );
      console.log(res);
      if (res.status === 200) {
        setAllRegions(res.data?.data);
        setPageLevelLoader(false);
      } else {
        setPageLevelLoader(false);
      }
    } catch (e) {
      console.log(e);
      setPageLevelLoader(false);
    }
  };
  useState(() => {
    getAllRegions();
  }, []);
  return (
    <>
      {pageLevelLoader ? (
        <PageLevelLoader loading={true} />
      ) : (
        <div>
          <div>
            <Image
              src="/images/km.png"
              height={500}
              width={1510}
              alt="region-image"
            />
            <h4>Regions</h4>
          </div>
          <div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis
              sapiente ipsam commodi nam suscipit iure libero rem veniam minima
              quia quibusdam eum repellendus expedita voluptatum, provident eos,
              aliquam, minus quaerat aut est! Quos quia quis modi quaerat ex
              tempore error commodi neque dolorem at temporibus iusto soluta
              reprehenderit repudiandae, placeat voluptates earum, assumenda
              eaque consequuntur iste saepe! Nisi, officia perspiciatis!
            </p>
            {allRegions && (
              <div className="d-flex">
                {allRegions.map((item) => (
                  <div>
                    <Image
                      onClick={() => router.push(`/region/${item.slug}`)}
                      src={item.imgUrl}
                      height={200}
                      width={200}
                      alt={`${item.name}-image`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
