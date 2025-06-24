import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Artist } from "@/types";
import { MapPin } from "lucide-react";
import { ChartBarStacked } from "lucide-react";
import Link from "next/link";

const categoryColors: Record<string, string> = {
  singer: "bg-blue-700",
  dancer: "bg-red-700",
  musician: "bg-green-700",
  photographer: "bg-purple-700",
  painter: "bg-yellow-700",
  speaker: "bg-orange-700",
  comedian: "bg-teal-700",
  dj: "bg-pink-700",
};

export function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Card className="bg-neutral-950 hover:bg-black hover:shadow-lg cursor-pointer transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl line-clamp-1">{artist.name}</CardTitle>
        <CardDescription className="flex gap-2 items-center flex-wrap">
          {artist.categories.map((category) => (
            <span
              key={category}
              className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${categoryColors[category.toLowerCase()] || "bg-gray-700"} text-white`}
            >
              <ChartBarStacked className="size-4" />
              {category}
            </span>
          ))}
          <span className="px-2 py-0.5 rounded-full bg-neutral-700 text-white text-xs font-medium flex items-center gap-1">
            <MapPin className="size-4" />
            {artist.location}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <img
          className="w-full rounded-md aspect-square object-cover object-top"
          src={artist.image}
        />
        <div className="mt-4 text-gray-300 flex gap-2 items-center">
          <Link
            href={`/quote/${artist.id}`}
            className={buttonVariants({ className: "flex-grow" })}
          >
            Get a Quote /{" "}
            {artist.price.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
