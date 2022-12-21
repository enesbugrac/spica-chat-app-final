import { RealtimeConnection } from "@spica-devkit/bucket";
import React, { useRef, useEffect } from "react";
import AuthService from "../../services/Auth.service";
import MessageService from "../../services/Message.service";
import styles from "./styles.module.css";

function MessageInput(props: any) {
  const [value, setValue] = React.useState("");
  const messageConnection = useRef<RealtimeConnection<unknown[]>>();

  useEffect(() => {
    setConnection();
    const subscription = messageConnection.current?.subscribe();
    return () => {
      subscription?.unsubscribe();
    };
  }, [props.roomId]);

  const setConnection = () => {
    messageConnection.current = MessageService.getRealtimeConnection();
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user: any = await AuthService.auth().catch(console.error);
    messageConnection.current?.insert({
      sender_user_id: user._id,
      text: value,
      sender_name: user.user_name,
      room_id: props.roomId,
    });
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles["message-input-container"]}>
      <input
        type="text"
        placeholder="Enter a message"
        value={value}
        onChange={handleChange}
        className={styles["message-input"]}
        required
        minLength={1}
      />
      <button
        type="submit"
        disabled={value.length < 1}
        className={styles["send-message"]}
      >
        Send
      </button>
    </form>
  );
}

export { MessageInput };
