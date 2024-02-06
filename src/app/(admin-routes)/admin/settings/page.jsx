"use client";
import React, { useContext, useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useForm } from "react-hook-form";
import { GlobalContext } from "@/context";

import { submitForm } from "@/utils/functions";
import TextEditor from "@/components/TextEditor";
import UploadToCloudinary from "@/components/ui/UploadToCloudinary";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Settings() {
  const {
    setPageLevelLoader,
    pageLevelLoader,
    callExtractAll,
    setCallExtractAll,
    updatePackage,
  } = useContext(GlobalContext);

  const [settingDetail, setSettingDetail] = useState(null);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const initialFormData = {
    email: "",
    phoneNumber: "",
    options: "",
    location: "",
    homeFeatureText: "",
    homeFeatureLink: "",
    logo: "",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    youtube: "",
  };

  const form = useForm({
    defaultValues: initialFormData,
  });
  const { register, handleSubmit, setValue, reset } = form;

  const onSubmit = async (data) => {
    // const res = await submitForm(data, "setting", updatePackage);
    console.log(data);
  };

  const getSettingsData = async () => {
    setPageLevelLoader(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/setting/`
      );
      if (res.status === 200) {
        setSettingDetail(res?.data?.data);
        setSelectedFile(res?.data?.data?.logo);
        setPageLevelLoader(false);
        reset(res?.data?.data);
      }
    } catch (e) {
      console.log(e);
      setPageLevelLoader(false);
    }
  };
  useEffect(() => {
    // getSettingsData()
  }, []);

  return (
    <div className="">
      <div className="">
        <div className="d-flex justify-content-between p-3 ">
          <p>{updatePackage ? "Update Blog" : "Create Blog"}</p>
          <button type="submit" onClick={handleSubmit(onSubmit)}>
            {updatePackage ? "Update" : "Create"}
          </button>
        </div>
        <form>
          <div className="d-flex gap-5">
            <div className="d-flex flex-column gap-2">
              {leftDivData.map((item) => (
                <TextField
                  key={item.id}
                  required
                  fullWidth
                  size="small"
                  label={item.label}
                  type="text"
                  variant="outlined"
                  {...register(item.id)}
                />
              ))}
              <UploadToCloudinary
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                label="Logo"
                setValue={setValue}
                formName="logo"
              />
            </div>
            <div className="d-flex flex-column gap-2">
              {rightDivData.map((item) => (
                <TextField
                  key={item.id}
                  required
                  fullWidth
                  size="small"
                  label={item.label}
                  type="text"
                  variant="outlined"
                  {...register(item.id)}
                />
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

const leftDivData = [
  { id: "email", label: "Email" },
  { id: "phoneNumber", label: "Phone Number" },
  { id: "location", label: "Location" },
  { id: "homeFeatureText", label: "Homepage Feature Text" },
  { id: "homeFeatureLink", label: "Homepage Feature Link" },
];
const rightDivData = [
  { id: "facebook", label: "Facebook" },
  { id: "instagram", label: "Instagram" },
  { id: "twitter", label: "Twitter" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "youtube", label: "Youtube" },
];
