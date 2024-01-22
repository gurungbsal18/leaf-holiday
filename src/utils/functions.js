import { GlobalContext } from "@/context";
import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";

export const uploadImage = async (formData) => {
  formData.append("upload_preset", "uploadPreset");
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (response.ok) {
    const data = await response.json();
    const res = {
      success: true,
      imageUrl: data.secure_url,
      message: "Image Uploaded Successfully",
    };
    return res;
  } else {
    const res = {
      success: false,
      message: "Unable to Upload Image to Cloudinary!!!",
    };
    return res;
  }
};

export const submitForm = async (data, apiName, updateForm) => {
  try {
    let res = {};
    updateForm
      ? (res = await axios.put(
          `http://localhost:5001/${apiName}/update/${data._id}`,
          data
        ))
      : (res = await axios.post(`http://localhost:5001/${apiName}/add`, data));

    if (res.status === 200) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  } catch (e) {
    toast.error(e.response.request.statusText, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};
