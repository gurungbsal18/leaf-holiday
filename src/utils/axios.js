import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export default axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_NODE_ENV === "development"
      ? "http://localhost:5001/"
      : "https://leaf-backend.sushilbalami.com.np/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
