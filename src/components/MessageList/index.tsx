import React, { useEffect, useState } from "react";
import { auth } from "../../services/Auth.service";
import { getMessagesRealtime } from "../../services/Message.service";

import styles from "./styles.module.css";

function MessageList(props: any) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Array<any>>();
  const [user, setUser] = useState<{ _id: string }>();
  useEffect(() => {
    const subs = getMessagesRealtime(props.roomId).subscribe((res: any) =>
      setMessages(res)
    );
    return () => {
      subs.unsubscribe();
    };
  }, [props.roomId]);

  useEffect(() => {
    auth()
      .then((res: any) => setUser(res))
      .catch(console.error);
  }, []);

  React.useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  });

  return (
    <div className={styles["message-list-container"]} ref={containerRef}>
      <ul className={styles["message-list"]}>
        {messages?.map((x) => (
          <Message
            key={x._id}
            message={x}
            isOwnMessage={x.sender_identity_id === user?._id}
          />
        ))}
      </ul>
    </div>
  );
}

function Message(props: any) {
  const { sender_name, text } = props.message;

  return (
    <li
      className={
        props.isOwnMessage
          ? `${styles["message"]} ${styles["own-message"]}`
          : styles["message"]
      }
    >
      <h4 className={styles["sender"]}>
        {props.isOwnMessage ? "You" : sender_name}
      </h4>
      <div>{text}</div>
    </li>
  );
}

export { MessageList };
