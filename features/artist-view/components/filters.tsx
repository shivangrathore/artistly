"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useArtistFilter } from "../hooks/use-artist-filter";
import { CATEGORIES, LOCATIONS, MAX_PRICE, MIN_PRICE } from "@/data";
import { Label } from "@/components/ui/label";
import { PropsWithChildren, useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

function FilterItem({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-4">{children}</div>;
}

export default function Filters() {
  const { filters, setFilters, clearFilters } = useArtistFilter();
  const [category, setCategory] = useState<string | undefined>(
    filters.category,
  );
  const [location, setLocation] = useState<string | undefined>(
    filters.location,
  );
  const [minPrice, setMinPrice] = useState<number | undefined>(
    filters.minPrice,
  );
  const [maxPrice, setMaxPrice] = useState<number | undefined>(
    filters.maxPrice,
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilters({
        category,
        location,
        minPrice,
        maxPrice,
      });
    }, 500);
    return () => clearTimeout(timeout);
  }, [category, location, maxPrice, minPrice, setFilters]);

  const handleClearFilters = () => {
    setCategory(undefined);
    setLocation(undefined);
    setMinPrice(undefined);
    setMaxPrice(undefined);
    clearFilters();
  };

  return (
    <div className="flex flex-row flex-wrap lg:flex-nowrap lg:flex-col lg:w-[240px] gap-4 shrink-0">
      <FilterItem>
        <Label htmlFor="category">Category</Label>
        <Select
          value={category || ""}
          onValueChange={(value) => setCategory(value)}
        >
          <SelectTrigger id="category" className="w-full">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((category) => (
              <SelectItem key={category} value={category.toLowerCase()}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterItem>
      <FilterItem>
        <Label htmlFor="location">Location</Label>
        <Select
          value={location || ""}
          onValueChange={(value) => {
            setLocation(value || undefined);
          }}
        >
          <SelectTrigger id="location" className="w-full">
            <SelectValue placeholder="Select Location" />
          </SelectTrigger>
          <SelectContent>
            {LOCATIONS.map((location) => (
              <SelectItem key={location} value={location.toLowerCase()}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterItem>
      <FilterItem>
        <Label htmlFor="minPrice">Min Price: {minPrice || "Any"}</Label>
        <Slider
          step={1}
          min={MIN_PRICE}
          max={MAX_PRICE}
          className="w-full"
          value={[minPrice || MIN_PRICE]}
          onValueChange={(v) => setMinPrice(v[0] || undefined)}
        />
      </FilterItem>
      <FilterItem>
        <Label htmlFor="maxPrice">Max Price: {maxPrice || "Any"}</Label>
        <Slider
          step={1}
          min={MIN_PRICE}
          max={MAX_PRICE}
          className="w-full"
          value={[maxPrice || MAX_PRICE]}
          onValueChange={(v) => setMaxPrice(v[0] || undefined)}
        />
      </FilterItem>
      <Button variant="outline" className="w-full" onClick={handleClearFilters}>
        Clear Filters
      </Button>
    </div>
  );
}
