import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Image,
  Flex,
  Text,
  Avatar,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IFollowerUser } from "../../types/app";
import { getFollowerAPI, getFollowingAPI } from "../../libs/Api/Call/user";
import FollowButton from "../../components/FollowButton";

interface IFollowsProps {
  follow?: IFollowerUser;
}

const Follows: React.FC<IFollowsProps> = () => {
  const [isFollowing, setIsFollowing] = useState<any[]>([]);
  const [isFollower, setIsFollower] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const _host_url = "http://localhost:5000/uploads/";

  const fetchFollowing = async () => {
    try {
      const res = await getFollowingAPI();
      console.log("IS FOLLOWING", res);
      setIsFollowing(res);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFollower = async () => {
    try {
      const res = await getFollowerAPI();
      console.log("IS FOLLOWER", res);
      setIsFollower(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFollowing();
    fetchFollower();
  }, []);

  console.log(isFollowing);

  return (
    <>
      <Box
        borderRadius={"8px"}
        w={"90%"}
        h={"80%"}
        bg={"#262626"}
        m={"auto"}
        overflowY={"auto"}
        style={{
          scrollbarWidth: "none",
        }}
        mt={"20px"}
      >
        <Tabs isFitted variant="enclosed">
          <TabList>
            <Tab
              borderBottom={activeTab === 0 ? "2px solid green" : "none"}
              _selected={{ borderBottom: "2px solid green" }}
              onClick={() => setActiveTab(0)}
              style={{
                width: "50%",
                height: "40px",
                borderRadius: "8px 0 0 8px",
                cursor: "pointer",
                fontWeight: "bold",
                backgroundColor: "#262626",
                outline: "none",
                fontSize: "16px",
                borderTop: "none",
                borderRight: "none",
                borderLeft: "none",
              }}
            >
              Following
            </Tab>
            <Tab
              borderBottom={activeTab === 1 ? "2px solid green" : "none"}
              _selected={{ borderBottom: "2px solid green" }}
              onClick={() => setActiveTab(1)}
              style={{
                width: "50%",
                height: "40px",
                cursor: "pointer",
                fontWeight: "bold",
                backgroundColor: "#262626",
                fontSize: "16px",
                borderTop: "none",
                borderRight: "none",
                borderLeft: "none",
              }}
            >
              Follower
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {isFollowing.map((item: any, index: number) => (
                <Flex
                  key={index}
                  justifyContent={"space-between"}
                  borderBottom={"1px solid gray"}
                  padding={"10px"}
                  mt={10}
                  ml={16}
                  alignItems={"center"}
                >
                  {item.profile?.avatar ? (
                    <Avatar
                      src={_host_url + item.profile?.avatar}
                      width={"50px"}
                      height={"50px"}
                      name="avatar"
                      borderRadius={"100%"}
                    />
                  ) : (
                    <Image
                      src="src/assets/avatar.png"
                      alt="Cover Photo"
                      width="45px"
                      height="45px"
                      style={{ borderRadius: "100%" }}
                    />
                  )}
                  <Box mr={"auto"} style={{ marginLeft: "10px" }}>
                    <Text style={{ marginBottom: "-15px", fontSize: "18px" }}>
                      {item.fullname}
                    </Text>
                    <Text style={{ color: "gray", fontSize: "14px" }}>
                      @{item.username}
                    </Text>
                  </Box>
                  <FollowButton userId={item.id} />
                </Flex>
              ))}
            </TabPanel>
            <TabPanel>
              {isFollower.map((item: any, index: number) => (
                <Flex
                  key={index}
                  justifyContent={"space-between"}
                  borderBottom={"1px solid gray"}
                  padding={"10px"}
                  mt={10}
                  ml={16}
                  alignItems={"center"}
                >
                  {item.profile?.avatar ? (
                    <Avatar
                      src={_host_url + item.profile?.avatar}
                      width={"50px"}
                      height={"50px"}
                      name="avatar"
                      borderRadius={"100%"}
                    />
                  ) : (
                    <Image
                      src="src/assets/avatar.png"
                      alt="Cover Photo"
                      width="45px"
                      height="45px"
                      style={{ borderRadius: "100%" }}
                    />
                  )}
                  <Box mr={"auto"} style={{ marginLeft: "10px" }}>
                    <Text style={{ marginBottom: "-15px", fontSize: "18px" }}>
                      {item.fullname}
                    </Text>
                    <Text style={{ color: "gray", fontSize: "14px" }}>
                      @{item.username}
                    </Text>
                  </Box>
                  <FollowButton userId={item.id} />
                </Flex>
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default Follows;
