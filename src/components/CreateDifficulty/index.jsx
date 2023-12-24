import React from "react";
import { GrClose } from "react-icons/gr";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Rating from "@mui/material/Rating";
import { useForm } from "react-hook-form";

export default function CreateDifficulty({ nameValue }) {
  const form = useForm();
  const { register, handleSubmit } = form;

  const submitDestination = (data) => {
    console.log("Difficulty Form submitted", data);
  };

  return (
    <div className="">
      <div className="">
        <div className="d-flex justify-content-between p-3 ">
          <p>Create Difficulty</p>
          <GrClose />
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
            <TextField
              fullWidth
              size="small"
              label="Rating"
              type="number"
              variant="outlined"
              {...register("rating")}
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
