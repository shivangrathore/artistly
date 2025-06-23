"use client";
import { useSearchParams } from "next/navigation";
import React, { PropsWithChildren } from "react";

export type ArtistFilterContext = {
  minPrice: number | undefined;
  maxPrice: number | undefined;
  category: string | undefined;
  limit: number;
  offset: number;
  location: string | undefined;
  setLimit: (limit: number) => void;
  setLocation: (location: string | undefined) => void;
  setOffset: (offset: number) => void;
  setMinPrice: (price: number | undefined) => void;
  setMaxPrice: (price: number | undefined) => void;
  setCategory: (category: string) => void;
  resetFilters: () => void;
};

export const ArtistFilterContext = React.createContext<
  ArtistFilterContext | undefined
>(undefined);

export const ArtistFilterProvider = ({ children }: PropsWithChildren) => {
  const searchParams = useSearchParams();
  const [minPrice, setMinPrice] = React.useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = React.useState<number | undefined>(undefined);
  const [category, setCategory] = React.useState<string | undefined>(undefined);
  const [location, setLocation] = React.useState<string | undefined>(undefined);
  const [limit, setLimit] = React.useState(10);
  const [offset, setOffset] = React.useState(0);

  const resetFilters = () => {
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setCategory(undefined);
    setLimit(10);
    setOffset(0);
    setLocation(undefined);
  };

  return (
    <ArtistFilterContext.Provider
      value={{
        minPrice,
        maxPrice,
        category,
        limit,
        offset,
        location,
        setMinPrice,
        setMaxPrice,
        setCategory,
        setLimit,
        setOffset,
        resetFilters,
        setLocation,
      }}
    >
      {children}
    </ArtistFilterContext.Provider>
  );
};
