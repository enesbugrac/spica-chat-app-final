import * as Identity from "@spica-devkit/identity";
import UserService from "./User.service";

class AuthService {
  private API_KEY = "f2bcj17laqlao3a";
  constructor() {
    this.initialize();
  }
  initialize = () => {
    Identity.initialize({
      apikey: this.API_KEY,
      publicUrl: "https://master.spicaengine.com/api",
    });
  };
  register = async (username: string, password: string) => {
    this.initialize();
    let newIdentity = {
      identifier: username,
      password: password,
      policies: ["BucketFullAccess"],
      attributes: {},
    };
    const userService = new UserService();
    let user: any = await userService
      .insertUser({ user_name: username })
      .catch(console.error);
    await Identity.insert({
      ...newIdentity,
      attributes: { message_users: user?._id },
    }).catch((err) => {
      userService.deleteUser(user?._id!);
    });
  };
  login = (username: string, password: string) => {
    this.initialize();
    return Identity.login(username, password);
  };
  auth = async () => {
    this.initialize();
    const jwt: string = localStorage.getItem("userJWT") as string;
    const userService = new UserService();
    if (jwt) {
      let identityUser: any = await Identity.verifyToken(jwt!).catch((err) => {
        throw new Error(err);
      });
      console.log(identityUser);
      return userService.getUser(identityUser.attributes.message_users);
    } else {
      throw new Error("JWT not found!");
    }
  };
}

export default AuthService;
