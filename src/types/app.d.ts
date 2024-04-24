export interface IThread {
    id?: number;
    content?: string;
    image?: IThread[];
    userId: number;
    threadId?: number;
    author?: IUser;
 }
 
 export interface IThreadImage {
    image?: string;
 }
 
 export interface IUser {
    id: number;
    username: string;
    fullname: string;
    email: string;
    profile: IProfile;
 }
 
 export interface IProfile {
    bio?: string;
    avatar?: string;
    cover?: string;
    user: IUser;
 }

