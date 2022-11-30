import * as Bucket from "@spica-devkit/bucket";

class MessageService {
  private BUCKET_ID = "<MESSAGE_BUCKET_ID>";
  constructor() {
    let JWT = localStorage.getItem("userJWT") as string;
    Bucket.initialize({
      identity: JWT as string,
      publicUrl: "<YOUR_PUBLIC_URL>",
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
