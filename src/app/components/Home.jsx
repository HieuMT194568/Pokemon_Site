import { useState, useEffect } from "react";
import { PokemonCard } from "./PokemonCard";
import { Loader2 } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
export default function Home() {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [displayCount, setDisplayCount] = useState(20);
    useEffect(() => {
        fetchPokemon();
    }, []);
    const fetchPokemon = async () => {
        try {
            setLoading(true);
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
            const data = await response.json();
            setPokemon(data.results);
        }
        catch (error) {
            console.error("Error fetching Pokemon:", error);
        }
        finally {
            setLoading(false);
        }
    };
    const filteredPokemon = pokemon.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const displayedPokemon = filteredPokemon.slice(0, displayCount);
    if (loading) {
        return (<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Loader2 className="size-12 animate-spin text-blue-600"/>
      </div>);
    }
    return (<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl mb-4 text-blue-900">Pokédex</h1>
          <p className="text-gray-600 mb-6">
            Discover and explore detailed information about your favorite Pokémon
          </p>
          <div className="max-w-md mx-auto">
            <Input type="text" placeholder="Search Pokémon..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-white"/>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedPokemon.map((p, index) => {
            const id = p.url.split("/").filter(Boolean).pop();
            return <PokemonCard key={p.name} name={p.name} id={id || String(index + 1)}/>;
        })}
        </div>

        {displayedPokemon.length < filteredPokemon.length && (<div className="text-center mt-8">
            <Button onClick={() => setDisplayCount(displayCount + 20)} variant="outline" className="bg-white">
              Load More
            </Button>
          </div>)}

        {filteredPokemon.length === 0 && (<div className="text-center text-gray-500 mt-8">
            No Pokémon found matching "{searchTerm}"
          </div>)}
      </div>
    </div>);
}
