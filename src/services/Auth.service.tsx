import * as Identity from "@spica-devkit/identity";

const API_KEY = "<YOUR_API_KEY>";

export const initializeAuth = () => {
  Identity.initialize({
    apikey: API_KEY,
    publicUrl: "<YOUR_API_URL>",
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
