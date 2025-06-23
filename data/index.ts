import { Artist } from "@/types";
import { LOCATIONS } from "./locations";
import artistsJson from "./artists.json";

const artists: Artist[] = (artistsJson as Artist[]).sort((a, b) =>
  a.id.localeCompare(b.id),
);
export { LOCATIONS, artists };
