import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../store'
import API from '../../libs/Api'
import { Button } from '@chakra-ui/react'

interface ILikeButtonProps {
  userId: number,
  callback?: any
}

const LikeButton: React.FC<ILikeButtonProps> = ({ userId , callback }) => {
  useAppSelector((state) => state.auth)
  const [isFollow, setIsFollow] = useState(false)

  const getFollower = async () => {
    try {
      const res = await API.get(`check-follow/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )

      setIsFollow(res.data.data) 
    } catch (error) {
      console.log(error);
    }
  }

  const handleFollow = async () => {
    try {
      const res = await API.post(`follow`, {
        followingId: userId
      },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )

      console.log(res);
      await getFollower()
      callback()
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getFollower()
  }, [userId])

  return (
    <>
      <Button
      style={{
        marginLeft: "50px",
        borderRadius: "20px",
        padding: "5px 15px",
        fontSize: "12px",
        fontWeight: "bold",
        cursor: "pointer",
        backgroundColor: isFollow ? "transparent" : "#1d1d1d",
      }}
      onClick={handleFollow}
    >
      {isFollow ? "Unfollow" : "Follow"}
    </Button>
    </>
  )
}

export default LikeButton