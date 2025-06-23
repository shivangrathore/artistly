import { artists } from "@/data";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const GetArtistsSchema = z.object({
  limit: z.number().min(1).max(100).default(10).optional(),
  offset: z.number().min(0).default(0).optional(),
  categories: z.array(z.string()).default([]).optional(),
  locations: z.array(z.string()).optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
});

function parseArtistSchema(searchParams: URLSearchParams) {
  return GetArtistsSchema.safeParse({
    limit: searchParams.get("limit") || undefined,
    offset: searchParams.get("offset") || undefined,
    categories: searchParams.getAll("category"),
    locations: searchParams.getAll("location"),
    minPrice: searchParams.get("minPrice") || undefined,
    maxPrice: searchParams.get("maxPrice") || undefined,
  });
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
  if (query.categories && query.categories.length > 0) {
    data = data.filter((artist) => query.categories!.includes(artist.category));
  }
  if (query.locations && query.locations.length > 0) {
    data = data.filter((artist) => query.locations!.includes(artist.location));
  }
  if (query.minPrice !== undefined) {
    data = data.filter((artist) => artist.price >= query.minPrice!);
  }
  if (query.maxPrice !== undefined) {
    data = data.filter((artist) => artist.price <= query.maxPrice!);
  }
  data = data.slice(offset, limit);
  return NextResponse.json(data);
}
