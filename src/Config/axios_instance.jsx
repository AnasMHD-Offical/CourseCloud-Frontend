import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
//Configuring the base url of CourseCloud server API
export const axios_instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios instance request
axios_instance.interceptors.request.use(
  async (config) => {
    const access_token = Cookies.get("student_access_token" || "instructor_access_token" || "admin_access_token"); // get stored access token
    console.log(access_token);

    if (access_token) {
      config.headers["Authorization"] = `Bearer ${access_token}`; // set in header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios_instance.interceptors.response.use(
  (response) => {
    console.log("in axios response interceptor ===>", response);
    if (response?.data?.access_token) {
      let role_access_token = `${response?.data?.role}_access_token`
      Cookies.set(role_access_token, response?.data?.access_token, {
        expires: .0045,
      });
      console.log("Access token set in cookies storage");
    }
    return response;
  },
  async (error) => {
    const original_request = error.config;

    if (
      error.response.status === 403 &&
      error.response.data.message ===
        "Refresh token expired . Login to your account" &&
      !original_request._retry
    ) {
      // Clear the local storage or cookies where tokens are stored
      localStorage.clear()
      Cookies.remove();
      Cookies.remove();
      // document.cookie =
      //   "user_refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"; // Correct way to clear the cookie

      // Redirect the user to the login page
      if(error?.response?.data?.role === "student"){
        window.location.href = "/";
      }else if(error?.response?.data?.role === "instructor"){
        window.location.href = "/instructor";
      }else if(error?.response?.data?.role === "admin"){
        window.location.href = "/admin/login"
      }

      return Promise.reject(error);
    } else if(error.response.status === 401 && error.response.data.message === "Token Error. Token not found") {
      try {
        const response = await axios_instance.post(
          "/api/refresh_token",
          {},
          {
            withCredentials: true,
          }
        );
        console.log(response);
        console.log(response?.data?.role);

        // Set the new Authorization header
        axios_instance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response?.data?.access_token}`;

        return axios_instance(original_request); // Retry the original request
      } catch (error) {
        console.log("Error refreshing token:", error);
        return Promise.reject(error);
      }
    }else{
        return Promise.reject(error);
    }

  }
);
    //     // Handle other cases, like trying to refresh the access token
    //     if (
    //       error.response.status === 401 &&
    //       error.response.data.message === "Not authorized, token failed" &&
    //       !original_request._retry
    //     ) {
    //       original_request._retry = true;

    //       try {
    //         const response = await axios_instance.post(
    //           "/api/refresh_token",
    //           {},
    //           {
    //             withCredentials: true,
    //           }
    //         );
    //         console.log(response);

    //         // Set the new Authorization header
    //         axios_instance.defaults.headers.common[
    //           "Authorization"
    //         ] = `Bearer ${response?.data?.access_token}`;

    //         return axios_instance(original_request); // Retry the original request
    //       } catch (error) {
    //         console.log("Error refreshing token:", error);
    //         return Promise.reject(error);
    //       }
    //     }

    //     return Promise.reject(error);
