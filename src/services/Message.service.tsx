import * as Bucket from "@spica-devkit/bucket";

class MessageService {
  private BUCKET_ID = process.env.REACT_APP_MESSAGE_BUCKET_ID || "";
  private connection: Bucket.RealtimeConnection<unknown[]> | null = null;

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
