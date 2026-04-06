import { createBrowserRouter } from "react-router";
import { Home } from "./components/Home";
import { PokemonDetail } from "./components/PokemonDetail";
export const router = createBrowserRouter([
    {
        path: "/",
        Component: Home,
    },
    {
        path: "/pokemon/:id",
        Component: PokemonDetail,
    },
]);
