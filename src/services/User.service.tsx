import * as Bucket from "@spica-devkit/bucket";

class UserService {
  private BUCKET_ID = "63870bc3ea080c002bb4a286";
  private API_KEY = "f2bcj17laqlao3a";

  constructor() {
    this.initialize();
  }
  initialize = () => {
    Bucket.initialize({
      apikey: this.API_KEY,
      publicUrl: "https://master.spicaengine.com/api",
    });
  };
  getUser = (_id: string) => {
    this.initialize();
    return Bucket.data.get(this.BUCKET_ID, _id);
  };
  insertUser = async (document: { user_name: string }) => {
    this.initialize();
    return Bucket.data.insert(this.BUCKET_ID, document);
  };
  deleteUser = async (_id: string) => {
    this.initialize();
    return Bucket.data.remove(this.BUCKET_ID, _id);
  };
}

export default UserService;
