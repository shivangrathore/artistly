"use client";

import { InfiniteScrolling } from "@/components/infinite-scrolling";
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
  const {
    filters: { minPrice, maxPrice, category, limit, location },
  } = useArtistFilter();
  const { data, isLoading, fetchNextPage, isFetchingNextPage } = useArtists({
    limit,
    category,
    location,
    minPrice,
    maxPrice,
  });

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <ArtistCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <div>No artists found</div>;
  }
  return (
    <div className="grid md:grid-cols-2  lg:grid-cols-3 gap-4">
      {data.map((artist) => (
        <ArtistCard key={artist.id} artist={artist} />
      ))}
      {isFetchingNextPage && (
        <>
          {Array.from({ length: 3 }).map((_, index) => (
            <ArtistCardSkeleton key={index} />
          ))}
        </>
      )}
      <InfiniteScrolling nextPage={fetchNextPage} />
    </div>
  );
}
