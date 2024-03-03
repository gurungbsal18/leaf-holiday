"use client";
import Link from "next/link";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useContext } from "react";
import { GlobalContext } from "@/context";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";

export default function Pages() {
  const { pageLevelLoader, setPageLevelLoader } = useContext(GlobalContext);
  setPageLevelLoader(false);
  return (
    <>
      {pageLevelLoader ? (
        <PageLevelLoader />
      ) : (
        <div className="dashboard-content-section p-4">
          <h4>Pages</h4>
          <div>
            <div>
              <p>Page Name</p>
            </div>
            <div className="d-flex justify-content-between border-bottom py-2">
              <p>Home</p>
              <div className="d-flex gap-2">
                <Link href="/" target="_blank">
                  <button className="btn btn-sm btn-outline-success">
                    View
                  </button>
                </Link>
                <Link href="/admin/pages/home">
                  <button className="btn btn-sm btn-success">
                    {" "}
                    <EditNoteIcon /> Edit
                  </button>
                </Link>
              </div>
            </div>
            <div className="d-flex justify-content-between border-bottom py-2">
              <p>About Us</p>
              <div className="d-flex gap-2">
                <Link href="/aboutus" target="_blank">
                  <button className="btn btn-sm btn-outline-success">
                    View
                  </button>
                </Link>
                <Link href="/admin/pages/aboutUs">
                  <button className="btn btn-sm btn-success">
                    {" "}
                    <EditNoteIcon /> Edit
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
