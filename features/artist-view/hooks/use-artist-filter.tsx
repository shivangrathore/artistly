import React from "react";
import { ArtistFilterContext } from "../providers/artist-filter-provider";

export const useArtistFilter = (): ArtistFilterContext => {
  const context = React.useContext(ArtistFilterContext);
  if (!context) {
    throw new Error(
      "useArtistFilter must be used within an ArtistFilterProvider",
    );
  }
  return context;
};
