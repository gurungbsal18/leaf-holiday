"use client";
import TextEditor from "@/components/TextEditor";
import UploadToCloudinary from "@/components/ui/UploadToCloudinary";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditPageGallery from "@/components/ui/EditPageGallery";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import axios from "@/utils/axios";
import { toast } from "react-toastify";
import { GlobalContext } from "@/context";
import PageLevelLoader from "@/components/Loader/PageLevelLoader";

export default function EditAboutUs() {
  const { pageLevelLoader, setPageLevelLoader } = useContext(GlobalContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [callUpdate, setCallUpdate] = useState(false);
  const [documentImages, setDocumentImages] = useState(null);

  //initial form data for adding edit page on the server for the first time
  const initialFormData = {
    imageUrl: "",
    aboutUs: "",
    ourStory: "",
    ourMission: "",
    ourService: "",
    whyLeaf: "",
    conclusion: "",
    document: [],
  };

  //helper array to map the similar fields
  const mapFormItems = [
    {
      label: "About Us Content",
      name: "aboutUs",
    },
    {
      label: "Our Story Content",
      name: "ourStory",
    },
    {
      label: "Our Mission Content",
      name: "ourMission",
    },
    {
      label: "Our Services Content",
      name: "ourService",
    },
    {
      label: "Why Leaf Content",
      name: "whyLeaf",
    },
    {
      label: "Conclusion",
      name: "conclusion",
    },
  ];

  //unpacking the useform for form manipulation
  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: initialFormData,
  });

  //submit form on server
  const onSubmit = async (data) => {
    try {
      setPageLevelLoader(true);
      let res;
      callUpdate
        ? (res = await axios.put(`/aboutUs/update/${data._id}`, data))
        : (res = await axios.post(`/aboutUs/add`, data));
      if (res.status === 200) {
        toast.success(
          res?.data?.message || "About Us Page Published Successfully",
          { position: toast.POSITION.TOP_RIGHT }
        );
        setPageLevelLoader(false);
        getData();
      } else {
        toast.error(
          res?.message || "Something went wrong. Please try again !!!",
          { position: toast.POSITION.TOP_RIGHT }
        );
        setPageLevelLoader(false);
      }
    } catch (e) {
      toast.error(
        e?.response?.data?.error ||
          "Something went wrong. Please try again !!!",
        { position: toast.POSITION.TOP_RIGHT }
      );
      setPageLevelLoader(false);
    }
  };

  //get form values from server
  const getData = async () => {
    try {
      setPageLevelLoader(true);
      const res = await axios.get(`/aboutUs/`);

      if (res?.data?.data?.length > 0) {
        setSelectedImage(res.data.data[0].imageUrl);
        reset(res.data.data[0]);
        setCallUpdate(true);
        setDocumentImages(res.data.data[0].document);
      } else {
        setDocumentImages([]);
      }
      setPageLevelLoader(false);
    } catch (e) {
      toast.error(
        e?.response?.data?.error ||
          "Something went wrong. Please try again !!!",
        { position: toast.POSITION.TOP_RIGHT }
      );
      setPageLevelLoader(false);
    }
  };

  //get data from the server on mount
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {pageLevelLoader ? (
        <PageLevelLoader />
      ) : (
        <div className="dashboard-content-section p-4">
          <div className="d-flex justify-content-between mb-4">
            <div className="d-flex align-items-center gap-2">
              <Link href="/admin/pages">
                <ArrowBackIcon />
              </Link>
              <h4 className="m-0">Edit About Us Page</h4>
            </div>

            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="btn btn-success"
            >
              <FileUploadIcon /> Publish
            </button>
          </div>
          <div className="d-flex justify-content-between">
            <div className="col-8 pe-4">
              {mapFormItems.map((item) => (
                <div key={item.name} className="mb-5">
                  <label htmlFor={item.name} className="mb-3">
                    {item.label}
                  </label>
                  <TextEditor control={control} name={item.name} />
                </div>
              ))}
            </div>
            <div className="col-4">
              <UploadToCloudinary
                selectedFile={selectedImage}
                setSelectedFile={setSelectedImage}
                label="Header Image"
                setValue={setValue}
                formName="imageUrl"
              />
              {documentImages && (
                <EditPageGallery
                  documentImages={documentImages}
                  setValue={setValue}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
