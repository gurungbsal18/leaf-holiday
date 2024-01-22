import React, { useContext } from "react";
import { GrClose } from "react-icons/gr";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Rating from "@mui/material/Rating";
import { useForm, Controller } from "react-hook-form";
import { GlobalContext } from "@/context";
import { submitForm } from "@/utils/functions";

export default function CreateTestimonial() {
  const initialFormData = {
    packageId: "6578848ef9d2151e944ad965",
    userID: "6578848ef9d2151e944ad965",
    stars: 1,
    comment: "Rcomment",
  };

  const {
    setCreateComponentOpen,
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
    const res = await submitForm(data, "review", updateForm);

    console.log("inner Form submitted", data);
    setCallExtractAll(!callExtractAll);
    setUpdateForm(null);
    setCreateComponentOpen(false);
  };

  return (
    <div className="">
      <div className="">
        <div className="d-flex justify-content-between p-3 ">
          <p>{updateForm ? "Update Review" : "Create Review"}</p>
          <GrClose
            onClick={() => {
              setCreateComponentOpen(false);
              setUpdateForm(null);
            }}
          />
        </div>
        <form>
          <div className="d-flex flex-column gap-2">
            <label name="comment">Comment</label>
            <TextareaAutosize
              className="w-100"
              size="large"
              label="Comment"
              type="text"
              variant="outlined"
              {...register("comment")}
            />
            <label name="rating">Rating</label>
            <Controller
              control={control}
              name={"stars"}
              defaultValue={-1}
              render={({ field: { onChange, value } }) => (
                <Rating
                  name={"stars"}
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
