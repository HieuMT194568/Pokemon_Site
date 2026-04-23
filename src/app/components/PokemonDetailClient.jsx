"use client";

import Link from "next/link";
import { Button, Card, Tag, Progress, Tabs, Divider, Table } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const typeColorMap = {
  normal: "#a8a878",
  fire: "#f08030",
  water: "#6890f0",
  electric: "#f8d030",
  grass: "#78c850",
  ice: "#98d8d8",
  fighting: "#c03028",
  poison: "#a040a0",
  ground: "#e0c068",
  flying: "#a890f0",
  psychic: "#f85888",
  bug: "#a8b820",
  rock: "#b8a038",
  ghost: "#705898",
  dragon: "#7038f8",
  dark: "#705848",
  steel: "#b8b8d0",
  fairy: "#ee99ac",
};

// Calculate stat at Level 100
function calculateStat(base, iv, ev, isHP) {
  if (isHP) {
    return Math.floor(((2 * base + iv + Math.floor(ev / 4)) * 100) / 100) + 100 + 10;
  } else {
    return Math.floor(((2 * base + iv + Math.floor(ev / 4)) * 100) / 100) + 5;
  }
}

export default function PokemonDetailClient({ pokemon, species, abilities }) {
  const description = species?.flavor_text_entries
    .find((entry) => entry.language.name === "en")
    ?.flavor_text.replace(/\f/g, " ");

  const genus = species?.genera.find((g) => g.language.name === "en")?.genus;

  // Build stats table data
  const statsColumns = [
    {
      title: "Stat",
      dataIndex: "name",
      key: "name",
      render: (text) => <span style={{ textTransform: 'capitalize', fontWeight: 500 }}>{text}</span>,
    },
    {
      title: "Base",
      dataIndex: "base",
      key: "base",
      align: "center",
      render: (val) => <Tag color="blue">{val}</Tag>,
    },
    {
      title: (
        <div style={{ textAlign: 'center' }}>
          <div>Min</div>
          <div style={{ fontSize: 11, opacity: 0.5 }}>(0 IV, 0 EV)</div>
        </div>
      ),
      dataIndex: "min",
      key: "min",
      align: "center",
      render: (val) => <span style={{ fontWeight: 600, color: '#ff4d4f' }}>{val}</span>,
    },
    {
      title: (
        <div style={{ textAlign: 'center' }}>
          <div>Max</div>
          <div style={{ fontSize: 11, opacity: 0.5 }}>(31 IV, 252 EV)</div>
        </div>
      ),
      dataIndex: "max",
      key: "max",
      align: "center",
      render: (val) => <span style={{ fontWeight: 600, color: '#52c41a' }}>{val}</span>,
    },
  ];

  const statsData = pokemon.stats.map((stat) => {
    const isHP = stat.stat.name === "hp";
    return {
      key: stat.stat.name,
      name: stat.stat.name.replace("-", " "),
      base: stat.base_stat,
      min: calculateStat(stat.base_stat, 0, 0, isHP),
      max: calculateStat(stat.base_stat, 31, 252, isHP),
    };
  });

  // Summary row
  const totalBase = pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0);
  const totalMin = pokemon.stats.reduce((sum, s) => {
    const isHP = s.stat.name === "hp";
    return sum + calculateStat(s.base_stat, 0, 0, isHP);
  }, 0);
  const totalMax = pokemon.stats.reduce((sum, s) => {
    const isHP = s.stat.name === "hp";
    return sum + calculateStat(s.base_stat, 31, 252, isHP);
  }, 0);

  statsData.push({
    key: "total",
    name: "Total",
    base: totalBase,
    min: totalMin,
    max: totalMax,
  });

  const tabItems = [
    {
      key: "stats",
      label: "Stats",
      children: (
        <div>
          <div className="stats-info-banner">
            Stats shown at Level 100 with neutral nature
          </div>

          <Table
            className="stats-table"
            columns={statsColumns}
            dataSource={statsData}
            pagination={false}
            size="small"
            bordered
            rowClassName={(record) => record.key === 'total' ? 'stats-total-row' : ''}
          />

          <div className="stat-distribution">
            <h4>Base Stats Distribution</h4>
            {pokemon.stats.map((stat) => {
              const maxPossible = 255;
              const percent = Math.round((stat.base_stat / maxPossible) * 100);
              return (
                <div key={stat.stat.name} className="stat-bar-item">
                  <div className="stat-bar-header">
                    <span>{stat.stat.name.replace("-", " ")}</span>
                    <span>{stat.base_stat}/{maxPossible}</span>
                  </div>
                  <Progress
                    percent={percent}
                    showInfo={false}
                    strokeColor={{
                      from: '#ff4d4f',
                      to: '#ff7875',
                    }}
                    size="small"
                  />
                </div>
              );
            })}
          </div>
        </div>
      ),
    },
    {
      key: "about",
      label: "About",
      children: (
        <div>
          <div className="about-grid">
            <div className="about-card">
              <div className="label">Height</div>
              <div className="value">{pokemon.height / 10} m</div>
              <div className="sub">
                {Math.round((pokemon.height / 10) * 3.28084 * 10) / 10} ft
              </div>
            </div>
            <div className="about-card">
              <div className="label">Weight</div>
              <div className="value">{pokemon.weight / 10} kg</div>
              <div className="sub">
                {Math.round((pokemon.weight / 10) * 2.20462 * 10) / 10} lbs
              </div>
            </div>
          </div>

          <div className="about-card">
            <h4 style={{ fontWeight: 600, marginBottom: 8 }}>Type</h4>
            <div style={{ display: 'flex', gap: 8 }}>
              {pokemon.types.map((type) => (
                <Tag
                  key={type.type.name}
                  className={`type-${type.type.name}`}
                  style={{ textTransform: 'capitalize', fontSize: 13 }}
                >
                  {type.type.name}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "abilities",
      label: "Abilities",
      children: (
        <div>
          {pokemon.abilities.map((abilityData) => {
            const abilityDetail = abilities[abilityData.ability.name];
            const effectEntry = abilityDetail?.effect_entries.find(
              (entry) => entry.language.name === "en"
            );
            const flavorText = abilityDetail?.flavor_text_entries.find(
              (entry) => entry.language.name === "en"
            )?.flavor_text;

            return (
              <Card
                key={abilityData.ability.name}
                className="ability-card"
                size="small"
              >
                <div className="ability-header">
                  <span className="ability-name">
                    {abilityData.ability.name.replace("-", " ")}
                  </span>
                  {abilityData.is_hidden && (
                    <Tag color="purple">Hidden Ability</Tag>
                  )}
                </div>

                {effectEntry?.short_effect && (
                  <div className="ability-effect-box" style={{ marginTop: 12 }}>
                    <div className="label">Effect</div>
                    <p>{effectEntry.short_effect}</p>
                  </div>
                )}

                {effectEntry?.effect &&
                  effectEntry.effect !== effectEntry.short_effect && (
                    <div className="ability-detail-box">
                      <div className="label">Detailed Description</div>
                      <p>{effectEntry.effect}</p>
                    </div>
                  )}

                {flavorText && (
                  <>
                    <Divider />
                    <p className="ability-flavor">{flavorText}</p>
                  </>
                )}
              </Card>
            );
          })}
        </div>
      ),
    },
  ];

  return (
    <div className="detail-page">
      <div className="detail-container">
        <div className="back-button">
          <Link href="/">
            <Button icon={<ArrowLeftOutlined />}>
              Back to Pokédex
            </Button>
          </Link>
        </div>

        <Card>
          <div className="detail-header">
            <div className="detail-id">
              #{String(pokemon.id).padStart(3, "0")}
            </div>
            <h1 className="detail-name">{pokemon.name}</h1>
            {genus && <p className="detail-genus">{genus}</p>}
            <div className="detail-types">
              {pokemon.types.map((type) => (
                <Tag
                  key={type.type.name}
                  className={`type-${type.type.name}`}
                  style={{ textTransform: 'capitalize', fontSize: 14, padding: '2px 12px' }}
                >
                  {type.type.name}
                </Tag>
              ))}
            </div>
          </div>

          <div className="detail-artwork-wrapper">
            <div className="detail-artwork-container">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt={pokemon.name}
              />
            </div>
          </div>

          {description && (
            <div className="detail-description">
              <p>{description}</p>
            </div>
          )}

          <Tabs
            defaultActiveKey="stats"
            items={tabItems}
            centered
            size="large"
          />
        </Card>
      </div>
    </div>
  );
}
