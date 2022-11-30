import * as Identity from "@spica-devkit/identity";
import UserService from "./User.service";

class AuthService {
  private API_KEY = "<YOUR_API_KEY>";
  constructor() {
    Identity.initialize({
      apikey: this.API_KEY,
      publicUrl: "<YOUR_PUBLIC_URL>",
    });
  }
  register = async (username: string, password: string) => {
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
      console.log(err);
    });
  };
  login = (username: string, password: string) => {
    return Identity.login(username, password);
  };
  auth = async () => {
    const jwt: string = localStorage.getItem("userJWT") as string;
    const userService = new UserService();
    let identityUser: any = await Identity.verifyToken(jwt!).catch(
      console.error
    );
    return userService.getUser(identityUser.attributes.message_users);
  };
}

export default AuthService;
