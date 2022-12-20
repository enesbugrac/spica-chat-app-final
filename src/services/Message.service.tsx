import * as Bucket from "@spica-devkit/bucket";
import Config from "./Config";

class MessageService {
  private BUCKET_ID = Config.MESSAGE_BUCKET_ID;
  constructor() {
    let JWT = localStorage.getItem("userJWT") as string;
    Bucket.initialize({
      identity: JWT as string,
      publicUrl: Config.API_URL,
    });
  }
  getMessagesRealtime = (roomID: string) => {
    return Bucket.data.realtime.getAll(this.BUCKET_ID, {
      filter: {
        room_id: { $regex: roomID },
      },
    });
  };
  insertMessage = (document: object) => {
    return Bucket.data.insert(this.BUCKET_ID, document);
  };
}
export default MessageService;
