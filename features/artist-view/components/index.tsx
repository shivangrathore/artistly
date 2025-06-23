import { ArtistFilterProvider } from "../providers/artist-filter-provider";
import ArtistList from "./artist-list";
import Filters from "./filters";

export function ArtistView() {
  return (
    <ArtistFilterProvider>
      <div className="flex gap-20">
        <ArtistList />
        <Filters />
      </div>
    </ArtistFilterProvider>
  );
}
