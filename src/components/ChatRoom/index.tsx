import { Link, useParams } from "react-router-dom";
import { MessageInput } from "../MessageInput";
import { MessageList } from "../MessageList";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { getRoombyID } from "../../services/Room.service";

function ChatRoom() {
  const params = useParams();
  const [room, setRoom] = useState<{ room_title: string; _id: string }>();
  useEffect(() => {
    getRoombyID(params.id as string).then((res: any) => setRoom(res));
  }, []);

  return (
    <>
      <h2>{room?.room_title}</h2>
      <div>
        <Link to="/landing">⬅️ Back to all rooms</Link>
      </div>
      <div className={styles["messages-container"]}>
        <MessageList roomId={room?._id} />
        <MessageInput roomId={room?._id} />
      </div>
    </>
  );
}

export { ChatRoom };
