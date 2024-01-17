import React, { useContext } from "react";
import { GrClose } from "react-icons/gr";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Rating from "@mui/material/Rating";
import { useForm, Controller } from "react-hook-form";
import { GlobalContext } from "@/context";

export default function CreateDifficulty({ nameValue, handleClose, setValue }) {
  const form = useForm();
  const { register, handleSubmit, control } = form;
  const { createComponentOpen, setCreateComponentOpen } =
    useContext(GlobalContext);

  const submitDestination = (data) => {
    if (nameValue) {
      setValue(data.name);
      handleClose();
    }
    console.log("Difficulty Form submitted", data);
    setCreateComponentOpen(false);
  };

  return (
    <div className="">
      <div className="">
        <div className="d-flex justify-content-between p-3 ">
          <p>Create Difficulty</p>
          <GrClose
            onClick={() => {
              setCreateComponentOpen(false);
              if (nameValue) {
                handleClose();
              }
            }}
          />
        </div>
        <form>
          <div className="d-flex flex-column gap-2">
            <TextField
              required
              fullWidth
              value={nameValue}
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
            <button type="submit" onClick={handleSubmit(submitDestination)}>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
