import React from "react";
import { IThread } from "../../types/app";
import { Avatar, Box, Text, Image, Flex, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import usePosted from "../../hooks/usePosted";
import { BiComment } from "react-icons/bi";
import LikeButton from "../LikeButton";

interface IThreadCardProps {
  thread: IThread,
  index: number,
  isNot: string
}

const ThreadCard: React.FC<IThreadCardProps> = ({ thread, index, isNot }) => {

  const { postTime } = usePosted();

  return (
    <Box
      display="flex"
      alignItems="flex-start"
      borderBottom="1px solid gray"
      padding="10px"
      marginTop="10px"
      style={{cursor: "pointer"}}
    >
      {thread.author?.profile?.avatar ? (
        <Avatar
          src={"http://localhost:5000/uploads/" + thread.author.profile.avatar}
          borderRadius="100%"
          width="40px"
          height="40px"
          marginRight="10px"
          marginTop="18px"
        />
      ) : (
        <Avatar
          name={thread.author?.fullname}
          borderRadius="100%"
          width="40px"
          height="40px"
          marginRight="10px"
          marginTop="18px"
        />
      )}
      <Box marginTop="-2px">
        <Box display="flex" alignItems="center" gap="10px">
          <Text fontSize="18px" color="white">
            {thread.author?.fullname}
          </Text>
          <Text fontSize="14px" color="gray">
            @{thread.author?.username}
          </Text>
          <Text fontSize="14px" color="gray">
            {postTime && `${postTime.getHours[index]} : ${postTime.getMinutes[index]} WIB | ${postTime.day[index]}, ${postTime.getDate[index]} ${postTime.month[index]} ${postTime.getYear[index]}`}
          </Text>
        </Box>
        <Text variant="body1" color="white" style={{ marginTop: "-10px" }}>
          {thread.content}
        </Text>
        {thread.image && thread.image.map((imageThread) => (
          <Image
            src={"http://localhost:5000/uploads/" + imageThread.image}
            alt="image"
            width="50%"
            maxHeight={"250px"}
            objectFit="cover"
            style={{ marginTop: "10px" }}
          />
        ))}
        {isNot === '' ? "" : <Flex gap={10}>
            <Button 
            style={{ 
              textDecoration: "none" 
            , color: "white"
            , display: "flex"
            , alignItems: "center"
            , gap: "6px"
            , cursor: "pointer"
            , marginTop: "10px"
            , marginLeft: "-5px"
            , border: "none"
            , backgroundColor: "transparent"
            }}
            >
                <LikeButton threadId={thread.id as number} />
            </Button>
            <Link to={isNot}
            style={{ 
              textDecoration: "none" 
            , color: "white"
            , display: "flex"
            , alignItems: "center"
            , gap: "6px"
            , cursor: "pointer"
            , marginTop: "10px"
            , marginLeft: "5px"
            }}
            >
              <BiComment
              style={{ width: "20px", height: "20px" }}
              />96 Replies
              </Link>
        </Flex>}
        
      </Box>
    </Box>
  );
};

export default ThreadCard;