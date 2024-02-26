"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useTable, usePagination } from "react-table";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/context";
import { toast } from "react-toastify";
import axios from "@/utils/axios";

export default function Table({
  headerData,
  bodyData,
  apiName,
  showView,
  showEdit,
  showRemove,
  updateComponent,
  checkbox,
  sizeOfPage,
  noPagination,
}) {
  const { setVerify } = useContext(GlobalContext);
  const columns = useMemo(() => headerData, []);
  const tableInstance = useTable(
    { columns, data: bodyData, initialState: { pageSize: sizeOfPage || 8 } },
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex },
    prepareRow,
  } = tableInstance;

  const {
    setPageLevelLoader,
    callExtractAll,
    setCallExtractAll,
    setUpdatePackage,
    setUpdateForm,
    setDialogOpen,
    setDialogContent,
  } = useContext(GlobalContext);

  const router = useRouter();

  const handleSelected = async (data) => {
    try {
      const res = await axios.put(`/${apiName}/update/${data._id}`, {
        ...data,
        isSelected: !data.isSelected,
      });
      if (res.status === 200) {
        res.data.data.isSelected === false
          ? toast.error("Removed from the Homepage Successfully", {
              position: toast.POSITION.TOP_RIGHT,
            })
          : toast.success("Added to the Homepage Successfully", {
              position: toast.POSITION.TOP_RIGHT,
            });
        setCallExtractAll(!callExtractAll);
      } else {
        toast.error("Something Went Wrong. Please Try Again...", {
          position: toast.POSITION.TOP_RIGHT,
        });
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

  async function handleRemove(id) {
    try {
      setPageLevelLoader(true);
      const res = await axios.delete(`/${apiName}/delete/${id}`);
      if (res.status === 200) {
        setCallExtractAll(!callExtractAll);
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
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
  }
  bodyData;
  return (
    <div className="">
      <table {...getTableProps()} className="dashboard-table">
        <thead>
          {headerGroups.map((headerGroup) => {
            const { key, ...restHeaderGroupProps } =
              headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...restHeaderGroupProps}>
                {/* {showImage && <th></th>} */}
                {checkbox && <th>Add</th>}
                {headerGroup.headers.map((column) => {
                  const { key, ...restColumnProps } = column.getHeaderProps();
                  return (
                    <th key={key} {...restColumnProps}>
                      {column.render("Header")}
                    </th>
                  );
                })}
                {/* {showView && <th></th>} */}
                {/* {showEdit && <th></th>} */}
                {showRemove && <th></th>}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            const { key, ...restRowProps } = row.getRowProps();
            return (
              <tr key={key} {...restRowProps}>
                {checkbox && (
                  <td>
                    <input
                      type="checkbox"
                      defaultChecked={bodyData[key.split("_")[1]]?.isSelected}
                      onClick={() =>
                        handleSelected(bodyData[key.split("_")[1]])
                      }
                    />
                  </td>
                )}
                {/* {showImage && (
                  <td>
                    <Image
                      src={
                        bodyData[key.split("_")[1]]?.imageUrl ||
                        bodyData[key.split("_")[1]]?.mainImageUrl ||
                        bodyData[key.split("_")[1]]?.imgUrl
                      }
                      height={50}
                      width={50}
                      alt={`${apiName}-image-${key.split("_")[1]}`}
                    />
                  </td>
                )} */}
                {row.cells.map((cell) => {
                  const { key, ...restCellProps } = cell.getCellProps();
                  return (
                    <td key={key} {...restCellProps}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}

                <td className="dashboard-table-btn">
                  {showView && (
                    <>
                      {!bodyData[key.split("_")[1]]?.isVerified && (
                        <button
                          className="btn btn-outline-success"
                          onClick={() => {
                            if (apiName === "review") {
                              setUpdateForm(bodyData[key.split("_")[1]]);
                              setVerify(true);
                              setDialogOpen(true);
                              setDialogContent(updateComponent);
                            } else {
                              setPageLevelLoader(true);
                              setTimeout(() => {
                                router.push(
                                  `/${apiName}/${
                                    bodyData[key.split("_")[1]].slug
                                  }`
                                );
                              }, 1000);
                            }
                          }}>
                          {apiName === "review" ? "Verify" : "View"}
                        </button>
                      )}
                    </>
                  )}

                  {showEdit && (
                    <button
                      onClick={() => {
                        if (apiName === "package") {
                          localStorage.setItem(
                            "updatePackage",
                            bodyData[key.split("_")[1]]
                          );
                          setUpdatePackage(bodyData[key.split("_")[1]]);
                          router.push("/admin/packages/create-package");
                        } else if (apiName === "blog") {
                          setUpdatePackage(bodyData[key.split("_")[1]]);
                          router.push("/admin/blogs/create");
                        } else {
                          setUpdateForm(bodyData[key.split("_")[1]]);
                          setDialogOpen(true);
                          setDialogContent(updateComponent);
                        }
                      }}
                      className="btn btn-sm btn-success">
                      <EditNoteIcon /> Edit
                    </button>
                  )}
                  {showRemove && (
                    <button
                      onClick={() =>
                        handleRemove(bodyData[key.split("_")[1]]._id)
                      }
                      className="btn btn-sm btn-danger">
                      <DeleteIcon />
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {!noPagination && (
        <div>
          <span>
            Page <strong>{pageIndex + 1}</strong>of
            <strong>{pageOptions.length}</strong>
          </span>
          <button disabled={!canPreviousPage} onClick={() => previousPage()}>
            Previous
          </button>
          <button disabled={!canNextPage} onClick={() => nextPage()}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}
