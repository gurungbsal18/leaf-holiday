import React, { useContext } from "react";
import { GrClose } from "react-icons/gr";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Rating from "@mui/material/Rating";
import { useForm, Controller } from "react-hook-form";
import { GlobalContext } from "@/context";
import axios from "axios";
import { toast } from "react-toastify";
import { submitForm } from "@/utils/functions";

export default function CreateDifficulty({ nameValue, setNameValue, setVal }) {
  const initialFormData = {
    name: nameValue ? nameValue : "",
    description: "",
    rating: 1,
  };

  const {
    setDialogOpen,
    updateForm,
    setUpdateForm,
    callExtractAll,
    setCallExtractAll,
  } = useContext(GlobalContext);

  const form = useForm({
    defaultValues: updateForm ? updateForm : initialFormData,
  });
  const { register, handleSubmit, control } = form;

  const onSubmit = async (data) => {
    const res = await submitForm(data, "difficulty", updateForm, setNameValue);
    setVal(data.name);

    setCallExtractAll(!callExtractAll);
    setUpdateForm(null);
    setDialogOpen(false);
  };

  return (
    <div className="">
      <div className="">
        <div className="d-flex justify-content-between p-3 ">
          <p>{updateForm ? "Update Difficulty" : "Create Difficulty"}</p>
          <GrClose
            onClick={() => {
              setDialogOpen(false);
              setUpdateForm(null);
            }}
          />
        </div>
        <form>
          <div className="d-flex flex-column gap-2">
            <TextField
              required
              fullWidth
              size="small"
              label="Name"
              type="text"
              variant="outlined"
              {...register("name")}
            />
            <TextareaAutosize
              className="w-100"
              size="large"
              label="Description"
              type="text"
              variant="outlined"
              {...register("description")}
            />
            <Controller
              control={control}
              name={"rating"}
              defaultValue={-1}
              render={({ field: { onChange, value } }) => (
                <Rating
                  name={"rating"}
                  onChange={onChange}
                  value={Number(value)}
                />
              )}
            />
            <button type="submit" onClick={handleSubmit(onSubmit)}>
              {updateForm ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
