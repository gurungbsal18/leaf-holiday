import React, { useContext, useEffect, useRef, useState } from "react";
import { GrClose } from "react-icons/gr";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useForm } from "react-hook-form";
import { GlobalContext } from "@/context";
import { submitForm } from "@/utils/functions";
import UploadToCloudinary from "@/components/ui/UploadToCloudinary";

export default function CreateRegion({ nameValue, setNameValue, setVal }) {
  const {
    callExtractAll,
    setCallExtractAll,
    updateForm,
    setUpdateForm,
    setDialogOpen,
  } = useContext(GlobalContext);

  const [selectedFile, setSelectedFile] = React.useState(
    updateForm ? updateForm.imgUrl : null
  );
  const [destinationList, setDestinationList] = useState([]);

  const initialRegionForm = {
    name: nameValue ? nameValue : "",
    description: "",
    destination: "",
    imgUrl: "",
    slug: "",
  };

  const form = useForm({
    defaultValues: updateForm ? updateForm : initialRegionForm,
  });
  const { register, handleSubmit, setValue } = form;

  useEffect(() => {
    fetch("http://localhost:5001/destination/")
      .then((data) => data.json())
      .then((val) => {
        setDestinationList(val);
        setValue("destination", val.data[0]._id);
      });
  }, []);

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
                <label for="destination">Choose a Destination:</label>
                <select
                  name="destination"
                  id="destination"
                  {...register("destination")}
                  className="form-control"
                >
                  {destinationList.data?.map((item) => (
                    <option
                      value={item._id}
                      selected={
                        item._id === updateForm?.destination ? true : false
                      }
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  className="btn btn-success"
                >
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
