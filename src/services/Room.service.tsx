import * as Bucket from "@spica-devkit/bucket";

class RoomService {
  private BUCKET_ID = "637f3e12ea080c002bb421f1";
  constructor() {
    let JWT = localStorage.getItem("userJWT") as string;
    Bucket.initialize({
      identity: JWT,
      publicUrl: "https://master.spicaengine.com/api",
    });
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
