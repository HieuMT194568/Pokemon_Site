import PokemonDetailClient from '../../components/PokemonDetailClient';
import { notFound } from 'next/navigation';

export default async function PokemonPage({ params }) {
  const { id } = await params;

  const [pokemonRes, speciesRes] = await Promise.all([
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, { next: { revalidate: 86400 } }),
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`, { next: { revalidate: 86400 } }),
  ]);

  if (!pokemonRes.ok || !speciesRes.ok) {
    notFound();
  }

  const pokemonData = await pokemonRes.json();
  const speciesData = await speciesRes.json();

  const abilityDetailsMap = {};
  for (const abilityData of pokemonData.abilities) {
    try {
      const abilityRes = await fetch(abilityData.ability.url, { next: { revalidate: 86400 } });
      if (abilityRes.ok) {
        const abilityDetail = await abilityRes.json();
        abilityDetailsMap[abilityData.ability.name] = abilityDetail;
      }
    } catch (error) {
      console.error(`Error fetching ability ${abilityData.ability.name}:`, error);
    }
  }

  return (
    <PokemonDetailClient 
      pokemon={pokemonData} 
      species={speciesData} 
      abilities={abilityDetailsMap} 
    />
  );
}
