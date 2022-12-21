import * as Bucket from "@spica-devkit/bucket";
import { User } from "./Auth.service";

class UserService {
  private BUCKET_ID = process.env.REACT_APP_USER_BUCKET_ID || "";

  getUser = (_id: string): Promise<User> => {
    return Bucket.data.get(this.BUCKET_ID, _id);
  };
  insertUser = async (document: { user_name: string }) => {
    return Bucket.data.insert(this.BUCKET_ID, document);
  };
  deleteUser = async (_id: string) => {
    return Bucket.data.remove(this.BUCKET_ID, _id);
  };
}

export default new UserService();
