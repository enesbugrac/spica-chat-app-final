import React from "react";
import { auth } from "../../services/Auth.service";
import { insertMessage } from "../../services/Message.service";
import styles from "./styles.module.css";

function MessageInput(props: any) {
  const [value, setValue] = React.useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user: any = await auth().catch(console.error);
    insertMessage({
      sender_identity_id: user._id,
      text: value,
      sender_name: user.identifier,
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
