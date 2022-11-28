import * as Bucket from "@spica-devkit/bucket";
const BUCKET_ID = "637f3e12ea080c002bb421f1";

export const initializeRoom = () => {
  let JWT = localStorage.getItem("userJWT") as string;
  Bucket.initialize({
    identity: JWT,
    publicUrl: "https://master.spicaengine.com/api",
  });
};
export const getRoombyID = (roomId: string) => {
  initializeRoom();
  return Bucket.data.get(BUCKET_ID, roomId);
};
export const getAllRoomsRealTime = () => {
  initializeRoom();
  return Bucket.data.realtime.getAll(BUCKET_ID);
};
export const insertRoom = (document: object) => {
  initializeRoom();
  return Bucket.data.insert(BUCKET_ID, document);
};
