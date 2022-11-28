import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { getAllRoomsRealTime, insertRoom } from "../../services/Room.service";
import { auth } from "../../services/Auth.service";

function Landing() {
  const [chatRooms, setchatRooms] = useState<Array<any>>();
  const [newRoom, setNewRoom] = useState<string>();
  const navigate = useNavigate();
  useEffect(() => {
    const subs = getAllRoomsRealTime().subscribe((res) => setchatRooms(res));
    return () => {
      subs.unsubscribe();
    };
  }, []);
  useEffect(() => {
    auth().catch((e) => navigate("/"));
  }, []);
  const handleCreateNewRoom = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const user: any = await auth().catch(console.error);
    insertRoom({ room_title: newRoom, creator_identity_id: user._id })
      .then((res) => setNewRoom(""))
      .catch(console.error);
  };
  return (
    <>
      <h2>Choose a Chat Room</h2>
      <input
        className={styles["room-input"]}
        value={newRoom}
        placeholder="Enter New Room Title..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNewRoom(e.target.value)
        }
      />
      <button
        className={styles["create-room-button"]}
        onClick={handleCreateNewRoom}
      >
        Create New Room
      </button>
      <button
        className={styles["log-out-button"]}
        onClick={() => {
          localStorage.removeItem("userJWT");
          navigate("/");
        }}
      >
        Log Out
      </button>
      <ul className={styles["chat-room-list"]}>
        {chatRooms?.map((room) => (
          <li key={room._id}>
            <Link to={`/room/${room._id}`}>{room.room_title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export { Landing };
