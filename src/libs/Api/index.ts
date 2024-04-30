import axios from 'axios';

const baseURL = 'http://localhost:5000/';

const API = axios.create({
  baseURL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const follow = async (followerId: number, followingId: number) => {
  try {
    const existingFollow = await API.get(`follow/${followingId}`);

    if (existingFollow.data.status === "success") {
      await API.delete(`follow/${followingId}`);
      return "unfollowing successful";
    }

    await API.post(`follow`, { followerId, followingId });
    return "following successful";
  } catch (error) {
    console.log(error);
    throw new Error("Follow/unfollow failed");
  }
};

export default API;