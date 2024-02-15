"use client";
import React, { useContext, useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Controller, useForm } from "react-hook-form";
import { GlobalContext } from "@/context";
import { toast } from "react-toastify";
import { submitForm } from "@/utils/functions";
import UploadToCloudinary from "@/components/ui/UploadToCloudinary";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import axios from "@/utils/axios";

export default function Settings() {
  const { setPageLevelLoader, pageLevelLoader } = useContext(GlobalContext);

  const [settingDetail, setSettingDetail] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const initialFormData = {
    email: "",
    phoneNumber: "",
    location: "",
    homepageFeatureText: "",
    homepageFeatureLink: "",
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
  const { register, handleSubmit, setValue, control, reset } = form;

  const onSubmit = async (data) => {
    const res = await submitForm(data, "setting", isUpdate);
  };

  const getSettingsData = async () => {
    setPageLevelLoader(true);
    try {
      const res = await axios.get(`/setting/`);
      res;
      if (res.status === 200) {
        const settingData = res.data?.data;

        if (settingData.length > 0) {
          setIsUpdate(true);
          setSettingDetail(settingData[0]);
          setSelectedFile(settingData[0]?.logo);
          setPageLevelLoader(false);
          reset(settingData[0]);
        }
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
    getSettingsData();
  }, []);

  return (
    <>
      {pageLevelLoader ? (
        <PageLevelLoader />
      ) : (
        <div className="">
          <div className="">
            <div className="d-flex justify-content-between p-3 ">
              <p>{isUpdate ? "Update Settings" : "Create Settings"}</p>
              <button type="submit" onClick={handleSubmit(onSubmit)}>
                {isUpdate ? "Update" : "Create"}
              </button>
            </div>
            <form>
              <div className="d-flex gap-5">
                <div className="d-flex flex-column gap-2">
                  {leftDivData.map((item) => (
                    <Controller
                      key={item.id}
                      name={item.id}
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextField
                          size="small"
                          label={item.label}
                          onBlur={onBlur}
                          onChange={onChange}
                          value={value}
                        />
                      )}
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
                    <Controller
                      key={item.id}
                      name={item.id}
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextField
                          size="small"
                          label={item.label}
                          onBlur={onBlur}
                          onChange={onChange}
                          value={value}
                        />
                      )}
                    />
                  ))}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

const leftDivData = [
  { id: "email", label: "Email" },
  { id: "phoneNumber", label: "Phone Number" },
  { id: "location", label: "Location" },
  { id: "homepageFeatureText", label: "Homepage Feature Text" },
  { id: "homepageFeatureLink", label: "Homepage Feature Link" },
];
const rightDivData = [
  { id: "facebook", label: "Facebook" },
  { id: "instagram", label: "Instagram" },
  { id: "twitter", label: "Twitter" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "youtube", label: "Youtube" },
];
