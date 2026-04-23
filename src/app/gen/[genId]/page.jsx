import HomeClient from '../../components/HomeClient';
import { GENERATIONS } from '../../constants/pokemon';
import { notFound } from 'next/navigation';

export default async function GenPage({ params }) {
  const { genId } = await params;
  
  const currentGen = GENERATIONS.find((g) => String(g.id) === genId);
  
  if (!currentGen) {
    notFound();
  }

  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025", {
    next: { revalidate: 86400 } // Cache for 24 hours
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch pokemon list');
  }

  const data = await response.json();
  const allFormatted = data.results.map((p) => {
    const id = p.url.split("/").filter(Boolean).pop();
    return { name: p.name, id, url: p.url };
  });

  const slicedList = allFormatted.slice(currentGen.offset, currentGen.offset + currentGen.limit);

  return <HomeClient pokemonList={slicedList} currentGen={currentGen} genId={genId} />;
}
