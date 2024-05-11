import API from "..";

export const getProfileAPI = async (token: string) => {
  return await API.get("profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

type TBody = {
  [key: string]: string | File | null | undefined;
};

interface IBody extends TBody {
  bio?: string | null;
  avatar?: File | null;
  cover?: File | null;
}

export const updateProfileAPI = async (token: string, body: IBody) => {
  const formData = new FormData();

  if (body.avatar) {
    formData.append("avatar", body.avatar);
  }
  if (body.cover) {
    formData.append("cover", body.cover);
  }
  if (body.bio) {
    formData.append("bio", body.bio);
  }

  Object.keys(body).map((key) => {
    if (body[key]) {
      formData.append(key, body[key] as Blob);
    }
  });

  return await API.put("profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getProfileUserAPI = async (userId: string) => {
  return await API.get(`profile/${userId}`);
};
