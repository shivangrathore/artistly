import { Artist } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";

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
  const { data, isLoading, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["artists", { limit, location, category, minPrice, maxPrice }],
      queryFn: async ({ pageParam = 0 }) => {
        const searchParams = new URLSearchParams();
        if (limit) searchParams.append("limit", limit.toString());
        if (location) searchParams.append("location", location);
        if (category) searchParams.append("category", category);
        if (minPrice !== undefined)
          searchParams.append("minPrice", minPrice.toString());
        if (maxPrice !== undefined)
          searchParams.append("maxPrice", maxPrice.toString());
        searchParams.append("offset", pageParam.toString());

        const url = `/api/artists?${searchParams.toString()}`;
        console.log("Fetching artists from URL:", url);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: { data: Artist[]; hasNextPage: boolean } =
          await response.json();
        return data;
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage.hasNextPage) {
          return undefined;
        }
        let offset = (pages.length - 1) * (limit || 10);
        offset += lastPage.data.length;
        return offset;
      },
    });

  return {
    data: data?.pages.flatMap((page) => page.data),
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
  };
}
