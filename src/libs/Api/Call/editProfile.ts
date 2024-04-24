import API from "..";

export const editProfileAPI = async (formData: FormData) => {
  try {
    const res = await API.patch("profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}