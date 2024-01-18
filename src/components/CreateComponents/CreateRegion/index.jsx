import React, { useContext, useRef } from "react";
import { GrClose } from "react-icons/gr";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useForm } from "react-hook-form";
import { GlobalContext } from "@/context";
import { top100Films } from "@/app/(admin-routes)/admin/packages/page";

export default function CreateRegion({ nameValue, handleClose, setValue }) {
  const { createComponentOpen, setCreateComponentOpen } =
    useContext(GlobalContext);
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const openFilePicker = () => {
    inputRef.current.click();
  };
  const form = useForm();
  const { register, handleSubmit } = form;

  const submitRegion = (data) => {
    if (nameValue) {
      setValue(data.name);
      handleClose();
    }
    console.log("inner Form submitted", data);
    setCreateComponentOpen(false);
  };

  return (
    <div className="">
      <div className="">
        <div className="d-flex justify-content-between p-3 ">
          <p>Create Region</p>
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
          <div className="d-flex gap-5">
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
                  {top100Films.map((item) => (
                    <option value={item.label}>{item.label}</option>
                  ))}
                </select>
              </div>

              <button type="submit" onClick={handleSubmit(submitRegion)}>
                Create
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
