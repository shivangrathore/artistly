import { Artist, Category } from "@/types";
import { faker } from "@faker-js/faker";
import { LOCATIONS } from "../locations";
import { CATEGORIES } from "../categories";
import fs from "fs/promises";

async function saveArtists(artists: Artist[]) {
  const f = await fs.open("data/artists.json", "w");
  try {
    await f.writeFile(JSON.stringify(artists, null, 2));
  } finally {
    await f.close();
  }
}

function randomLocation(): string {
  return LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
}

function randomCategory(): Category {
  return CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
}

function generateArtist(): Artist {
  const sex = faker.person.sexType();
  const firstName = faker.person.firstName(sex);
  const lastName = faker.person.lastName(sex);
  return {
    id: faker.string.uuid(),
    name: `${firstName} ${lastName}`,
    category: randomCategory(),
    image: faker.image.personPortrait({ sex, size: 512 }),
    location: randomLocation(),
    price: faker.number.int({ min: 500, max: 5000 }),
  };
}

export function seedArtists(n: number) {
  const artists = Array.from({ length: n }, () => generateArtist());
  saveArtists(artists);
}
