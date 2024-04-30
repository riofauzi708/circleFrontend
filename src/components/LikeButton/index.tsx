import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../store'
import API from '../../libs/Api'
import { Box, Text } from '@chakra-ui/react'
import { AiOutlineHeart } from 'react-icons/ai'

interface ILikeButtonProps {
  threadId: number,
  count: number,
  callback?: any
}

const LikeButton: React.FC<ILikeButtonProps> = ({ threadId , count, callback }) => {
  useAppSelector((state) => state.auth)
  const [Liked, setLiked] = useState(false)

  const getLike = async () => {
    try {
      const res = await API.get(`like/${threadId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      console.log(res);

      setLiked(res.data.data.like === null ? false : true ) 
    } catch (error) {
      console.log(error);
    }
  }

  const handleLike = async () => {
    try {
      const res = await API.post(`like`, {
        threadId
      },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      console.log(res);
      getLike()
      callback()
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getLike()
  }, [])

  return (
    <>
      <Box aria-label="delete" onClick={() => handleLike()}
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          gap: "5px"
        }}
      >
        <AiOutlineHeart style={{ width: "20px", height: "20px", color: Liked ? "red" : "gray" }} />
        <Text>{count}</Text>
      </Box>
    </>
  )
}

export default LikeButton