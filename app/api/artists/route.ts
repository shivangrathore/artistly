import { CATEGORIES, LANGUAGES, loadArtists, LOCATIONS } from "@/data";
import { CreateArtistSchema } from "@/lib/validation";
import { Artist } from "@/types";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const artists: Artist[] = loadArtists();

const GetArtistsSchema = z.object({
  limit: z.coerce.number().min(1).max(100).default(10).optional(),
  offset: z.coerce.number().min(0).default(0).optional(),
  category: z.string().optional(),
  location: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
});

function parseArtistSchema(searchParams: URLSearchParams) {
  const p = Object.fromEntries(searchParams.entries());
  return GetArtistsSchema.safeParse(p);
}

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams;
  const parsed = parseArtistSchema(search);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid query parameters", message: parsed.error.message },
      { status: 400 },
    );
  }
  const query = parsed.data;
  const limit = query.limit ?? 10;
  const offset = query.offset ?? 0;
  let data = [...artists];
  if (query.category && query.category.length > 0) {
    data = data.filter((artist) =>
      artist.categories.some(
        (cat) => cat.toLowerCase() == query.category?.toLowerCase(),
      ),
    );
  }
  if (query.location && query.location.length > 0) {
    data = data.filter(
      (artist) =>
        query.location?.toLowerCase() == artist.location.toLowerCase(),
    );
  }
  if (query.minPrice !== undefined) {
    data = data.filter((artist) => artist.price >= query.minPrice!);
  }
  if (query.maxPrice !== undefined) {
    data = data.filter((artist) => artist.price <= query.maxPrice!);
  }
  data = data.slice(offset);
  const hasNextPage = data.length > limit;
  data = data.slice(0, limit);
  return NextResponse.json({ data, hasNextPage });
}

function transformLanguage(lang: string): string {
  return (
    LANGUAGES.filter((l) => l.toLowerCase() === lang.toLowerCase())[0] || lang
  );
}

function transformCategory(cat: string): string {
  return (
    CATEGORIES.filter((c) => c.toLowerCase() === cat.toLowerCase())[0] || cat
  );
}

function transformLocation(loc: string): string {
  return (
    LOCATIONS.filter((l) => l.toLowerCase() === loc.toLowerCase())[0] || loc
  );
}

export async function POST(req: NextRequest) {
  const json = await req.json();
  const parsed = CreateArtistSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request body", message: parsed.error.message },
      { status: 400 },
    );
  }
  const data = parsed.data;
  const newArtist: Artist = {
    id: randomUUID().toString(),
    name: data.name,
    price: data.price,
    categories: data.categories.map((cat) => transformCategory(cat.value)),
    languages: data.languages.map((lang) => transformLanguage(lang.value)),
    location: transformLocation(data.location),
    image: data.image,
  };
  artists.push(newArtist);
  return NextResponse.json({ message: "Artist added" }, { status: 201 });
}
