import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./components/Home";
import PokemonDetail from "./components/PokemonDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // Chỉ dùng tên component, không bọc BrowserRouter
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "pokemon/:id",
        element: <PokemonDetail />,
      },
    ],
  },
]);

export default router;