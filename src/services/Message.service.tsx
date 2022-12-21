import * as Bucket from "@spica-devkit/bucket";

class MessageService {
  private BUCKET_ID = process.env.REACT_APP_MESSAGE_BUCKET_ID || "";
  private connection: Bucket.RealtimeConnection<unknown[]>;

  constructor() {
    let JWT = localStorage.getItem("userJWT") as string;
    Bucket.initialize({
      identity: JWT,
      publicUrl: process.env.REACT_APP_API_URL,
    });
    this.connection = Bucket.data.realtime.getAll(this.BUCKET_ID);
  }

  getRealtimeConnectionWithID = (roomID: string) => {
    this.connection = Bucket.data.realtime.getAll(this.BUCKET_ID, {
      filter: {
        room_id: { $regex: roomID },
      },
    });
    return this.connection;
  };
  getRealtimeConnection = () => {
    this.connection = Bucket.data.realtime.getAll(this.BUCKET_ID);
    return this.connection;
  };
}
export default new MessageService();
