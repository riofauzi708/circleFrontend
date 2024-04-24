import { Text, Box, Image, Avatar} from "@chakra-ui/react"
import { useAppSelector } from "../../store"
import EditForm from "./components/EditForm"

function Profile() {
  const profile = useAppSelector((state) => state.auth.user)
  const _host_url = "http://localhost:5000/uploads/"

  return (
      <>
        <Box 
        borderRadius={"8px"} 
        w={"90%"} 
        bg={"#262626"}
        maxHeight={"fit-content"}
        m={"auto"}
        >
            <Box px={16} py={6}>
            <Text fontWeight="bold">
        My Profile
      </Text>
      <Box>
        <Box>
          <Image src={_host_url + profile?.cover}
          alt="Cover Photo" width="100%" height={"fit-content"} objectFit="cover" 
          style={{ borderRadius: "8px" }}
          borderRadius={"8px"}
          />
          <Avatar
            width={"100px"}
            height={"100px"}
            name='avatar'
            src={_host_url + profile?.avatar}
            borderRadius={'100%'}
            border={"5px solid #262626"}
            style={{ marginTop: "-50px", marginLeft: "12px" }}
            />
            
            <EditForm />

        </Box>
        <Box>
          <Text style={{ marginTop: "0px" }} fontWeight="bold" fontSize="20px">
            {profile?.user.fullname}
          </Text>
          <Text style={{ marginTop: "-15px" }} color="gray" fontSize="16px">
            @{profile?.user.username}
          </Text>
        <Text style={{ marginTop: "-10px" }} fontSize="18px" textAlign="start">
            {profile?.bio}
        </Text>
        </Box>
        <Box style={{ marginTop: "-15px" }} display={"flex"} alignItems="center" gap={"4px"}
         fontSize={"18px"}
        >
          <Text fontWeight="bold" pr={2}>235</Text>
          <Text color="gray" pr={5}>Following</Text>
          <Text fontWeight="bold" pl={5}>1.5k</Text>
          <Text color="gray" pr={2}>Followers</Text>
        </Box>
    </Box>
    </Box>
    <Box>
      <Text fontWeight="bold" fontSize="16px" mt={5} mb={2}>My Posts</Text>
    </Box>
    </Box>
      </>

  )
}

export default Profile
