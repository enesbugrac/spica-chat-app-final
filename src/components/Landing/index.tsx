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
    roomConnection.current?.insert({
      room_title: newRoom,
      creator_user_id: AuthService?.user?._id,
    });
  };
  return (
    <div className="page">
      <div className="flex-row-between page-header">
        <h2>Choose a Chat Room</h2>
        <button
          onClick={() => {
            localStorage.removeItem("userJWT");
            AuthService.auth();
            navigate("/");
          }}
        >
          Log Out
        </button>
      </div>

      <div className="flex-row-center gp-2 mt-3">
        <input
          value={newRoom}
          placeholder="Enter New Room Title..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewRoom(e.target.value)
          }
        />
        <button onClick={handleCreateNewRoom}>
          Create New Room
        </button>
      </div>

      <ul className="chat-room-list card">
        {chatRooms?.map((room) => (
          <Link className="card" to={`/room/${room._id}`}>
            <li  key={room._id}>
              {room.room_title}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export { Landing };
