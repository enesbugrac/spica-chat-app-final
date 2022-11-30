import * as Bucket from "@spica-devkit/bucket";

class UserService {
  private BUCKET_ID = "<USER_BUCKET_ID>";
  private API_KEY = "<YOUR_API_KEY>";

  constructor() {
    Bucket.initialize({
      apikey: this.API_KEY,
      publicUrl: "<YOUR_PUBLIC_URL>",
    });
  }
  getUser = (_id: string) => {
    return Bucket.data.get(this.BUCKET_ID, _id);
  };
  insertUser = async (document: { user_name: string }) => {
    return Bucket.data.insert(this.BUCKET_ID, document);
  };
  deleteUser = async (_id: string) => {
    return Bucket.data.remove(this.BUCKET_ID, _id);
  };
}

export default UserService;
