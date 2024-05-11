interface IThread {
  id: number;
  content: string;
  image?: { image: string }[];
  userId?: number;
  author?: {
    id: number;
    fullname: string;
    username: string;
    profile?: {
      id?: number;
      avatar?: string | null;
    };
  };
  _count?: {
    like?: number;
    replies?: number;
  };
}

export interface IThreadImage {
  image?: string;
}

export interface IUser {
  id: number;
  username: string;
  fullname: string;
  avatar?: string;
  cover?: string;
  thread?: Thread[];
  profile?: IProfile;
  _count?: {
    follower?: number;
    following?: number;
  };
  followers?: IFollow[];
  following?: IFollow[];
}

export interface IProfile {
  id?: number;
  bio?: string;
  avatar?: string;
  cover?: string;
  user: IUser;
}

export interface IFollow {
  followerId: number[];
  followingId: number[];
}

export interface IFollowerUser {
  id: number;
  username: string;
  fullname: string;
  profile: {
    avatar: string;
  };
}
