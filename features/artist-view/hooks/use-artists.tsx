import { Artist } from "@/types";
import { useQuery } from "@tanstack/react-query";
export function useArtists({
  limit = 10,
  location,
  category,
  minPrice,
  maxPrice,
}: {
  limit?: number;
  location?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}) {
  const { data, isLoading } = useQuery<Artist[]>({
    queryKey: ["artists", { limit, location, category, minPrice, maxPrice }],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (limit) searchParams.append("limit", limit.toString());
      if (location) searchParams.append("location", location);
      if (category) searchParams.append("category", category);
      if (minPrice !== undefined)
        searchParams.append("minPrice", minPrice.toString());
      if (maxPrice !== undefined)
        searchParams.append("maxPrice", maxPrice.toString());
      const url = `/api/artists?${searchParams.toString()}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  return { data, isLoading };
}
