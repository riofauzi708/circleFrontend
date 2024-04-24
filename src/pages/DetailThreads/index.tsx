import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getRepliesAPI, getThreadByIdAPI } from "../../libs/Api/Call/thread"
import { IThread } from "../../types/app"
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react"
import ThreadCard from "../../components/ThreadCard"
import ThreadForm from "../Home/Components/ThreadForm"
import { BsHeartFill } from "react-icons/bs"
import { BiComment } from "react-icons/bi"


function DetailThread() {
  const { threadId } = useParams()

  const [threadsDetail, setThreadsDetail] = useState<IThread>({
    userId: 0,
    content: "",
    image: [],
    id: 0
  })


  const [replies, setReplies] = useState<IThread[]>([])

  const fetchThreadDetail = async () => {
    try {
       const res = await getThreadByIdAPI(Number(threadId));
       const resReplies = await getRepliesAPI(Number(threadId));

       setThreadsDetail(res.data.data);
       setReplies(resReplies.data.data);
    } catch (error) {
       console.log(error);
    }
 };

  useEffect(() => {
    fetchThreadDetail()
  }, [threadId])

  return (
    <>
      <Box>
        <Box>
        <Text>{threadsDetail.author?.fullname}</Text>
        <Text>{threadsDetail.content}</Text>
        {threadsDetail.image?.map((image) => (
          <Image src={"http://localhost:5000/uploads/" + image.image} 
          width="300px" alt="image" />
        ))}
        <Flex gap={10}>
            <Button 
            style={{ textDecoration: "none" 
            , color: "white"
            , display: "flex"
            , alignItems: "center"
            , gap: "6px"
            , cursor: "pointer"
            , marginTop: "-10px"
            , border: "none"
            , backgroundColor: "transparent"
            , padding: "10px"
            }}
            >
                <Box>
                    <BsHeartFill />
                </Box>
                <Text>1.1k Like</Text>
            </Button>
            <Button
            style={{ textDecoration: "none" 
            , color: "white"
            , display: "flex"
            , alignItems: "center"
            , gap: "6px"
            , cursor: "pointer"
            , marginTop: "-10px"
            , border: "none"
            , backgroundColor: "transparent"
            , padding: "10px"
            }}  
            >
              <BiComment />96 Replies
              </Button>
        </Flex>
        </Box>

        <Box>
          <ThreadForm threadId={Number(threadId)} callback={fetchThreadDetail} />
        </Box>
        
        <Box>
          {replies.map((reply) => (
            <ThreadCard key={reply.id} isNot={''} thread={reply} index={0} />
          ))}
        </Box>
      </Box>
    </>
  )
}

export default DetailThread
