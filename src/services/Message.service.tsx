import * as Bucket from "@spica-devkit/bucket";
const BUCKET_ID = "<MESSAGES_BUCKET_ID>";

export const initializeMessages = () => {
  let JWT = localStorage.getItem("userJWT") as string;
  Bucket.initialize({
    identity: JWT as string,
    publicUrl: "<YOUR_API_URL>",
  });
};
export const getMessagesRealtime = (roomID: string) => {
  initializeMessages();
  return Bucket.data.realtime.getAll(BUCKET_ID, {
    filter: {
      room_id: { $regex: roomID },
    },
  });
};
export const insertMessage = (document: object) => {
  initializeMessages();
  return Bucket.data.insert(BUCKET_ID, document);
};
