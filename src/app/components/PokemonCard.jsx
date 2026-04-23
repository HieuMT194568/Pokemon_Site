import Link from "next/link";
import { Card } from "antd";

export function PokemonCard({ name, id }) {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <Link href={`/pokemon/${id}`} className="pokemon-card-link">
      <Card
        className="pokemon-card"
        variant="borderless"
        styles={{ body: { padding: 0 } }}
      >
        <div className="card-image-container">
          {/* ID Badge */}
          <div className="card-id-badge">
            #{String(id).padStart(3, "0")}
          </div>

          {/* PokeBall Watermark */}
          <div className="card-pokeball-watermark">
            <div className="pokeball-ring">
              <div className="pokeball-line" />
              <div className="pokeball-center" />
            </div>
          </div>

          <img
            src={imageUrl}
            alt={name}
            className="card-pokemon-img"
            loading="lazy"
          />
        </div>

        <div className="card-name-section">
          <div className="card-pokemon-name">
            {name.replace("-", " ")}
          </div>
          <div className="card-hover-line" />
        </div>
      </Card>
    </Link>
  );
}
