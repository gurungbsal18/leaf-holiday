import React, { useContext, useEffect, useRef, useState } from "react";
import { GrClose } from "react-icons/gr";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useForm } from "react-hook-form";
import { GlobalContext } from "@/context";
import { submitForm } from "@/utils/functions";

export default function CreateRegion({ nameValue, handleClose, setNameValue }) {
  const {
    callExtractAll,
    setCallExtractAll,
    updateForm,
    setUpdateForm,
    setCreateComponentOpen,
  } = useContext(GlobalContext);
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [destinationList, setDestinationList] = useState([]);
  const openFilePicker = () => {
    inputRef.current.click();
  };
  const initialRegionForm = {
    name: nameValue ? nameValue : "",
    description: "",
    destination: "",
    imgUrl: "",
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
    const res = await submitForm(data, "region", updateForm);

    console.log("inner Form submitted", data);
    setCallExtractAll(!callExtractAll);
    setUpdateForm(null);
    setCreateComponentOpen(false);

    if (nameValue) {
      setNameValue(data.name);
      handleClose();
    }
  };

  return (
    <div className="">
      <div className="">
        <div className="d-flex justify-content-between p-3 ">
          <p>{updateForm ? "Update Region" : "Create Region"}</p>
          <GrClose
            onClick={() => {
              setCreateComponentOpen(false);
              setUpdateForm(null);
              if (nameValue) {
                handleClose();
              }
            }}
          />
        </div>
        <form>
          <div className="d-flex gap-5">
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
              <label name="description">Description</label>
              <TextareaAutosize
                className="w-100"
                size="large"
                type="text"
                variant="outlined"
                {...register("description")}
              />

              <div>
                <label for="destination">Choose a Destination:</label>
                <select
                  name="destination"
                  id="destination"
                  {...register("destination")}>
                  {destinationList.data?.map((item) => (
                    <option
                      value={item._id}
                      selected={
                        item._id === updateForm?.destination ? true : false
                      }>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" onClick={handleSubmit(onSubmit)}>
                {updateForm ? "Update" : "Create"}
              </button>
            </div>
            <div className="border-2 border-black">
              <p>Photo</p>
              {selectedFile ? (
                <div>
                  <p onClick={openFilePicker}>File Selected </p>
                  <p>{selectedFile.name}</p>
                  <p onClick={() => setSelectedFile(null)}>Remove Image</p>
                </div>
              ) : (
                <MdOutlineAddPhotoAlternate
                  className="h3 cursor-pointer"
                  onClick={openFilePicker}
                />
              )}
              <input
                type="file"
                ref={inputRef}
                style={{ display: "none" }}
                onChange={(e) => {
                  // Handle selected file here
                  setSelectedFile(e.target.files[0]);
                  console.log("Selected file:", selectedFile);
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
