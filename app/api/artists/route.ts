import { artists } from "@/data";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

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
    data = data.filter(
      (artist) =>
        query.category?.toLowerCase() == artist.category.toLowerCase(),
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
  data = data.slice(offset, limit);
  return NextResponse.json(data);
}
