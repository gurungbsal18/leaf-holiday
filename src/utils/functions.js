import { toast } from "react-toastify";
import axios from "./axios";

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

export const submitForm = async (
  data,
  apiName,
  updateForm,
  setNameValue,
  verify
) => {
  try {
    let res = {};
    updateForm
      ? verify
        ? (res = await axios.put(`/${apiName}/update/${data._id}`, {
            ...data,
            isVerified: true,
          }))
        : (res = await axios.put(`/${apiName}/update/${data._id}`, data))
      : (res = await axios.post(`/${apiName}/add`, data));
    console.log(res);

    if (res.status === 200) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      if (setNameValue) {
        setNameValue(res.data.data._id);
      }
      return res;
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return res;
    }
  } catch (e) {
    console.log(e);
    toast.error(
      e?.response?.data?.error || "Something Went Wrong. Please Try Again...",
      {
        position: toast.POSITION.TOP_RIGHT,
      }
    );
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
      ? (res = await axios.put(`/package/update/${updatePackage._id}`, data))
      : (res = await axios.post(`/package/add`, data));
    console.log(res);

    if (res.status === 200) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      updatePackage
        ? router.push("/admin/packages")
        : setUpdatePackage(res.data.data);
      res;
    } else {
      toast.error(res?.message || "Something went wrong. Please try again!!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  } catch (e) {
    toast.error(e.response.statusText, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};

export const averageReview = (reviews) => {
  if (reviews?.length === 0) {
    return 0; // Return 0 if there are no reviews to avoid division by zero
  }

  // Calculate the sum of stars
  const sumStars = reviews?.reduce(
    (accumulator, review) => accumulator + review?.stars,
    0
  );

  // Calculate the average stars
  const averageStars = sumStars / reviews?.length;

  return averageStars;
};

export const priceCalculator = (priceRange, guestNumber) => {
  if (priceRange?.length === 0) {
    return 0;
  }
  for (let i = 0; i < priceRange?.length; i++) {
    if (guestNumber <= Number(priceRange[i]?.numberOfPeople?.split("-")[1])) {
      return priceRange[i].price;
    }
  }
  return 0;
};

export const isImage = (url) => {
  return url.includes("/image/upload");
};

export const getId = (searchName, dataArray, searchBy) => {
  for (let i = 0; i < dataArray?.length; i++) {
    if (dataArray[i][searchBy] === searchName) {
      return dataArray[i]?._id;
    }
  }
  return "Invalid Name";
};

export function toTitleCase(input) {
  if (typeof input !== "string") {
    throw new Error("Input must be a string");
  }

  return input
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getEmbeddedYouTubeUrl(url) {
  // Regular expression to match YouTube video ID in the specified URL format
  const regex = /[?&]v=([^&]+)/;

  // Extract video ID from the URL using the regular expression
  const match = url.match(regex);

  if (match && match[1]) {
    const videoId = match[1];
    // Construct the embedded YouTube URL
    const embeddedUrl = `https://www.youtube.com/embed/${videoId}`;
    return embeddedUrl;
  } else {
    // Handle invalid YouTube URL
    return "Invalid YouTube URL";
  }
}
export function getNameById(id, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === id) {
      return array[i].name;
    }
  }
  // Return null or any other default value if the ID is not found
  return null;
}
