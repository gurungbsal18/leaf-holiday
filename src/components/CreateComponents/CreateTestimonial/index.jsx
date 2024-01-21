import React, { useContext } from "react";
import { GrClose } from "react-icons/gr";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Rating from "@mui/material/Rating";
import { useForm, Controller } from "react-hook-form";
import { GlobalContext } from "@/context";
import axios from "axios";
import { toast } from "react-toastify";

export default function CreateTestimonial() {
  const initialFormData = {
    packageId: "6578848ef9d2151e944ad965",
    userID: "6578848ef9d2151e944ad965",
    stars: 1,
    comment: "Rcomment",
  };

  const {
    createComponentOpen,
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

  const submitData = async (data) => {
    let res = {};
    if (updateForm) {
      res = await axios.put(
        `http://localhost:5001/review/update/${data._id}`,
        data
      );
    } else {
      res = await axios.post("http://localhost:5001/review/add", data);
    }
    console.log(res);
    if (res.status === 200) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setUpdateForm(null);
      setCallExtractAll(!callExtractAll);
      setCreateComponentOpen(false);
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
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
            <TextareaAutosize
              className="w-100"
              size="large"
              label="Comment"
              type="text"
              variant="outlined"
              {...register("comment")}
            />
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
            <button type="submit" onClick={handleSubmit(submitData)}>
              {updateForm ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
