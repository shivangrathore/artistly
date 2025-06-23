import ArtistList from "./artist-list";
import Filters from "./filters";

export function ArtistView() {
  return (
    <div className="flex gap-20">
      <ArtistList />
      <Filters />
    </div>
  );
}
