import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import RoomService from "../../services/Room.service";
import AuthService from "../../services/Auth.service";

function Landing() {
  const [chatRooms, setchatRooms] = useState<Array<any>>();
  const [newRoom, setNewRoom] = useState<string>();
  const [roomService, setRoomService] = useState<RoomService>(
    new RoomService()
  );
  const [authService, setAuthService] = useState<AuthService>(
    new AuthService()
  );
  const navigate = useNavigate();
  useEffect(() => {
    const subs = roomService
      .getAllRoomsRealTime()
      .subscribe((res) => setchatRooms(res));
    return () => {
      subs.unsubscribe();
    };
  }, [roomService]);
  useEffect(() => {
    authService.auth().catch((e) => navigate("/"));
  }, [authService, navigate]);
  const handleCreateNewRoom = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const user: any = await authService.auth().catch(console.error);
    roomService
      .insertRoom({
        room_title: newRoom,
        creator_user_id: user._id,
      })
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
