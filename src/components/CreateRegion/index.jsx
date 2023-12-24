import React, { useRef } from "react";
import { GrClose } from "react-icons/gr";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useForm } from "react-hook-form";

export default function CreateRegion({ nameValue }) {
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const openFilePicker = () => {
    inputRef.current.click();
  };
  const form = useForm();
  const { register, handleSubmit } = form;

  const submitDestination = (data) => {
    console.log("inner Form submitted", data);
  };

  return (
    <div className="">
      <div className="">
        <div className="d-flex justify-content-between p-3 ">
          <p>Create Destination</p>
          <GrClose />
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
              <TextareaAutosize
                className="w-100"
                size="large"
                label="Description"
                type="text"
                variant="outlined"
                {...register("description")}
              />
              <button type="submit" onClick={handleSubmit(submitDestination)}>
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
