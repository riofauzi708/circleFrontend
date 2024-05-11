import { Avatar, Flex, Divider, Text, Box, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProfileUserAPI } from "../../libs/Api/Call/profile";
import MyPost from "../../pages/Profile/components/MyPost";
import ProfileMedia from "../../pages/Profile/components/ProfileMedia";
import OtherPost from "./components/OtherPost";
import OtherMedia from "./components/OtherMedia";
function DetailProfile() {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState<string>("myPost");
  const _host_url = "http://localhost:5000/uploads/";
  const [isProfile, setIsProfile] = useState<any>(null);
  const actualUserId = userId || "";

  useEffect(() => {
    if (actualUserId) {
      const fetchProfile = async () => {
        try {
          const res = await getProfileUserAPI(actualUserId);
          setIsProfile(res.data.data);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };

      fetchProfile();
    }
  }, [actualUserId]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      {isProfile && (
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
                {isProfile?.cover ? (
                  <Image
                    src={_host_url + isProfile.cover}
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

                {isProfile?.avatar ? (
                  <Avatar
                    width={"70px"}
                    height={"70px"}
                    name="avatar"
                    src={_host_url + isProfile.avatar}
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
                {/* <EditForm />
                <FollowButton userId={isProfile?.user.id} /> */}
              </Box>
              <Box>
                <Text
                  style={{ marginTop: "0px" }}
                  fontWeight="bold"
                  fontSize="20px"
                >
                  {isProfile?.user.fullname}
                </Text>
                <Text
                  style={{ marginTop: "-15px" }}
                  color="gray"
                  fontSize="16px"
                >
                  @{isProfile?.user.username}
                </Text>
                <Text
                  style={{ marginTop: "-10px" }}
                  fontSize="18px"
                  textAlign="start"
                >
                  {isProfile?.bio}
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
                  {isProfile?.user._count?.follower} Following
                </Text>
                <Text color="gray" pr={2}>
                  {isProfile?.user._count?.following} Followers
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
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
        {activeTab === "myPost" ? <OtherPost /> : <OtherMedia />}
      </Box>
    </>
  );
}

export default DetailProfile;
