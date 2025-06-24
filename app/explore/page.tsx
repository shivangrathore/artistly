import { ArtistView } from "@/features/artist-view/components";

export default function ExplorePage() {
  return (
    <div className="py-28 max-w-7xl mx-auto px-4 min-h-screen">
      <div>
        <h2 className="text-3xl font-medium">Explore</h2>
        <p className="text-gray-500 mt-4 mb-8">
          Explore the latest features and updates in our platform. Stay tuned
          for more exciting content!
        </p>
        <ArtistView />
      </div>
    </div>
  );
}
