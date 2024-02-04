import React, { useContext, useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Rating from "@mui/material/Rating";
import { useForm, Controller } from "react-hook-form";
import { GlobalContext } from "@/context";
import { submitForm } from "@/utils/functions";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import axios from "axios";

export default function CreateTestimonial() {
  const {
    pageLevelLoader,
    setPageLevelLoader,
    setDialogOpen,
    updateForm,
    setUpdateForm,
    callExtractAll,
    setCallExtractAll,
    updatePackage,
    user,
  } = useContext(GlobalContext);

  const [allPackages, setAllPackages] = useState(null);

  const initialFormData = {
    packageId: updatePackage?._id || "",
    userID: user?._id || "",
    name: user?.name || "",
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

  const getAllPackages = async () => {
    setPageLevelLoader(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/package/`
      );
      if (res.status === 200) {
        setPageLevelLoader(false);
        setAllPackages(res.data.data);
      }
    } catch (e) {
      setPageLevelLoader(false);
      console.log(e);
    }
  };

  useEffect(() => {
    getAllPackages();
    console.log("use effect");
  }, []);
  console.log(allPackages);

  return (
    <>
      {pageLevelLoader ? (
        <PageLevelLoader loading={pageLevelLoader} />
      ) : (
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
                    precision={0.5}
                  />
                )}
              />
              <button type="submit" onClick={handleSubmit(onSubmit)}>
                {updateForm ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
