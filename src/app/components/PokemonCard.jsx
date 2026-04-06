import { Link } from "react-router";
import { Card, CardContent } from "./ui/card";
const typeColors = {
    normal: "bg-gray-400",
    fire: "bg-orange-500",
    water: "bg-blue-500",
    electric: "bg-yellow-400",
    grass: "bg-green-500",
    ice: "bg-blue-300",
    fighting: "bg-red-600",
    poison: "bg-purple-500",
    ground: "bg-yellow-600",
    flying: "bg-indigo-400",
    psychic: "bg-pink-500",
    bug: "bg-lime-500",
    rock: "bg-yellow-700",
    ghost: "bg-purple-700",
    dragon: "bg-indigo-600",
    dark: "bg-gray-700",
    steel: "bg-gray-500",
    fairy: "bg-pink-300",
};
export function PokemonCard({ name, id }) {
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    return (<Link to={`/pokemon/${id}`}>
      <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-white border-2 border-gray-200">
        <CardContent className="p-6">
          <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
            <img src={imageUrl} alt={name} className="w-full h-full object-contain p-4" loading="lazy"/>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">#{String(id).padStart(3, "0")}</p>
            <h3 className="text-xl capitalize">{name}</h3>
          </div>
        </CardContent>
      </Card>
    </Link>);
}
