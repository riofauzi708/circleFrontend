import { useState } from "react";
import { Text, Box, Image, Avatar, Flex, Divider } from "@chakra-ui/react";
import { useAppSelector } from "../../store";
import EditForm from "./components/EditForm";
import MyPost from "./components/MyPost";
import ProfileMedia from "./components/ProfileMedia";

function Profile() {
  const [activeTab, setActiveTab] = useState<string>("myPost");
  const profile = useAppSelector((state) => state.auth.user);
  const _host_url = "http://localhost:5000/uploads/";

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

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
          <Text fontWeight="bold">My Profile</Text>
          <Box>
            <Box>
              {profile?.cover !== null ? (
                <Image
                  src={_host_url + profile?.cover}
                  alt="Cover Photo"
                  width="100%"
                  height={"fit-content"}
                  objectFit="cover"
                  style={{ borderRadius: "8px" }}
                />
              ) : (
                <Image
                  src="src/assets/cover.jpg"
                  alt="Cover Photo"
                  width="100%"
                  height={"fit-content"}
                  objectFit="cover"
                  style={{ borderRadius: "8px" }}
                />
              )}

              {profile?.avatar !== null ? (
                <Avatar
                  width={"70px"}
                  height={"70px"}
                  name="avatar"
                  src={_host_url + profile?.avatar}
                  borderRadius={"100%"}
                  border={"5px solid #262626"}
                  style={{ marginTop: "-50px", marginLeft: "12px" }}
                />
              ) : (
                <Avatar
                  width={"70px"}
                  height={"70px"}
                  name="avatar"
                  src="src/assets/avatar.png"
                  borderRadius={"100%"}
                  border={"5px solid #262626"}
                  style={{ marginTop: "-50px", marginLeft: "12px" }}
                />
              )}

              <EditForm />
            </Box>
            <Box>
              <Text
                style={{ marginTop: "0px" }}
                fontWeight="bold"
                fontSize="20px"
              >
                {profile?.user.fullname}
              </Text>
              <Text style={{ marginTop: "-15px" }} color="gray" fontSize="16px">
                @{profile?.user.username}
              </Text>
              <Text
                style={{ marginTop: "-10px" }}
                fontSize="18px"
                textAlign="start"
              >
                {profile?.bio}
              </Text>
            </Box>
            <Box
              style={{ marginTop: "-15px" }}
              display={"flex"}
              alignItems="center"
              gap={"4px"}
              fontSize={"18px"}
            >
              <Text color="gray" pr={5}>
                {profile?.user._count?.follower} Following
              </Text>
              <Text color="gray" pr={2}>
                {profile?.user._count?.following} Followers
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Flex>
          <Box
            cursor={"pointer"}
            onClick={() => handleTabClick("myPost")}
            borderBottom={activeTab === "myPost" ? "4px solid green" : "none"}
            w={300}
            textAlign={"center"}
            mx={"auto"}
          >
            <Text>My Post</Text>
          </Box>
          <Box
            cursor={"pointer"}
            onClick={() => handleTabClick("media")}
            borderBottom={activeTab === "media" ? "4px solid green" : "none"}
            w={300}
            textAlign={"center"}
            mx={"auto"}
          >
            <Text>Profile Media</Text>
          </Box>
        </Flex>
        <Divider borderColor="rgba(144, 144, 144, 1)" mt="20px" />
        {activeTab === "myPost" ? (
          <MyPost key="myPost" />
        ) : (
          <ProfileMedia key="profileMedia" />
        )}
      </Box>
    </>
  );
}

export default Profile;
