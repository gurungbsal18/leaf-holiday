"use client";
import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import { GlobalContext } from "@/context";
import { toast } from "react-toastify";
import { submitForm } from "@/utils/functions";
import UploadToCloudinary from "@/components/ui/UploadToCloudinary";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";
import axios from "@/utils/axios";

export default function Settings() {
  const {
    setPageLevelLoader,
    pageLevelLoader,
    callExtractAll,
    setCallExtractAll,
  } = useContext(GlobalContext);

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
  const { handleSubmit, setValue, control, reset } = form;

  const onSubmit = async (data) => {
    setPageLevelLoader(true);
    try {
      let res = {};
      isUpdate
        ? (res = await axios.put(`/setting/update/${data._id}`, data))
        : (res = await axios.post(`/setting/add`, data));

      if (res.status === 200) {
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setCallExtractAll(!callExtractAll);
      } else {
        toast.error(
          res?.message || "Something Went Wrong. Please Try Again...",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
        setPageLevelLoader(false);
      }
    } catch (e) {
      toast.error(
        e?.response?.data?.error || "Something Went Wrong. Please Try Again...",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
      setPageLevelLoader(false);
    }
  };

  useEffect(() => {
    const getSettingsData = async () => {
      setPageLevelLoader(true);
      try {
        const res = await axios.get(
          "https://leaf-holiday-backend.vercel.app/setting/"
        );

        if (res.status === 200) {
          const settingData = res.data?.data;
          if (settingData.length > 0) {
            setIsUpdate(true);
            setSelectedFile(settingData[0]?.logo);
            reset(settingData[0]);
          }
          setPageLevelLoader(false);
        } else {
          toast.error("Something Went Wrong. Please Try Again...", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setPageLevelLoader(false);
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
    getSettingsData();
  }, [callExtractAll]);

  return (
    <>
      {pageLevelLoader ? (
        <PageLevelLoader />
      ) : (
        <div className="p-4">
          <div className="">
            <div className="d-flex justify-content-between mb-4">
              <h4 className="title m-0">
                {isUpdate ? "Update Settings" : "Create Settings"}
              </h4>
              <button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                className="btn btn-sm btn-success"
              >
                {isUpdate ? "Update" : "Create"}
              </button>
            </div>
            <form>
              <div className="row gap-5">
                <div className="col-4 d-flex flex-column gap-4">
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
                </div>
                <div className="col d-flex flex-column gap-4">
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
              <div className="upload-logo my-5 bg-light p-3 rounded">
                <UploadToCloudinary
                  selectedFile={selectedFile}
                  setSelectedFile={setSelectedFile}
                  label="Logo"
                  setValue={setValue}
                  formName="logo"
                />
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
