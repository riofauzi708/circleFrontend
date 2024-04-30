import API from '..'

export const getThreadAPI = async () => {
    return await API.get('threads')
}

console.log(getThreadAPI());


export const createThreadAPI = async (body: {
  content: string;
  image: FileList | null;
  threadId?: number;
}) => {
  const formData = new FormData();

  if (body.image !== null) {
     for (let i = 0; i < body.image.length; i++) {
        formData.append("image", body.image[i]);
     }
     // formData.append("image", body.image);
  }

  if (body.threadId) {
     formData.append("threadId", body.threadId.toString());
  }

  formData.append("content", body.content);

  return await API.post("thread", formData, {
     headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
     },
  });
};

  export const getThreadByIdAPI = async (Id: number) => {
    return await API.get(`thread/${Id}`)
  }

  export const getRepliesAPI = async (id: number) => {
    return await API.get(`replies/${id}`, {
       headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
       },
    });
 };

 export const deleteThreadAPI = async (id: number) => {
    return await API.delete(`thread/${id}`, {
       headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
       },
    });
 };