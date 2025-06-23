import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ArtistCardSkeleton() {
  return (
    <Card className="bg-black">
      <CardHeader>
        <Skeleton className="h-6 w-1/2 mb-2" />
        <div className="flex gap-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-64 w-full mb-2" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-6 w-1/3" />
        </div>
      </CardContent>
    </Card>
  );
}
