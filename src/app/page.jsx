import HomeClient from './components/HomeClient';

export default async function Page() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025", {
    next: { revalidate: 86400 } // Cache for 24 hours
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch pokemon list');
  }

  const data = await response.json();
  const formattedList = data.results.map((p) => {
    const id = p.url.split("/").filter(Boolean).pop();
    return { name: p.name, id, url: p.url };
  });

  return <HomeClient pokemonList={formattedList} currentGen={null} genId={null} />;
}
