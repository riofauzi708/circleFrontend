import { Avatar, Box, Text, Image } from "@chakra-ui/react";
import { useAppSelector } from "../../store";
import { Link } from "react-router-dom";
import EditForm from "../../pages/Profile/components/EditForm";

function ProfileCard() {
    const profile = useAppSelector((state) => state.auth.user)
    const _host_url = "http://localhost:5000/uploads/"

  return (
      <Box 
        borderRadius={"8px"} 
        w={"90%"} 
        h={"fit-content"}
        bg={"#262626"}
        maxHeight={"370px"}
        m={"auto"}
        >
            <Box px={16} py={6}>
            <Text fontWeight="bold">
        My Profile
      </Text>
      <Box>
        <Link style={{ textDecoration: "none", color: "white"}} to = "/Profile">
        <Box>
          <Image src={_host_url + profile?.cover}
          alt="Cover Photo" width="100%" maxHeight={"100px"} objectFit="cover" 
          style={{ borderRadius: "8px" }}
          borderRadius={"8px"}
          />
          <Avatar
            width={"70px"}
            height={"70px"}
            name='avatar'
            src={_host_url + profile?.avatar}
            borderRadius={'100%'}
            border={"5px solid #262626"}
            style={{ marginTop: "-50px", marginLeft: "12px" }}
            />
            
            <EditForm />

        </Box>
        <Box>
          <Text style={{ marginTop: "0px" ,
            display: "-webkit-box",
            WebkitLineClamp: "1",
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
          }} fontWeight="bold" fontSize="15px">
            {profile?.user.fullname}
          </Text>
          <Text style={{ marginTop: "-15px",
            display: "-webkit-box",
            WebkitLineClamp: "1",
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
           }} color="gray" fontSize="13px">
            @{profile?.user.username}
          </Text>
        <Text
          style={{
            marginTop: "-10px",
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          fontSize="14px"
          textAlign="start"
        >
            {profile?.bio}
        </Text>
        </Box>
        <Box style={{ marginTop: "-15px" }} display={"flex"} alignItems="center" gap={"2px"}>
          <Text fontWeight="bold" pr={2}>235</Text>
          <Text color="gray" pr={5}>Following</Text>
          <Text fontWeight="bold" pl={5}>1.5k</Text>
          <Text color="gray" pr={2}>Followers</Text>
        </Box>
        </Link>
    </Box>
    </Box>
    </Box>
  )
}

export default ProfileCard;