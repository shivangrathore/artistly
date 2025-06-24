import { Suspense } from "react";
import ArtistList from "./artist-list";
import Filters from "./filters";

export function ArtistView() {
  return (
    <Suspense>
      <div className="flex gap-20 flex-col-reverse lg:flex-row">
        <ArtistList />
        <Filters />
      </div>
    </Suspense>
  );
}
