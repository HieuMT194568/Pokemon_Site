"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { PokemonCard } from "./PokemonCard";
import { Button, Input, Select, FloatButton } from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  ClearOutlined,
} from "@ant-design/icons";
import { GENERATIONS, POKEMON_TYPES } from "../constants/pokemon";

const fetchTypeData = async (type) => {
  if (type === "all") return null;
  const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  if (!response.ok) throw new Error("Failed to fetch type data");
  const data = await response.json();
  return new Set(data.pokemon.map((p) => p.pokemon.name));
};

export default function HomeClient({ pokemonList, currentGen, genId }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  // TanStack Query for Type filtering
  const { data: typeFilteredNames, isLoading: loadingType } = useQuery({
    queryKey: ["pokemonType", selectedType],
    queryFn: () => fetchTypeData(selectedType),
    staleTime: Infinity,
  });

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const filteredPokemon = useMemo(() => {
    let filtered = pokemonList;

    // Filter by Type
    if (typeFilteredNames) {
      filtered = filtered.filter((p) => typeFilteredNames.has(p.name));
    }

    // Filter by Search
    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [pokemonList, typeFilteredNames, searchTerm]);

  // Window Resize Logic for Columns
  const [columns, setColumns] = useState(5);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      // Subtracting sidebar and paddings roughly
      const availableWidth = width > 768 ? width - 256 - 48 : width - 32;
      const cardMin = 220;
      const gap = 24;
      // Formula: cols * cardMin + (cols - 1) * gap <= availableWidth
      let calculatedCols = Math.floor((availableWidth + gap) / (cardMin + gap));
      
      if (calculatedCols < 2) calculatedCols = 2; // min 2 cols on mobile
      if (calculatedCols > 5) calculatedCols = 5; // max 5 cols

      setColumns(calculatedCols);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // Chunking
  const rows = useMemo(() => {
    const result = [];
    for (let i = 0; i < filteredPokemon.length; i += columns) {
      result.push(filteredPokemon.slice(i, i + columns));
    }
    return result;
  }, [filteredPokemon, columns]);

  // TanStack Virtualizer
  const listRef = useRef(null);
  const listOffsetRef = useRef(0);

  useEffect(() => {
    if (listRef.current) {
      listOffsetRef.current = listRef.current.getBoundingClientRect().top + window.scrollY;
    }
  }, [filteredPokemon]); // Recalculate offset if elements above change height

  const rowVirtualizer = useWindowVirtualizer({
    count: rows.length,
    estimateSize: () => 350, // rough estimate of card height + gap
    scrollMargin: listOffsetRef.current,
    overscan: 2,
  });

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedType("all");
    if (genId) {
      router.push("/");
    }
  };

  const typeOptions = [
    { value: "all", label: "All Types" },
    ...POKEMON_TYPES.map((type) => ({
      value: type,
      label: type.charAt(0).toUpperCase() + type.slice(1),
    })),
  ];

  const genOptions = [
    { value: "all", label: "All Generations" },
    ...GENERATIONS.map((gen) => ({
      value: String(gen.id),
      label: gen.name,
    })),
  ];

  return (
    <div className="page-content">
      <div className="home-header">
        <div className="home-header-row">
          <div>
            <h1 className="home-title">
              {currentGen ? currentGen.name : "National Pokédex"}
            </h1>
            <p className="home-subtitle">
              {currentGen
                ? `Exploring ${currentGen.region} region Pokémon`
                : "Database of all known Pokémon species across all regions"}
            </p>
          </div>

          <div>
            {(searchTerm || selectedType !== "all" || genId) && (
              <Button
                type="primary"
                danger
                icon={<ClearOutlined />}
                onClick={resetFilters}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        <div className="controls-bar" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="search-input-wrapper">
            <Input
              placeholder="Search by name or number..."
              prefix={<SearchOutlined style={{ color: 'rgba(255,255,255,0.3)' }} />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
              size="large"
            />
          </div>

          <div className="filter-selects">
            <Select
              value={selectedType}
              onChange={handleTypeChange}
              options={typeOptions}
              loading={loadingType}
              suffixIcon={<FilterOutlined />}
              style={{ minWidth: 180 }}
              size="large"
            />

            <Select
              value={genId || "all"}
              onChange={(val) => router.push(val === "all" ? "/" : `/gen/${val}`)}
              options={genOptions}
              style={{ minWidth: 180 }}
              size="large"
            />
          </div>
        </div>
      </div>

      <div className="results-info">
        <p>
          Showing {filteredPokemon.length} Pokémon
          {loadingType && (
            <span style={{ marginLeft: 8, animation: 'pulse 2s infinite' }}>
              Filtering types...
            </span>
          )}
        </p>
      </div>

      {/* TanStack Virtual Container */}
      <div ref={listRef}>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <div
              key={virtualRow.index}
              data-index={virtualRow.index}
              ref={rowVirtualizer.measureElement}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start - rowVirtualizer.options.scrollMargin}px)`,
                display: "grid",
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gap: "24px",
                paddingBottom: "24px",
              }}
            >
              {rows[virtualRow.index].map((p) => (
                <PokemonCard key={p.name} name={p.name} id={p.id} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {filteredPokemon.length === 0 && !loadingType && (
        <div className="no-results">
          <div className="no-results-icon">
            <SearchOutlined />
          </div>
          <h3>No Pokémon Found</h3>
          <p>We couldn't find any Pokémon matching your search or filters. Try adjusting them!</p>
          <Button
            type="link"
            danger
            onClick={resetFilters}
            style={{ marginTop: 16 }}
          >
            Reset all filters
          </Button>
        </div>
      )}

      <FloatButton.BackTop tooltip={{ title: 'Scroll to top', placement: 'left' }} />
    </div>
  );
}
