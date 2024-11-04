import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Header from "../components/Header";
import CreateUserPage from "../pages/CreateUserPage";
import ChatPage from "../pages/ChatPage";

const routes = createRoutesFromElements(
    <Route path="/" element={<Header />}>
        <Route index element={<Landing />} />
        <Route path="/user/:userId?" element={<CreateUserPage />} />
        <Route path="/chat" element={<ChatPage />} />
    </Route>
)

export const router = createBrowserRouter(routes, { basename: '/compunet-2'});
