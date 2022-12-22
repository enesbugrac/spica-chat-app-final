import { Navigate, Outlet } from "react-router-dom";
import { ChatRoom } from "./components/ChatRoom";
import { Landing } from "./components/Landing";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import AuthService from "./services/Auth.service";

const routes = () => {
  AuthService.auth();
  return [
    {
      path: "/",
      element: !AuthService.user ? <Outlet /> : <Navigate to="/landing" />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "/", element: <Navigate to="/login" /> },
      ],
    },
    {
      path: "/",
      element: AuthService.user ? <Outlet /> : <Navigate to="/login" />,
      children: [
        { path: "landing", element: <Landing /> },
        { path: "room/:id", element: <ChatRoom /> },
      ],
    },
  ];
};
export default routes;
