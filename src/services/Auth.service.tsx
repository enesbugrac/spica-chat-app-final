import * as Identity from "@spica-devkit/identity";

const API_KEY = "f2bcj17laqlao3a";

export const initializeAuth = () => {
  Identity.initialize({
    apikey: API_KEY,
    publicUrl: "https://master.spicaengine.com/api",
  });
};
export const register = (username: string, password: string) => {
  initializeAuth();
  let newIdentity = {
    identifier: username,
    password: password,
    policies: ["BucketFullAccess"],
    attributes: {},
  };
  return Identity.insert(newIdentity);
};
export const login = (username: string, password: string) => {
  initializeAuth();
  return Identity.login(username, password);
};
export const auth = () => {
  initializeAuth();
  const jwt: string = localStorage.getItem("userJWT") as string;
  return Identity.verifyToken(jwt!);
};
