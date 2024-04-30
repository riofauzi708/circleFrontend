import { Avatar, Box, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { IUser } from '../../types/app'
import { suggestUserAPI } from '../../libs/Api/Call/user'
import FollowButton from '../FollowButton'

const SuggestionCard: React.FC = () => {
  const _host_url = "http://localhost:5000/uploads/"
  const [ isSugested, setIsSugested ] = useState<IUser[]>([])

  const checkToken = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await suggestUserAPI(token);
        setIsSugested(res.data.data);
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    checkToken();
  }, [])

  return (
    <>
      <Box
        borderRadius={'8px'}
        w={'90%'}
        bg={'#262626'}
        maxHeight={'fit-content'}
        m={'auto'}
        overflowY={ "auto"}
        style={{
          scrollbarWidth: "none",
        }}
        maxH={" 250px"}
        mt={'20px'}
      >
        <Box px={25} py={6}>
          <Text fontWeight={'bold'}>Suggestions For You</Text>
        </Box>


      {isSugested.map((user) => (
        <Box 
        style={{ marginTop: "-20px" }}
        justifyContent={"space-between"}
        px={20}
        display={'flex'}
        alignItems={'center'}
        >
        <Avatar src={_host_url + user?.profile?.avatar}
        w={"40px"} 
        h={"40px"}
        borderRadius={'100%'}
        />

        <Box pl={"10px"} pr={"10px"} mr={"auto"}>
          <Text style={{ textWrap: "wrap", wordBreak: "break-all"}} fontWeight="bold">
              {user?.fullname}
            </Text>
          <Text style={{ marginTop: "-16px"}} fontSize={"14px"} color={"gray"}>@{user?.username}</Text>
        </Box>
        <FollowButton userId={user.id}/>
        </Box>
      ))}


    </Box>
    </>
  )
}

export default SuggestionCard
