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

export function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Card className="bg-neutral-950 hover:bg-black hover:shadow-lg cursor-pointer transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl">{artist.name}</CardTitle>
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
      </CardContent>
    </Card>
  );
}
