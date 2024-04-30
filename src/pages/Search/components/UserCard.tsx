import React from 'react';

interface IUser {
  id: number;
  username: string;
  fullname: string;
  profile?: {
    id?: number;
    avatar?: string | null;
  };
}

interface UserCardProps {
  user: IUser;
  avatarDefault: string;
  _host_url: string;
  follow: boolean;
  handleLikeClick: () => void;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  avatarDefault,
  _host_url,
  follow,
  handleLikeClick,
}) => {
  return (
    <div className="w-280px flex justify-between gap-2 my-1 p-3">
      <div className="flex gap-2">
        <img
          className="h-12 w-12 rounded-full"
          src={user.profile?.avatar ? `${_host_url}${user.profile.avatar}` : avatarDefault}
          alt="Avatar"
        />
        <div className="flex flex-col justify-start">
          <p className="text-base">{user.username}</p>
          <p className="text-gray-500">@{user.fullname}</p>
        </div>
      </div>

      <button
        className="border border-white mt-3 px-4 py-1 rounded-full text-sm"
        onClick={handleLikeClick}
      >
        {follow ? 'Following' : 'Follow'}
      </button>
    </div>
  );
};

export default UserCard;