import { Artist } from "@/types";
import { faker } from "@faker-js/faker";
import { LOCATIONS } from "../locations";
import { CATEGORIES } from "../categories";
import { LANGUAGES } from "../languages";
import fs from "fs/promises";
import { MAX_PRICE, MIN_PRICE } from "..";

async function saveArtists(artists: Artist[]) {
  const data = JSON.stringify(artists, null, 2);
  await fs.writeFile("data/artists.json", data);
}

function generateArtist(): Artist {
  const sex = faker.person.sexType();
  const firstName = faker.person.firstName(sex);
  const lastName = faker.person.lastName(sex);
  const categories = faker.helpers.arrayElements(CATEGORIES, {
    min: 1,
    max: 2,
  });
  const languages = faker.helpers.arrayElements(LANGUAGES, { min: 1, max: 3 });
  return {
    id: faker.string.uuid(),
    name: `${firstName} ${lastName}`,
    categories,
    languages,
    image: faker.image.personPortrait({ sex, size: 512 }),
    location: faker.helpers.arrayElement(LOCATIONS),
    price: faker.number.int({ min: MIN_PRICE, max: MAX_PRICE }),
  };
}

export function seedArtists(n: number) {
  const artists = Array.from({ length: n }, () => generateArtist());
  saveArtists(artists);
}
