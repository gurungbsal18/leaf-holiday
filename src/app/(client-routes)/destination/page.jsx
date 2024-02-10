"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { GlobalContext } from "@/context";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import { useRouter } from "next/navigation";

export default function DestinationPage() {
  const { pageLevelLoader, setPageLevelLoader } = useContext(GlobalContext);
  const [allDestinations, setAllDestinations] = useState(null);
  const router = useRouter();
  const getAllDestinations = async () => {
    setPageLevelLoader(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/destination/`
      );
      console.log(res);
      if (res.status === 200) {
        setAllDestinations(res.data?.data);
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
    getAllDestinations();
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
              alt="destination-image"
            />
            <h4>Destinations</h4>
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
            {allDestinations && (
              <div className="d-flex">
                {allDestinations.map((item) => (
                  <div>
                    <Image
                      onClick={() => router.push(`/destination/${item.slug}`)}
                      src={item.imageUrl}
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
