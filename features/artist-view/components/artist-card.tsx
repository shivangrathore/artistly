import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Artist } from "@/types";
import { MapPin } from "lucide-react";
import { ChartBarStacked } from "lucide-react";
import Link from "next/link";

export function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Card className="bg-neutral-950 hover:bg-black hover:shadow-lg cursor-pointer transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl line-clamp-1">{artist.name}</CardTitle>
        <CardDescription className="flex gap-2 items-center">
          <span className="px-2 py-0.5 rounded-full bg-blue-700 text-white text-sm font-medium flex items-center gap-1">
            <ChartBarStacked className="size-4" />
            {artist.category}
          </span>

          <span className="px-2 py-0.5 rounded-full bg-red-700 text-white text-sm font-medium flex items-center gap-1">
            <MapPin className="size-4" />
            {artist.location}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <img className="w-full rounded-md" src={artist.image} />
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
