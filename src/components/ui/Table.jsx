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
}) {
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
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => {
          const { key, ...restHeaderGroupProps } =
            headerGroup.getHeaderGroupProps();
          return (
            <tr key={key} {...restHeaderGroupProps}>
              {showImage && <th></th>}
              {headerGroup.headers.map((column) => {
                const { key, ...restColumnProps } = column.getHeaderProps();
                return (
                  <th key={key} {...restColumnProps}>
                    {column.render("Header")}
                  </th>
                );
              })}
              {showView && <th></th>}
              {showEdit && <th></th>}
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
              {showImage && (
                <td>
                  <Image
                    src={
                      bodyData[key.split("_")[1]]?.imageUrl ||
                      bodyData[key.split("_")[1]]?.mainImageUrl
                    }
                    height={50}
                    width={50}
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
              {showView && (
                <td>
                  <button
                    onClick={() => {
                      setPageLevelLoader(true);
                      setTimeout(() => {
                        router.push(
                          `/${apiName}/${bodyData[key.split("_")[1]]._id}`
                        );
                      }, 1000);
                    }}>
                    View
                  </button>
                </td>
              )}
              {showEdit && (
                <td>
                  <button
                    onClick={() => {
                      if (apiName === "package") {
                        setUpdatePackage(bodyData[key.split("_")[1]]);
                        router.push("/admin/packages/create-package");
                      } else {
                        setUpdateForm(bodyData[key.split("_")[1]]);
                        setDialogOpen(true);
                        setDialogContent(updateComponent);
                      }
                    }}
                    className="btn btn-sm btn-success">
                    <EditNoteIcon /> Edit
                  </button>
                </td>
              )}
              {showRemove && (
                <td>
                  <button
                    onClick={() =>
                      handleRemove(bodyData[key.split("_")[1]]._id)
                    }
                    className="btn btn-sm btn-danger">
                    <DeleteIcon />
                    Remove
                  </button>
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
