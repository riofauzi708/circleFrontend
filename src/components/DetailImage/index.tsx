import { useEffect, useState } from "react";
import { getThreadByIdAPI } from "../../libs/Api/Call/thread";
import { useParams } from "react-router-dom";
import { IThread } from "../../types/app";
import { Box, Image } from "@chakra-ui/react";


const DetailImage: React.FC = () => {

  const { threadId } = useParams()
  
  const [threadsDetail, setThreadsDetail] = useState<IThread>({
    content: "",
    image: [],
    id: 0
  })

  const fetchThreadDetail = async () => {
    try {
       const res = await getThreadByIdAPI(Number(threadId));

       setThreadsDetail(res.data.data);
    } catch (error) {
       console.log(error);
    }
 };

  useEffect(() => {
    fetchThreadDetail()
  }, [threadId])

  return (
    <>
      {threadsDetail.image?.map((image) => (
        <Box w="100%" h={"100%"} key={image.image}>
          <Image w="100%" src={"http://localhost:5000/uploads/" + image.image} alt="image" />
        </Box>
      ))}
    </>
  )
}

export default DetailImage;