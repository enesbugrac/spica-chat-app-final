import * as Bucket from "@spica-devkit/bucket";

class RoomService {
  private BUCKET_ID = process.env.REACT_APP_ROOM_BUCKET_ID || "";
  private connection: Bucket.RealtimeConnection<unknown[]> | null = null;

  getRoombyID = (roomId: string) => {
    return Bucket.data.get(this.BUCKET_ID, roomId);
  };
  getRealtimeConnection = () => {
    this.connection = Bucket.data.realtime.getAll(this.BUCKET_ID);
    return this.connection;
  };
}

export default new RoomService();
