import { useEffect, useState } from "react";
import ThreadCard from "../../../components/ThreadCard";
import { useAppSelector } from "../../../store";
import { IThread } from "../../../types/app";
import { getThreadAPI } from "../../../libs/Api/Call/thread";

const OtherPost = () => {
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

  const filteredThreads = threads?.filter((thread) => thread.userId);

  return (
    <div>
      {filteredThreads.map((thread) => (
        <ThreadCard key={thread.id} thread={thread} index={0} isNot={""} />
      ))}
    </div>
  );
};

export default OtherPost;
