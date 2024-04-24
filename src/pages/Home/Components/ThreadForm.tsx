import { FormControl, Avatar, Input, Button, Box, SimpleGrid, GridItem, Image, Flex, Text } from "@chakra-ui/react"
import { useState, useRef } from "react"
import { FaUpload, FaPaperPlane } from "react-icons/fa"
import { useAppSelector } from "../../../store"
import { createThreadAPI } from "../../../libs/Api/Call/thread";

interface IThreadPostProps {
  threadId?: number;
  callback?: () => void;
}

const ThreadForm: React.FC<IThreadPostProps> = ({ threadId, callback }) => {
    const profile = useAppSelector((state) => state.auth.user)
    const _host_url = "http://localhost:5000/uploads/"


    const [threadPost, setThreadPost] = useState<{
      content: string;
      image: FileList | null;
      threadId?: number;
   }>({ content: "", image: null });

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 4);
      const fileList = new DataTransfer();
      files.forEach((file) => {
        fileList.items.add(file);
      });
      setThreadPost({ ...threadPost, image: fileList.files || null });
    }
  }

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handlePostThread = async (e: React.MouseEvent) => {
    try {
       e.preventDefault();

       if (threadId) {
          threadPost.threadId = threadId;
       }

       const res = await createThreadAPI(threadPost);

       console.log(res);

       if (callback) {
          callback();
       }

       setThreadPost({ content: "", image: null });
    } catch (error) {
       console.log(error);
    }
 };

 const islogin = localStorage.getItem("token")

  return (
    <>
    {!islogin ? "" :
      <FormControl ml={4} display="flex" alignItems="center" gap={4} pb={4} w={"100%"}>
        <Avatar
          src={_host_url + profile?.avatar}
          style={{ marginTop: "-16px", marginLeft: "6px", marginRight: "5px", width: "40px", height: "40px" }}
          borderRadius={'100%'}
        />
        <Box display="flex" flexDirection="column" alignItems="center" gap={2} flex="1">
          <Input
            type="text"
            name="content"
            placeholder="  What's on your mind?"
            variant={"contained"}
            style={{
              width: "100%",
              height: "54px",
              border: "none",
              padding: "5px",
              fontSize: "20px",
              color: "white",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              outline: "none",
            }}
            onChange={(e) => setThreadPost({ ...threadPost, content: e.target.value })}
          />
        </Box>
        <Flex alignItems="center" gap={4}>
          <Button
            type="button"
            padding={"10px"}
            backgroundColor={"rgba(255, 255, 255, 0.05)"}
            color="white"
            border={"none"}
            width={"78px"}
            height="64px"
            leftIcon={<FaUpload size={15} />}
            onClick={handleUploadClick}
            _hover={{
              backgroundColor: "rgba(255, 255, 255, 0.1)"
            }}
          >
            Upload
          </Button>
          <Input
            type="file"
            name="imageFile"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            style={{ display: 'none' }}
          />
          <Button
            type="submit"
            bgColor="green"
            borderRadius="10px"
            border={"none"}
            mr={4}
            w={"75px"}
            h={"64px"}
            color="white"
            leftIcon={<FaPaperPlane />}
            onClick={handlePostThread}
               variant="contained"
          >
            Post
          </Button>
        </Flex>
      </FormControl>
    }
      {threadPost.image && threadPost.image.length > 0 && (
  <Box ml={4} mt={4}>
    <SimpleGrid columns={2} spacing={4}>
      {Array.from(threadPost.image).map((image, index) => (
        <GridItem key={index}>
          <Image
            src={URL.createObjectURL(image)}
            alt={`Image ${index}`}
            borderRadius="md"
            objectFit="cover"
            w="full"
            h="200px"
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.05)",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}
          />
        </GridItem>
      ))}
    </SimpleGrid>
  </Box>
)}
{threadPost.image && threadPost.image.length > 0 && (
  <Flex ml={4} mt={4} alignItems="center">
    <Text fontSize="sm" color="gray.500" mr={2}>
      {threadPost.image.length} image{threadPost.image.length > 1 ? "s" : ""} uploaded
    </Text>
  </Flex>
)}
    </>
  )
}

export default ThreadForm