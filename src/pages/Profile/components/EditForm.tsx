import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { BiSolidImageAdd } from "react-icons/bi";
import { useAppSelector } from "../../../store";
import { editProfileAPI } from "../../../libs/Api/Call/editProfile";

const EditProfileModal = () => {
  const profile = useAppSelector((state) => state.auth.user);
  const hostURL = "http://localhost:5000/uploads/";
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [cover, setCover] = useState<File | null>(null);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [bio, setBio] = useState("");
  const [avatarURL, setAvatarURL] = useState<string | null>(null);
  const [coverURL, setCoverURL] = useState<string | null>(null);

  const handleChangeCover = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCover(e.target.files?.[0] || null);
  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAvatar(e.target.files?.[0] || null);

  const handlePost = async () => {
    try {
      const formData = new FormData();
      if (cover) formData.append("cover", cover);
      if (avatar) formData.append("avatar", avatar);
      if (bio) formData.append("bio", bio);

      const res = await editProfileAPI(formData);
      if (res && res.data && res.data.profile) {
        setBio(res.data.profile.bio);
        if (res.data.profile.avatar) setAvatarURL(res.data.profile.avatar);
        if (res.data.profile.cover) setCoverURL(res.data.profile.cover);
      }
      console.log(res?.data);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        bg="transparent"
        size="sm"
        mr={3}
        variant="outline"
        border={"1px solid gray"}
        left={"44%"}
        w="30%"
        h="30px"
        mt="10px"
        fontSize="14px"
        borderRadius="8px"
        _hover={{ bg: "gray", color: "white", cursor: "pointer" }}
        onClick={onOpen}
      >
        Edit Profile
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="60%" mx="210px" mt="10px" p="20px">
          <ModalHeader
            bg="#1d1d1d"
            color="white"
            mx={"auto"}
            w={"80%"}
            fontSize="25px"
          >
            EDIT PROFILE
          </ModalHeader>
          <ModalBody pb={5} w="100%" justifyContent="center">
            <Flex mx="auto" w="80%">
              <Box px={5} w="100%" bg="#1d1d1d">
                {/* Cover Image */}
                <Box w="100%" h="80px" bg="#1d1d1d" borderRadius="lg" mt={10}>
                  <Flex
                    justifyContent="center"
                    align="center"
                    h={"175%"}
                    bg="black"
                    borderRadius="xl"
                  >
                    {coverURL ? (
                      <img src={hostURL + coverURL} alt="Cover" />
                    ) : (
                      <label htmlFor="imageUpload">
                        <BiSolidImageAdd
                          style={{ marginTop: "10px" }}
                          size={80}
                          cursor="pointer"
                        />
                      </label>
                    )}
                    {/* Cover image input field */}
                    <Input
                      id="imageUpload"
                      type="file"
                      display="none"
                      accept="image/*"
                      name="cover"
                      onChange={handleChangeCover} // onChange handler for the cover image input
                    />
                  </Flex>
                </Box>

                {/* Avatar */}
                <Flex>
                  {avatarURL ? (
                    <Avatar
                      w="100px"
                      h="80px"
                      mt={10}
                      ml={10}
                      border="3px solid black"
                      src={hostURL + avatarURL}
                    />
                  ) : (
                    <Avatar
                      w="100px"
                      h="80px"
                      mt={10}
                      ml={10}
                      border="3px solid black"
                    />
                  )}
                  <Flex position="absolute" mt="50px" ml={20}>
                    <label htmlFor="imageUploadAvatar">
                      <BiSolidImageAdd
                        style={{ marginLeft: "20px" }}
                        size={50}
                        cursor="pointer"
                      />
                    </label>
                    <Input
                      id="imageUploadAvatar"
                      type="file"
                      accept="image/*"
                      display="none"
                      name="avatar"
                      onChange={handleAvatar}
                    />
                  </Flex>
                </Flex>

                {/* Name */}
                <Text fontSize="14px" color="grey" fontWeight="bold" ml={3}>
                  Name
                </Text>
                <Text fontWeight="bold" fontSize="14px" ml={12}>
                  {profile?.user.fullname}
                </Text>

                {/* Username */}
                <Box mt={3}>
                  <Text fontSize="14px" color="grey" fontWeight="bold" ml={3}>
                    Username
                  </Text>
                  <Text fontSize="14px" ml={10}>
                    @{profile?.user.username}
                  </Text>
                </Box>

                {/* Bio */}
                <Flex
                  border="1px solid grey"
                  color="white"
                  borderRadius="xl"
                  justify="center"
                  flexDir="column"
                >
                  <Text fontSize="14px" color="grey" fontWeight="bold" ml={4}>
                    Bio
                  </Text>
                  <Input
                    type="text"
                    border="none"
                    name="name"
                    size="md"
                    px={18}
                    h="50px"
                    _placeholder={{ color: "white" }}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </Flex>

                {/* Save and Cancel Button */}
                <Flex justifyContent="end" mt={5} gap={10}>
                  <Button
                    style={{ border: "none", borderRadius: "5px" }}
                    w="70px"
                    h="35px"
                    cursor={"pointer"}
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    style={{ border: "none", borderRadius: "5px" }}
                    bg="rgba(4, 165, 30, 1)"
                    color="white"
                    w="80px"
                    h="35px"
                    cursor={"pointer"}
                    onClick={handlePost}
                    _hover={{ bg: "blue" }}
                  >
                    Save
                  </Button>
                </Flex>
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfileModal;
