import React, { useState, useEffect, useMemo } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Skeleton,
  Box,
} from "@mui/material";

import type { Pet } from "../components/PetCard/types";
import { PetCard } from "../components/PetCard/PetCard";
import { EventLog } from "../components/EventLog/EventLog";

import petsData from "../data/pets.json";

export const Dashboard: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [speciesFilter, setSpeciesFilter] = useState<string>("all");

  // Симуляция загрузки из API с задержкой
  useEffect(() => {
    const loadPets = async () => {
      setLoading(true);
      // Имитация задержки API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setPets(petsData as Pet[]);
      setLoading(false);
    };

    loadPets();
  }, []);

  // Получение уникальных видов для фильтра
  const uniqueSpecies = useMemo(() => {
    const species = pets.map((pet) => pet.species);
    return ["all", ...Array.from(new Set(species))];
  }, [pets]);

  // Мемоизированный отфильтрованный список питомцев
  const filteredPets = useMemo(() => {
    if (speciesFilter === "all") {
      return pets;
    }
    return pets.filter((pet) => pet.species === speciesFilter);
  }, [pets, speciesFilter]);

  const handleFilterChange = (event: { target: { value: string } }) => {
    setSpeciesFilter(event.target.value);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Кибер-Зоопарк 2077</h1>
        <p className="dashboard-subtitle">Управляй виртуальными животными!</p>
      </header>

      <Box sx={{ maxWidth: 300, margin: "20px auto" }}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="species-filter-label">Фильтр</InputLabel>
          <Select
            labelId="species-filter-label"
            value={speciesFilter}
            onChange={handleFilterChange}
            label="Filter by Species"
            sx={{
              backgroundColor: "white",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#667eea",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#764ba2",
              },
            }}
          >
            {uniqueSpecies.map((species) => (
              <MenuItem key={species} value={species}>
                {species === "all" ? "Все животные" : species}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <div className="pets-grid">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <Box key={n} sx={{ padding: 2 }}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={400}
                sx={{
                  borderRadius: 2,
                  backgroundColor: "rgba(102, 126, 234, 0.1)",
                }}
              />
            </Box>
          ))}
        </div>
      ) : (
        <div className="pets-grid">
          {filteredPets.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                gridColumn: "1 / -1",
                color: "#9ca3af",
              }}
            >
              Животные не найдены...
            </p>
          ) : (
            filteredPets.map((pet) => <PetCard key={pet.id} pet={pet} />)
          )}
        </div>
      )}

      <EventLog />
    </div>
  );
};
