"use client";
import React, { useContext, useState } from "react";
import { GrClose } from "react-icons/gr";
import TextField from "@mui/material/TextField";
import { useFieldArray, useForm } from "react-hook-form";
import { GlobalContext } from "@/context";
import { submitForm } from "@/utils/functions";
import Button from "react-bootstrap/Button";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

export default function CreateMenu({ menuName }) {
  const {
    updateForm,
    setUpdateForm,
    setDialogOpen,
    callExtractAll,
    setCallExtractAll,
  } = useContext(GlobalContext);

  const initialData = {
    parent: menuName,
    title: "",
    link: "",
  };

  const [childCounter, setChildCounter] = useState(
    updateForm ? updateForm.child.length : 0
  );

  const form = useForm({
    defaultValues: updateForm ? updateForm : initialData,
  });
  const { register, handleSubmit, watch, control } = form;

  const {
    fields: childFields,
    append: childAppend,
    remove: childRemove,
  } = useFieldArray({
    name: "child",
    control,
  });

  const onSubmit = async (data) => {
    const res = await submitForm(data, "menu", updateForm);

    setCallExtractAll(!callExtractAll);
    setUpdateForm(null);
    setDialogOpen(false);
  };
  return (
    <div className="">
      <div className="custom-modal">
        <div className="custom-modal-header">
          <p className="m-0">
            {updateForm
              ? `Update ${updateForm.title}`
              : `Create ${menuName}'s Sub-Menu`}
          </p>
          <GrClose
            onClick={() => {
              setUpdateForm(null);
              setDialogOpen(false);
            }}
          />
        </div>
        <form className="p-4">
          <div className="d-flex row">
            <div className="d-flex flex-column gap-2 col-8">
              <TextField
                required
                fullWidth
                size="small"
                label="Title"
                type="text"
                variant="outlined"
                {...register("title")}
              />
              <TextField
                required
                fullWidth
                size="small"
                label="Link"
                type="text"
                variant="outlined"
                {...register("link")}
              />
              {(menuName === "Trekking" ||
                menuName === "Activity" ||
                menuName === "Outbound") && (
                <div className="d-flex">
                  <div className="mb-5">
                    <h4 className="dashboard-title">{`${watch(
                      "title"
                    )}'s Children`}</h4>
                    {childFields.map((childField, index) => (
                      <div
                        className="d-flex flex-column flex-md-row gap-3 align-items-center"
                        key={`child-${index}`}>
                        <TextField
                          className="mx-0"
                          label="Title"
                          type="text"
                          size="small"
                          {...register(`child.${index}.title`)}
                        />
                        <TextField
                          className="mx-0"
                          label="Link"
                          type="text"
                          size="small"
                          {...register(`child.${index}.link`)}
                        />

                        <span
                          role="button"
                          className="text-danger"
                          onClick={() => {
                            setChildCounter((prev) => prev - 1);
                            childRemove(index);
                          }}>
                          <RemoveCircleIcon />
                        </span>
                      </div>
                    ))}
                    <Button
                      disabled={childCounter > 4}
                      size="sm"
                      variant="success"
                      onClick={() => {
                        setChildCounter((prev) => prev + 1);
                        childAppend({
                          title: "",
                          link: "",
                        });
                      }}>
                      <span className="d-flex align-items-center gap-1">
                        Add More Child
                      </span>
                    </Button>
                  </div>
                </div>
              )}
              <button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                className="btn btn-success">
                {updateForm ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
