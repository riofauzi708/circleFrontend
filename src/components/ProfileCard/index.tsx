import { Avatar, Box, Text, Image } from "@chakra-ui/react";
import { useAppSelector } from "../../store";
import { Link } from "react-router-dom";
import EditForm from "../../pages/Profile/components/EditForm";

function ProfileCard() {
    const profile = useAppSelector((state) => state.auth.user)
    const _host_url = "http://localhost:5000/uploads/"

    // console.log(profile);
    
  return (
      <Box 
        borderRadius={"8px"} 
        w={"90%"} 
        h={"fit-content"}
        bg={"#262626"}
        m={"auto"}
        maxH={"390px"}
        >
            <Box px={16} py={6}>
            <Text fontWeight="bold">
        My Profile
      </Text>
      <Box>
        <Link style={{ textDecoration: "none", color: "white"}} to = "/Profile">
        <Box>
          { profile?.cover !== null ? 
            <Image src={_host_url + profile?.cover} alt="Cover Photo" width="100%" height={"100px"} objectFit="cover" style={{ borderRadius: "8px" }} />
            :
            <Image src="src/assets/cover.jpg" alt="Cover Photo" width="100%" height={"50%"} objectFit="cover" style={{ borderRadius: "8px" }} />
          }
          
          { profile?.avatar !== null ?
          <Avatar
          width={"70px"}
          height={"70px"}
          name='avatar'
          src={_host_url + profile?.avatar}
          borderRadius={'100%'}
          border={"5px solid #262626"}
          style={{ marginTop: "-50px", marginLeft: "12px" }}
          />
          :
          <Avatar
          width={"70px"}
          height={"70px"}
          name='avatar'
          src="src/assets/avatar.png"
          borderRadius={'100%'}
          border={"5px solid #262626"}
          style={{ marginTop: "-50px", marginLeft: "12px" }}
          />
          }
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
            WebkitLineClamp: "2",
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
          <Text color="gray" pr={5}>{profile?.user._count?.follower} Following</Text>
          <Text color="gray" pr={2}>{profile?.user._count?.following} Followers</Text>
        </Box>
        </Link>
    </Box>
    </Box>
    </Box>
  )
}

export default ProfileCard;