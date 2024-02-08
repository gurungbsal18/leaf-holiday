import React, { useContext, useMemo } from "react";
import { useTable } from "react-table";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/context";
import { toast } from "react-toastify";
import axios from "axios";
import Image from "next/image";

export default function Table({
  headerData,
  bodyData,
  apiName,
  showView,
  showEdit,
  showRemove,
  updateComponent,
  showImage,
  checkbox,
}) {
  const { setVerify } = useContext(GlobalContext);
  const columns = useMemo(() => headerData, []);
  // const data = useMemo(() => bodyData, []);
  const tableInstance = useTable({ columns, data: bodyData });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
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
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/${apiName}/update/${data._id}`,
        { ...data, isSelected: !data.isSelected }
      );
      if (res.status === 200) {
        console.log(res);
        res.data.data.isSelected === false
          ? toast.error("Removed from the Homepage Successfully", {
              position: toast.POSITION.TOP_RIGHT,
            })
          : toast.success("Added to the Homepage Successfully", {
              position: toast.POSITION.TOP_RIGHT,
            });
        setCallExtractAll(!callExtractAll);
      }
    } catch (e) {
      toast.success("Something Went Wrong. Please Try Again!!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  async function handleRemove(id) {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/${apiName}/delete/${id}`
    );
    if (res.status === 200) {
      setCallExtractAll(!callExtractAll);
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }
  console.log(bodyData);
  return (
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
        {rows.map((row) => {
          prepareRow(row);
          const { key, ...restRowProps } = row.getRowProps();
          return (
            <tr key={key} {...restRowProps}>
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
              {checkbox && (
                <td>
                  <input
                    type="checkbox"
                    defaultChecked={bodyData[key.split("_")[1]]?.isSelected}
                    onClick={() => handleSelected(bodyData[key.split("_")[1]])}
                  />
                </td>
              )}
              {row.cells.map((cell) => {
                const { key, ...restCellProps } = cell.getCellProps();
                return (
                  <td key={key} {...restCellProps}>
                    {cell.render("Cell")}
                  </td>
                );
              })}

              <td className="d-flex gap-3 justify-content-end">
                {showView && (
                  <>
                    {!bodyData[key.split("_")[1]]?.isVerified && (
                      <button
                        className="btn btn-sm btn-outline-success"
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
                                `/${apiName}/${bodyData[key.split("_")[1]]._id}`
                              );
                            }, 1000);
                          }
                        }}
                      >
                        {apiName === "review" ? "Verify" : "View"}
                      </button>
                    )}
                  </>
                )}
                {showEdit && (
                  <button
                    onClick={() => {
                      if (apiName === "package") {
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
                    className="btn btn-sm btn-success"
                  >
                    <EditNoteIcon /> Edits
                  </button>
                )}
                {showRemove && (
                  <button
                    onClick={() =>
                      handleRemove(bodyData[key.split("_")[1]]._id)
                    }
                    className="btn btn-sm btn-danger"
                  >
                    <DeleteIcon />
                    Delete
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
