import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
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
// Calculate stat at Level 100
function calculateStat(base, iv, ev, isHP) {
    if (isHP) {
        return Math.floor(((2 * base + iv + Math.floor(ev / 4)) * 100) / 100) + 100 + 10;
    }
    else {
        return Math.floor(((2 * base + iv + Math.floor(ev / 4)) * 100) / 100) + 5;
    }
}
export default function PokemonDetail() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [species, setSpecies] = useState(null);
    const [abilities, setAbilities] = useState(new Map());
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchPokemonData();
    }, [id]);
    const fetchPokemonData = async () => {
        try {
            setLoading(true);
            const [pokemonRes, speciesRes] = await Promise.all([
                fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
                fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
            ]);
            const pokemonData = await pokemonRes.json();
            const speciesData = await speciesRes.json();
            setPokemon(pokemonData);
            setSpecies(speciesData);
            // Fetch ability details
            const abilityDetailsMap = new Map();
            for (const abilityData of pokemonData.abilities) {
                try {
                    const abilityRes = await fetch(abilityData.ability.url);
                    const abilityDetail = await abilityRes.json();
                    abilityDetailsMap.set(abilityData.ability.name, abilityDetail);
                }
                catch (error) {
                    console.error(`Error fetching ability ${abilityData.ability.name}:`, error);
                }
            }
            setAbilities(abilityDetailsMap);
        }
        catch (error) {
            console.error("Error fetching Pokemon data:", error);
        }
        finally {
            setLoading(false);
        }
    };
    if (loading) {
        return (<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Loader2 className="size-12 animate-spin text-blue-600"/>
      </div>);
    }
    if (!pokemon) {
        return (<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <p className="text-xl mb-4">Pokémon not found</p>
          <Link to="/">
            <Button>
              <ArrowLeft className="mr-2 size-4"/>
              Back to Pokédex
            </Button>
          </Link>
        </div>
      </div>);
    }
    const description = species?.flavor_text_entries
        .find((entry) => entry.language.name === "en")
        ?.flavor_text.replace(/\f/g, " ");
    const genus = species?.genera.find((g) => g.language.name === "en")?.genus;
    return (<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link to="/">
          <Button variant="outline" className="mb-6 bg-white">
            <ArrowLeft className="mr-2 size-4"/>
            Back to Pokédex
          </Button>
        </Link>

        <Card className="bg-white shadow-xl">
          <CardHeader className="text-center pb-4">
            <div className="text-sm text-gray-500 mb-2">
              #{String(pokemon.id).padStart(3, "0")}
            </div>
            <CardTitle className="text-4xl capitalize mb-2">{pokemon.name}</CardTitle>
            {genus && <p className="text-gray-600">{genus}</p>}
            <div className="flex gap-2 justify-center mt-4">
              {pokemon.types.map((type) => (<Badge key={type.type.name} className={`${typeColors[type.type.name]} text-white capitalize px-4 py-1`}>
                  {type.type.name}
                </Badge>))}
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex justify-center mb-6">
              <div className="w-64 h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
                <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} className="w-full h-full object-contain p-4"/>
              </div>
            </div>

            {description && (<div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-gray-700 text-center">{description}</p>
              </div>)}

            <Tabs defaultValue="stats" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="stats">Stats</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="abilities">Abilities</TabsTrigger>
              </TabsList>

              <TabsContent value="stats" className="mt-4">
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-700 text-center">
                    Stats shown at Level 100 with neutral nature
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-2">Stat</th>
                        <th className="text-center py-3 px-2">Base</th>
                        <th className="text-center py-3 px-2 bg-red-50">
                          <div className="text-sm">Min</div>
                          <div className="text-xs text-gray-500">(0 IV, 0 EV)</div>
                        </th>
                        <th className="text-center py-3 px-2 bg-green-50">
                          <div className="text-sm">Max</div>
                          <div className="text-xs text-gray-500">(31 IV, 252 EV)</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pokemon.stats.map((stat) => {
            const isHP = stat.stat.name === "hp";
            const minStat = calculateStat(stat.base_stat, 0, 0, isHP);
            const maxStat = calculateStat(stat.base_stat, 31, 252, isHP);
            return (<tr key={stat.stat.name} className="border-b border-gray-100">
                            <td className="py-3 px-2 capitalize font-medium">
                              {stat.stat.name.replace("-", " ")}
                            </td>
                            <td className="text-center py-3 px-2">
                              <Badge variant="secondary">{stat.base_stat}</Badge>
                            </td>
                            <td className="text-center py-3 px-2 bg-red-50">
                              <span className="font-semibold text-red-700">{minStat}</span>
                            </td>
                            <td className="text-center py-3 px-2 bg-green-50">
                              <span className="font-semibold text-green-700">{maxStat}</span>
                            </td>
                          </tr>);
        })}
                      <tr className="border-t-2 border-gray-200 font-semibold">
                        <td className="py-3 px-2">Total</td>
                        <td className="text-center py-3 px-2">
                          <Badge className="bg-blue-600">
                            {pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
                          </Badge>
                        </td>
                        <td className="text-center py-3 px-2 bg-red-50">
                          <span className="text-red-700">
                            {pokemon.stats.reduce((sum, stat) => {
            const isHP = stat.stat.name === "hp";
            return sum + calculateStat(stat.base_stat, 0, 0, isHP);
        }, 0)}
                          </span>
                        </td>
                        <td className="text-center py-3 px-2 bg-green-50">
                          <span className="text-green-700">
                            {pokemon.stats.reduce((sum, stat) => {
            const isHP = stat.stat.name === "hp";
            return sum + calculateStat(stat.base_stat, 31, 252, isHP);
        }, 0)}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 space-y-3">
                  <h4 className="font-semibold text-sm">Base Stats Distribution</h4>
                  {pokemon.stats.map((stat) => {
            const maxPossible = 255;
            return (<div key={stat.stat.name}>
                        <div className="flex justify-between mb-1 text-sm">
                          <span className="capitalize">{stat.stat.name.replace("-", " ")}</span>
                          <span className="text-gray-600">{stat.base_stat}/{maxPossible}</span>
                        </div>
                        <Progress value={(stat.base_stat / maxPossible) * 100} className="h-2"/>
                      </div>);
        })}
                </div>
              </TabsContent>

              <TabsContent value="about" className="mt-4">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">Height</p>
                    <p className="text-xl">{pokemon.height / 10} m</p>
                    <p className="text-sm text-gray-500">
                      {Math.round((pokemon.height / 10) * 3.28084 * 10) / 10} ft
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">Weight</p>
                    <p className="text-xl">{pokemon.weight / 10} kg</p>
                    <p className="text-sm text-gray-500">
                      {Math.round((pokemon.weight / 10) * 2.20462 * 10) / 10} lbs
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Type</h4>
                  <div className="flex gap-2">
                    {pokemon.types.map((type) => (<Badge key={type.type.name} className={`${typeColors[type.type.name]} text-white capitalize`}>
                        {type.type.name}
                      </Badge>))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="abilities" className="mt-4 space-y-4">
                {pokemon.abilities.map((abilityData) => {
            const abilityDetail = abilities.get(abilityData.ability.name);
            const effectEntry = abilityDetail?.effect_entries.find((entry) => entry.language.name === "en");
            const flavorText = abilityDetail?.flavor_text_entries.find((entry) => entry.language.name === "en")?.flavor_text;
            return (<Card key={abilityData.ability.name} className="border-2">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl capitalize">
                            {abilityData.ability.name.replace("-", " ")}
                          </CardTitle>
                          {abilityData.is_hidden && (<Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-300">
                              Hidden Ability
                            </Badge>)}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {effectEntry?.short_effect && (<div className="bg-blue-50 rounded-lg p-3">
                            <p className="text-sm font-semibold text-blue-900 mb-1">Effect</p>
                            <p className="text-sm text-gray-700">{effectEntry.short_effect}</p>
                          </div>)}
                        {effectEntry?.effect && effectEntry.effect !== effectEntry.short_effect && (<div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-sm font-semibold text-gray-900 mb-1">
                              Detailed Description
                            </p>
                            <p className="text-sm text-gray-700">{effectEntry.effect}</p>
                          </div>)}
                        {flavorText && (<div className="border-t pt-3">
                            <p className="text-sm text-gray-600 italic">{flavorText}</p>
                          </div>)}
                      </CardContent>
                    </Card>);
        })}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>);
}
