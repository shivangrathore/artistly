import { Artist } from "@/types";
import { LOCATIONS } from "./locations";
import { CATEGORIES } from "./categories";
import { LANGUAGES } from "./languages";

function loadArtists(): Artist[] {
  try {
    const artistsJson = require("./artists.json");
    let artists = JSON.parse(JSON.stringify(artistsJson));
    artists = artists.sort((a: Artist, b: Artist) => a.id.localeCompare(b.id));
    return artists as Artist[];
  } catch (error) {
    console.error("Error loading artists:", error);
    return [];
  }
}

const MIN_PRICE = 2000;
const MAX_PRICE = 8000;
export { LOCATIONS, CATEGORIES, MIN_PRICE, MAX_PRICE, LANGUAGES, loadArtists };
