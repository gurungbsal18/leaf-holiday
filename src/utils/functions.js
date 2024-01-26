import axios from "axios";
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

export const submitForm = async (data, apiName, updateForm, setNameValue) => {
  try {
    let res = {};
    updateForm
      ? (res = await axios.put(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/${apiName}/update/${data._id}`,
          data
        ))
      : (res = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/${apiName}/add`,
          data
        ));

    if (res.status === 200) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      if (setNameValue) {
        setNameValue(res.data.data._id);
      }
      console.log(res);
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  } catch (e) {
    toast.error(e.response.statusText, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};

export const submitPackageForm = async (
  data,
  updatePackage,
  setUpdatePackage,
  router
) => {
  try {
    let res = {};
    updatePackage
      ? (res = await axios.put(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/package/update/${updatePackage._id}`,
          data
        ))
      : (res = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/package/add`,
          data
        ));

    if (res.status === 200) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      updatePackage
        ? router.push("/admin/packages")
        : setUpdatePackage(res.data.data);
      console.log(res);
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  } catch (e) {
    toast.error(e.response.statusText, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};
