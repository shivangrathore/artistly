import { Artist } from "@/types";
import { LOCATIONS } from "./locations";
import artistsJson from "./artists.json";
import { CATEGORIES } from "./categories";

const artists: Artist[] = (artistsJson as Artist[]).sort((a, b) =>
  a.id.localeCompare(b.id),
);

const MIN_PRICE = 2000;
const MAX_PRICE = 8000;
export { LOCATIONS, artists, CATEGORIES, MIN_PRICE, MAX_PRICE };
