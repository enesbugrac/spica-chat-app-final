import * as Bucket from "@spica-devkit/bucket";
import Config from "./Config";

class RoomService {
  private BUCKET_ID = Config.ROOM_BUCKET_ID;
  constructor() {
    // let JWT = localStorage.getItem("userJWT") as string;
    // Bucket.initialize({
    //   identity: JWT,
    //   publicUrl: Config.API_URL,
    // });
  }
  insertRoom = (document: object) => {
    return Bucket.data.insert(this.BUCKET_ID, document);
  };
  getRoombyID = (roomId: string) => {
    return Bucket.data.get(this.BUCKET_ID, roomId);
  };
  getAllRoomsRealTime = () => {
    return Bucket.data.realtime.getAll(this.BUCKET_ID);
  };
}

export default RoomService;
