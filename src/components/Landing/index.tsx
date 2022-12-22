import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import RoomService from "../../services/Room.service";
import AuthService from "../../services/Auth.service";
import { RealtimeConnection } from "@spica-devkit/bucket";
import "./styles.css";

function Landing() {
  const [chatRooms, setchatRooms] = useState<Array<any>>([]);
  const [newRoom, setNewRoom] = useState<string>();
  const roomConnection = useRef<RealtimeConnection<unknown[]>>();
  const navigate = useNavigate();

  useEffect(() => {
    setConnection();
    let subscription = roomConnection.current?.subscribe((response) =>
      setchatRooms(response)
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);
  const setConnection = () => {
    roomConnection.current =
      RoomService.getRealtimeConnection() as RealtimeConnection<unknown[]>;
  };
  const handleCreateNewRoom = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const user: any = await AuthService.auth().catch(console.error);
    roomConnection.current?.insert({
      room_title: newRoom,
      creator_user_id: user._id,
    });
  };
  return (
    <>
      <h2>Choose a Chat Room</h2>
      <input
        className="room-input"
        value={newRoom}
        placeholder="Enter New Room Title..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNewRoom(e.target.value)
        }
      />
      <button className="create-room-button" onClick={handleCreateNewRoom}>
        Create New Room
      </button>
      <button
        className="log-out-button"
        onClick={() => {
          localStorage.removeItem("userJWT");
          AuthService.auth();
          navigate("/login");
        }}
      >
        Log Out
      </button>
      <ul className="chat-room-list">
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
