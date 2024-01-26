import React, { useContext } from "react";
import { GrClose } from "react-icons/gr";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Rating from "@mui/material/Rating";
import { useForm, Controller } from "react-hook-form";
import { GlobalContext } from "@/context";
import { submitForm } from "@/utils/functions";

export default function CreateTestimonial() {
  const {
    setDialogOpen,
    updateForm,
    setUpdateForm,
    callExtractAll,
    setCallExtractAll,
    updatePackage,
  } = useContext(GlobalContext);

  const initialFormData = {
    packageId: updatePackage._id,
    userID: "657c79f29c6b89ea65a5a5b6",
    stars: 1,
    comment: "",
  };

  const form = useForm({
    defaultValues: updateForm ? updateForm : initialFormData,
  });
  const { register, handleSubmit, control } = form;

  const onSubmit = async (data) => {
    const res = await submitForm(data, "review", updateForm);

    setCallExtractAll(!callExtractAll);
    setUpdateForm(null);
    setDialogOpen(false);
  };

  return (
    <div className="">
      <div className="">
        <div className="d-flex justify-content-between p-3 ">
          <p>{updateForm ? "Update Review" : "Create Review"}</p>
          <GrClose
            onClick={() => {
              setDialogOpen(false);
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
