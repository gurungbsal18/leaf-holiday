"use client";
import React, { useContext, useRef } from "react";
import { GrClose } from "react-icons/gr";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useForm } from "react-hook-form";
import { GlobalContext } from "@/context";
import axios from "axios";
import { toast } from "react-toastify";

export default function CreateDestination() {
  const {
    updateForm,
    setUpdateForm,
    setCreateComponentOpen,
    callExtractAll,
    setCallExtractAll,
  } = useContext(GlobalContext);
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const openFilePicker = () => {
    inputRef.current.click();
  };

  const initialDestinationData = {
    name: "",
    description: "",
    imageUrl: "",
  };

  const form = useForm({
    defaultValues: updateForm ? updateForm : initialDestinationData,
  });
  const { register, handleSubmit } = form;

  const submitDestination = async (data, event) => {
    if (updateForm) {
      const res = await axios.put(
        `http://localhost:5001/destination/update/${data._id}`,
        data
      );
      if (res.status === 200) {
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      const res = await axios.post(
        "http://localhost:5001/destination/add",
        data
      );
      if (res.status === 200) {
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      console.log(res);
    }
    console.log("inner Form submitted", data);
    setCallExtractAll(!callExtractAll);
    setUpdateForm(null);
    setCreateComponentOpen(false);
  };

  return (
    <div className="custom-modal">
      <div className="d-flex justify-content-between p-3 align-items-center">
        <p>{updateForm ? "Update Destination" : "Create Destination"}</p>
        <GrClose
          onClick={() => {
            setUpdateForm(null);
            setCreateComponentOpen(false);
          }}
        />
      </div>
      <form className="p-3">
        <div className="d-flex gap-5">
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
            <TextareaAutosize
              className="w-100 form-control"
              size="large"
              label="Description"
              type="text"
              variant="outlined"
              {...register("description")}
            />
            <button
              className="btn btn-success"
              type="submit"
              onClick={handleSubmit(submitDestination)}
            >
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
  );
}
