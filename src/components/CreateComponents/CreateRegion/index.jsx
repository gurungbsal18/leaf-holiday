import React, { useContext, useEffect, useRef, useState } from "react";
import { GrClose } from "react-icons/gr";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useForm } from "react-hook-form";
import { GlobalContext } from "@/context";
import { submitForm } from "@/utils/functions";
import UploadToCloudinary from "@/components/ui/UploadToCloudinary";
import axios from "@/utils/axios";
import { toast } from "react-toastify";

export default function CreateRegion({ nameValue, setNameValue, setVal }) {
  const {
    callExtractAll,
    setCallExtractAll,
    updateForm,
    setUpdateForm,
    setDialogOpen,
  } = useContext(GlobalContext);
  const [destinationList, setDestinationList] = useState([]);
  const [selectedFile, setSelectedFile] = React.useState(
    updateForm ? updateForm.imgUrl : null
  );

  const initialRegionForm = {
    name: nameValue ? nameValue : "",
    description: "",
    destination: "",
    imgUrl: "",
    slug: "",
  };

  const form = useForm({
    defaultValues: updateForm
      ? { ...updateForm, destination: updateForm.destination._id }
      : initialRegionForm,
  });
  const { register, handleSubmit, setValue, watch } = form;

  const onSubmit = async (data) => {
    data = { ...data, slug: data.name.toLowerCase().replace(/\s+/g, "-") };
    const res = await submitForm(data, "region", updateForm, setNameValue);
    if (setVal) {
      setVal(data.name);
    }

    setCallExtractAll(!callExtractAll);
    setUpdateForm(null);
    setDialogOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/destination/");

        if (res?.status === 200) {
          setDestinationList(res?.data?.data);
          if (!updateForm && res?.data?.data?.length !== 0) {
            setValue("destination", res?.data?.data[0]?._id);
          }
        } else {
          toast.error("else Error getting Destinations...", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } catch (e) {
        toast.error(
          e?.response?.data?.error ||
            "Something Went Wrong. Please Try Again...",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
        setPageLevelLoader(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
      <div className="custom-modal">
        <div className="custom-modal-header">
          <p className="m-0">
            {updateForm ? "Update Region" : "Create Region"}
          </p>
          <GrClose
            onClick={() => {
              setDialogOpen(false);
              setUpdateForm(null);
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
                label="Name"
                type="text"
                variant="outlined"
                {...register("name")}
              />
              <label name="description">Description</label>
              <div className="form-floating">
                <TextareaAutosize
                  className="w-100 form-control pt-2"
                  size="large"
                  type="text"
                  variant="outlined"
                  {...register("description")}
                />
              </div>

              <div>
                <label htmlFor="destination">Choose a Destination:</label>
                <select
                  name="destination"
                  id="destination"
                  className="form-control"
                  value={watch("destination")}
                  onChange={(e) => setValue("destination", e.target.value)}>
                  {destinationList?.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  className="btn btn-success">
                  {updateForm ? "Update" : "Create"}
                </button>
              </div>
            </div>
            <UploadToCloudinary
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              label="Header Image"
              setValue={setValue}
              formName="imgUrl"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
