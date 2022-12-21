import * as Bucket from "@spica-devkit/bucket";

class RoomService {
  private BUCKET_ID = process.env.REACT_APP_ROOM_BUCKET_ID || "";
  private API_KEY = process.env.REACT_APP_API_KEY || "";

  private connection: Bucket.RealtimeConnection<unknown[]>;

  constructor() {
    console.log(process.env.REACT_APP_API_KEY);
    this.bucketInitialize();
    this.connection = Bucket.data.realtime.getAll(this.BUCKET_ID);
  }
  getJwt = () => (localStorage.getItem("userJWT") as string) || "";

  bucketInitialize = () => {
    const initializeMethod = this.getJwt()
      ? {
          identity: this.getJwt(),
        }
      : { apikey: this.API_KEY };
    Bucket.initialize({
      ...initializeMethod,
      publicUrl: process.env.REACT_APP_API_URL,
    });
  };
  getRoombyID = (roomId: string) => {
    return Bucket.data.get(this.BUCKET_ID, roomId);
  };
  getRealtimeConnection = () => {
    return this.connection;
  };
}

export default new RoomService();
