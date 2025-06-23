"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useArtistFilter } from "../hooks/use-artist-filter";
import { CATEGORIES, LOCATIONS } from "@/data";
import { Label } from "@/components/ui/label";
import { PropsWithChildren, useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";

function FilterItem({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-4">{children}</div>;
}

export default function Filters() {
  const { filters, setFilters } = useArtistFilter();
  const [category, setCategory] = useState<string | undefined>(
    filters.category,
  );
  const [location, setLocation] = useState<string | undefined>(
    filters.location,
  );
  const [limit, setLimit] = useState<number>(filters.limit || 10);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilters({
        category,
        location,
        limit,
      });
    }, 500);
    return () => clearTimeout(timeout);
  }, [category, location, limit, setFilters]);

  return (
    <div className="flex flex-col w-[200px] gap-4 sticky top-0 right-0">
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
        <Label htmlFor="limit">Limit: {limit}</Label>
        <Slider
          step={1}
          min={1}
          max={100}
          className="w-full"
          value={[limit]}
          onValueChange={(v) => setLimit(v[0])}
        />
      </FilterItem>
    </div>
  );
}
