import React, { useContext, useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Rating from "@mui/material/Rating";
import { useForm, Controller } from "react-hook-form";
import { GlobalContext } from "@/context";
import { submitForm } from "@/utils/functions";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import CustomAutocomplete from "@/components/ui/CustomAutocomplete";
import { toast } from "react-toastify";
import axios from "@/utils/axios";

export default function CreateTestimonial() {
  const {
    verify,
    setVerify,
    pageLevelLoader,
    setPageLevelLoader,
    setDialogOpen,
    updateForm,
    setUpdateForm,
    callExtractAll,
    setCallExtractAll,
    updatePackage,
  } = useContext(GlobalContext);

  const [allPackages, setAllPackages] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  // (user);
  const initialFormData = {
    packageId: updatePackage?._id || {},
    userID: user?._id || "",
    userName: user?.role === "admin" ? "" : user?.name,
    stars: 1,
    comment: "",
    isSelected: false,
    isVerified: user?.role === "admin" ? true : false,
  };

  const form = useForm({
    defaultValues: updateForm ? updateForm : initialFormData,
  });
  const { register, handleSubmit, control, setValue, reset } = form;

  const onSubmit = async (data) => {
    const res = await submitForm(data, "review", updateForm, false, verify);

    setCallExtractAll(!callExtractAll);
    setVerify(false);
    setUpdateForm(null);
    setDialogOpen(false);
  };

  const getAllPackages = async () => {
    setPageLevelLoader(true);
    try {
      const res = await axios.get(`/package/`);
      if (res.status === 200) {
        if (!updateForm && !updatePackage) {
          reset({ ...initialFormData, packageId: res.data.data[0]._id });
        }
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
        <div className="">
          <div className="d-flex justify-content-between p-3 ">
            <p>
              {updateForm
                ? verify
                  ? "Verify Review"
                  : "Update Review"
                : "Create Review"}
            </p>
            <GrClose
              onClick={() => {
                setDialogOpen(false);
                setUpdateForm(null);
                setVerify(false);
              }}
            />
          </div>
          <form>
            <div className="d-flex flex-column gap-2">
              {user?.role === "admin" && (
                <div>
                  <TextField
                    required
                    fullWidth
                    size="small"
                    label="Name"
                    type="text"
                    variant="outlined"
                    disabled={verify}
                    {...register("userName")}
                  />
                  <CustomAutocomplete
                    label="Select Package"
                    options={allPackages}
                    setValue={setValue}
                    formName={"packageId"}
                    fieldName={updateForm?.packageId}
                  />
                </div>
              )}
              <label name="comment">Comment</label>
              <TextareaAutosize
                className="w-100"
                size="large"
                label="Comment"
                type="text"
                variant="outlined"
                disabled={verify}
                {...register("comment")}
              />
              <label name="rating">Rating</label>
              <Controller
                control={control}
                name={"stars"}
                // defaultValue={-1}
                render={({ field: { onChange, value } }) => (
                  <Rating
                    name={"stars"}
                    onChange={onChange}
                    value={Number(value)}
                    precision={0.5}
                    readOnly={verify}
                  />
                )}
              />
              <button type="submit" onClick={handleSubmit(onSubmit)}>
                {updateForm ? (verify ? "Verify" : "Update") : "Create"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
