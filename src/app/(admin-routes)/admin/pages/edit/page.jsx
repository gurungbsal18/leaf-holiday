"use client";
import TextEditor from "@/components/TextEditor";
import UploadToCloudinary from "@/components/ui/UploadToCloudinary";
import { GlobalContext } from "@/context";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditPageGallery from "@/components/ui/EditPageGallery";

export default function EditPage() {
  const { updatePageName } = useContext(GlobalContext);
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
    let res;
    callUpdate
      ? (res = await axios.put(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/aboutUs/update/${data._id}`,
          data
        ))
      : (res = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/aboutUs/add`,
          data
        ));
    console.log(res);
    if (res.status === 200) {
      getData();
    }
  };

  //get form values from server
  const getData = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/aboutUs/`
    );

    if (res?.data?.data?.length > 0) {
      setSelectedImage(res.data.data[0].imageUrl);
      reset(res.data.data[0]);
      setCallUpdate(true);
      setDocumentImages(res.data.data[0].document);
      console.log(res.data);
    } else {
      setDocumentImages([]);
    }
  };
  console.log("Doc images: ", documentImages);

  //get data from the server on mount
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="d-flex justify-content-between ">
        <Link href="/admin/pages">
          <ArrowBackIcon />
        </Link>
        <h1>Edit {updatePageName === "aboutUs" ? "About Us" : "Home"} Page</h1>

        <button type="submit" onClick={handleSubmit(onSubmit)}>
          {callUpdate ? "update" : "publish"}
        </button>
      </div>
      <div className="d-flex">
        <div>
          {mapFormItems.map((item) => (
            <div>
              <label htmlFor={item.name}>{item.label}</label>
              <TextEditor control={control} name={item.name} />
            </div>
          ))}
        </div>
        <div>
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
  );
}
