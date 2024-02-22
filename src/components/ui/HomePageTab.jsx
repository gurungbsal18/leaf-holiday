"use client";
import React, { useContext, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import TextField from "@mui/material/TextField";
import { GlobalContext } from "@/context";
import CustomAutocomplete from "@/components/ui/CustomAutocomplete";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import axios from "@/utils/axios";
import CloseIcon from "@mui/icons-material/Close";

export default function HomePageTab({ position, valueDefault, url }) {
  const {
    pageLevelLoader,
    setPageLevelLoader,
    setDialogOpen,
    setCallExtractAll,
    callExtractAll,
  } = useContext(GlobalContext);
  const [allPackages, setAllPackages] = useState(null);
  const { register, control, handleSubmit, setValue, watch } = useForm({
    defaultValues: valueDefault || {
      title: "",
      packages: [""],
      position: position,
      videoUrl: "",
    },
  });
  const {
    fields: packagesFields,
    append: packagesAppend,
    remove: packagesRemove,
  } = useFieldArray({
    name: "packages",
    control,
  });

  const onSubmit = async (data) => {
    setPageLevelLoader(true);
    try {
      let res;
      valueDefault
        ? (res = await axios.put(`/tabs/update/${data._id}`, data))
        : (res = await axios.post(`/tabs/add`, data));
      if (res.status === 200) {
        toast.success(
          `Tab ${valueDefault ? "Updated" : "Created"} Successfully!!!`,
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
        setDialogOpen(false);
        setCallExtractAll(!callExtractAll);
        setPageLevelLoader(false);
      } else {
        toast.error("Something Went Wrong. Please Try Again...", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setPageLevelLoader(false);
      }
    } catch (e) {
      toast.error("Something Went Wrong. Please Try Again...", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setPageLevelLoader(false);
    }
  };

  const getAllPackages = async () => {
    setPageLevelLoader(true);
    try {
      const res = await axios.get(`/package/`);
      if (res.status === 200) {
        setAllPackages(res.data.data);
        setPageLevelLoader(false);
      } else {
        toast.error("Something Went Wrong. Please Try Again...", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setPageLevelLoader(false);
      }
    } catch (e) {
      toast.error("Something Went Wrong. Please Try Again...", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setPageLevelLoader(false);
    }
  };

  useEffect(() => {
    getAllPackages();
  }, []);

  return (
    <>
      {pageLevelLoader ? (
        <PageLevelLoader />
      ) : (
        <div className="custom-dialog-inner">
          <div className="mb-2">
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-cente gap-2">
                <TextField
                  className="m-0"
                  label="Title"
                  sx={{ m: 1, width: "25ch" }}
                  type="text"
                  size="small"
                  {...register("title")}
                />
                <button
                  className="btn btn-sm btn-success"
                  disabled={packagesFields.length >= 6}
                  onClick={() => {
                    packagesAppend(allPackages[0]);
                  }}
                >
                  <span className="d-flex align-items-center gap-1">
                    + Add More Package
                  </span>
                </button>
              </div>

              <span
                onClick={() => {
                  setDialogOpen(false);
                }}
                style={{ cursor: "pointer" }}
              >
                <CloseIcon />
              </span>
            </div>
          </div>
          {url && (
            <TextField
              className="m-0 me-2"
              size="small"
              label="Video URL"
              defaultValue={valueDefault?.videoUrl || ""}
              {...register("videoUrl")}
            />
          )}
          {packagesFields.map((packagesField, index) => {
            return (
              <div
                className="d-flex flex-column flex-md-row gap-3 align-items-center"
                key={packagesField.id}
              >
                <CustomAutocomplete
                  fieldName={packagesField}
                  setValue={setValue}
                  options={allPackages}
                  formName={`packages[${index}]`}
                />

                {index > -1 && (
                  <span
                    role="button"
                    className="text-danger"
                    onClick={() => packagesRemove(index)}
                  >
                    <RemoveCircleIcon />
                  </span>
                )}
              </div>
            );
          })}
          <button
            className="btn btn-sm btn-success mt-2"
            onClick={handleSubmit(onSubmit)}
            disabled={
              watch("packages[0]") === "" ||
              watch("packages[0]") === null ||
              watch("packages[0]") === undefined
            }
          >
            {valueDefault ? "UPDATE" : "CREATE"}
          </button>
        </div>
      )}
    </>
  );
}
