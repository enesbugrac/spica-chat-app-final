import { RealtimeConnection } from "@spica-devkit/bucket";
import React, { useEffect, useState, useRef } from "react";
import AuthService, { User } from "../../services/Auth.service";
import MessageService from "../../services/Message.service";

import "./styles.css";

function MessageList(props: any) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Array<any>>();
  const [user, setUser] = useState<User | null>();
  const messageConnection = useRef<RealtimeConnection<unknown[]>>();

  useEffect(() => {
    setUser(AuthService.user);
    setConnection();
    const subscription = messageConnection.current?.subscribe((data) =>
      setMessages(data)
    );
    return () => {
      subscription?.unsubscribe();
    };
  }, [props.roomId]);

  const setConnection = () => {
    messageConnection.current = MessageService.getRealtimeConnectionWithID(
      props.roomId
    ) as RealtimeConnection<unknown[]>;
  };

  React.useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  });

  return (
    <div className="message-list-container" ref={containerRef}>
      <ul className="message-list">
        {messages?.map((x) => (
          <Message
            key={x._id}
            message={x}
            isOwnMessage={x.sender_user_id === user?._id}
          />
        ))}
      </ul>
    </div>
  );
}

function Message(props: any) {
  const { sender_name, text } = props.message;
  return (
    <li className={`message ${props.isOwnMessage && "own-message"}`}>
      <h4 className="sender">{props.isOwnMessage ? "You" : sender_name}</h4>
      <div>{text}</div>
    </li>
  );
}

export { MessageList };
