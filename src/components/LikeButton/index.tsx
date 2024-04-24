import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../store'
import API from '../../libs/Api'
import { Box, Text } from '@chakra-ui/react'
import { BsHeartFill } from 'react-icons/bs'

interface ILikeButtonProps {
    threadId: number
}

const LikeButton: React.FC<ILikeButtonProps> = ({ threadId }) => {
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

            setLiked(res.data.data.like === null ? false : true)
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
                await getLike()
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
        <BsHeartFill style={{ width: "20px", height: "20px", color: Liked ? "red" : "gray"}}/>
        <Text>1.1k Like</Text>
    </Box>
    </>
  )
}

export default LikeButton
