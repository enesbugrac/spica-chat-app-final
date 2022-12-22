import * as Identity from "@spica-devkit/identity";
import * as Bucket from "@spica-devkit/bucket";

import UserService from "./User.service";

export interface User {
  _id: string;
  user_name: string;
}
class AuthService {
  user!: User | null;
  private API_KEY = process.env.REACT_APP_API_KEY || "";
  constructor() {
    this.bucketInitialize();
    this.identityInitialize();
  }

  identityInitialize = () => {
    Identity.initialize({
      apikey: this.API_KEY,
      publicUrl: process.env.REACT_APP_API_URL,
    });
  };
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
  getJwt = () => (localStorage.getItem("userJWT") as string) || "";
  register = (username: string, password: string) => {
    let newIdentity = {
      identifier: username,
      password: password,
      policies: ["BucketFullAccess"],
      attributes: {},
    };

    return (
      UserService.insertUser({ user_name: username }) as Promise<User>
    ).then((newUser) => {
      Identity.insert({
        ...newIdentity,
        attributes: { user: newUser._id },
      });
    });
  };
  login = (username: string, password: string) => {
    return Identity.login(username, password);
  };

  auth = async () => {
    const jwt = this.getJwt();
    this.bucketInitialize();
    return Identity.verifyToken(jwt).then((identityUser: any) =>
      UserService.getUser(identityUser.attributes.user).then(
        (res) => (this.user = res)
      )
    );
  };
}

export default new AuthService();
