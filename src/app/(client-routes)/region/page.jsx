"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { GlobalContext } from "@/context";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "@/utils/axios";

export default function RegionPage() {
  const { pageLevelLoader, setPageLevelLoader } = useContext(GlobalContext);
  const [allRegions, setAllRegions] = useState(null);
  const router = useRouter();
  const getAllRegions = async () => {
    setPageLevelLoader(true);
    try {
      const res = await axios.get(`/region/`);
      res;
      if (res.status === 200) {
        setAllRegions(res.data?.data);
        setPageLevelLoader(false);
      } else {
        toast.error("Something Went Wrong. Please Try Again...", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setPageLevelLoader(false);
      }
    } catch (e) {
      toast.error(
        e?.response?.data?.error || "Something Went Wrong. Please Try Again...",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
      setPageLevelLoader(false);
    }
  };
  useState(() => {
    getAllRegions();
  }, []);
  return (
    <>
      {pageLevelLoader ? (
        <PageLevelLoader />
      ) : (
        <div>
          <div className="header-image">
            <Image
              src="/images/km.png"
              height={500}
              width={1510}
              alt="region-image"
              priority
            />
          </div>
          <div className="container my-5">
            <h4 className="fw-bold title">Regions</h4>
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
              <div className="row region-container">
                {allRegions.map((item) => (
                  <div key={item._id} className="col-12 col-md-4 mb-4 ">
                    <Image
                      onClick={() => router.push(`/region/${item.slug}`)}
                      src={item.imgUrl}
                      height={300}
                      width={300}
                      alt={`${item.name}-image`}
                      style={{ objectFit: "cover" }}
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
