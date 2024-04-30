import { useEffect, useState } from 'react';
import { Flex, Image } from "@chakra-ui/react";
import { useAppSelector } from "../../../store";
import { IThread } from "../../../types/app";
import { getThreadAPI } from "../../../libs/Api/Call/thread";

const ProfileMedia = () => {
  const [threads, setThreads] = useState<IThread[]>([]);
  const profile = useAppSelector((state) => state.auth.user);

  async function getThreads() {
    try {
      const res = await getThreadAPI();
      setThreads(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getThreads();
  }, []);

  const filteredThreads = threads?.filter(
    (thread) => thread.userId === profile?.user.id
  );

  return (
    <Flex mt={1} flexWrap={"wrap"}>
      {filteredThreads?.map((thread: any, id: number) => (
        <Flex key={id} mt={2} flexWrap={"wrap"}>
          {thread.image && thread.image.map((image: any) => (
            <Image
              width={"50%"}
              flex={1}
              px={1}
              py={1}
              key={thread.id} src={"http://localhost:5000/uploads/" + image.image}
            />
          ))}
        </Flex>
      ))}
    </Flex>
  );
};

export default ProfileMedia;