import { useEffect, useState } from "react";
import { IThread } from "../../types/app";
import { getThreadAPI } from "../../libs/Api/Call/thread";
import ThreadCard from "../../components/ThreadCard";
import { Text } from "@chakra-ui/react";
import ThreadForm from "./Components/ThreadForm";
import { useAppSelector } from "../../store";

function Home() {
  const [threads, setThreads] = useState<IThread[]>([]);
  const isLoggedIn = useAppSelector((state) => !!state.auth.user);

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

  const handlePostThread = async () => {
    getThreads();
  };

  return (
    <>
      <Text fontSize={"20px"} px={10} fontWeight={"bold"} style={{ marginTop: "-5px" }}>
        Home
      </Text>
      {isLoggedIn && <ThreadForm callback={handlePostThread} />}
      <div>
        {threads.map((thread, index) => (
          <ThreadCard key={thread.id} thread={thread} isNot={`detail/${thread.id}`} index={index} callback={handlePostThread} />
        ))}
      </div>
    </>
  );
}

export default Home;