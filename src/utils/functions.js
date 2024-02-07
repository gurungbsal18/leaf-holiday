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

export const submitForm = async (data, apiName, updateForm, setNameValue, verify) => {
  try {
    let res = {};
    updateForm
      ?
      verify ? (res = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/${apiName}/update/${data._id}`,
        {...data, isVerified: true}
      )): (res = await axios.put(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/${apiName}/update/${data._id}`,
          data
        ))
      : (res = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/${apiName}/add`,
          data
        ));
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
    toast.error("Something Went Wrong. Please Try Again!!!", {
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
      res;
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
  for (let i = 0; i < priceRange?.length; i++) {
    if (guestNumber <= Number(priceRange[i]?.numberOfPeople?.split("-")[1])) {
      return priceRange[i].price;
    }
  }
};

export const isImage = (url) => {
  // Regular expression to match common image file extensions
  const imageRegex =
    /\.(jpg|jpeg|png|gif|bmp|tiff|webp|svg|jfif|pjpeg|pjp|ico|heif|bat|raw|indd)$/i;

  // Test if the URL ends with a recognized image file extension
  return imageRegex.test(url);
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
  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
  }

  return input
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
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
    return 'Invalid YouTube URL';
  }
}
