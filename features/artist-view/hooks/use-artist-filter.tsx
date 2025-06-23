import { useCallback, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

type Filters = {
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  limit: number;
  offset: number;
  location?: string;
};

export const useArtistFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters = useMemo(() => {
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const category = searchParams.get("category");
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset");
    const location = searchParams.get("location");
    return {
      minPrice: minPrice ? parseInt(minPrice) : undefined,
      maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
      category: category || undefined,
      limit: limit ? parseInt(limit, 10) : 9,
      offset: offset ? parseInt(offset, 10) : 0,
      location: location || undefined,
    };
  }, [searchParams]);

  const setFilters = useCallback(
    (newFilters: Partial<Filters>) => {
      const currentParams = new URLSearchParams(searchParams.toString());

      Object.entries(newFilters).forEach(([key, value]) => {
        if (value) {
          currentParams.set(key, value as any);
        } else {
          currentParams.delete(key);
        }
      });

      const search = currentParams.toString();
      const query = search ? `?${search}` : "";
      const url = `${pathname}${query}`;

      router.replace(url, { scroll: false });
    },
    [router, searchParams, pathname],
  );

  const clearFilters = useCallback(() => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.delete("minPrice");
    currentParams.delete("maxPrice");
    currentParams.delete("category");
    currentParams.delete("location");
    currentParams.delete("limit");
    currentParams.delete("offset");

    const search = currentParams.toString();
    const query = search ? `?${search}` : "";
    const url = `${pathname}${query}`;

    router.replace(url, { scroll: false });
  }, [router, searchParams, pathname]);

  return { filters, setFilters, clearFilters };
};
