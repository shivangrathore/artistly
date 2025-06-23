"use client";

import { useArtistFilter } from "../hooks/use-artist-filter";
import { useArtists } from "../hooks/use-artists";
import { ArtistCard } from "./artist-card";
import { ArtistCardSkeleton } from "./artist-card-skeleton";

export default function ArtistList() {
  return (
    <div className="flex-grow">
      <Wrapper />
    </div>
  );
}

function Wrapper() {
  const { limit, category, location, minPrice, maxPrice } = useArtistFilter();
  const { data, isLoading } = useArtists({
    limit,
    category,
    location,
    minPrice,
    maxPrice,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, index) => (
          <ArtistCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <div>No artists found</div>;
  }
  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map((artist) => (
        <ArtistCard key={artist.id} artist={artist} />
      ))}
    </div>
  );
}
