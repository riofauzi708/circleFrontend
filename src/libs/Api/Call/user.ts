import API from "..";

interface ILoginData {
    email: string;
    username: string;
    password: string;
}

interface IRegisterData {
    fullname: string;
    username: string;
    email: string;
    password: string;
}

export const getLoginAPI = async (data: ILoginData) => {
    return await API.post("login", data);
}

export const getRegisterAPI = async (data: IRegisterData) => {
    return await API.post("register", data);
}

export const getUsersAPI = async ( token: string ) => {
    return await API.get("users", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}