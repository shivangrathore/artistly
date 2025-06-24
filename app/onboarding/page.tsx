import AddArtistForm from "@/features/onboarding/components/add-artist-form";

export default function OnboardingPage() {
  return (
    <div className="py-28 max-w-7xl mx-auto px-4 min-h-screen">
      <h2 className="text-3xl font-semibold">Artist Profile</h2>
      <AddArtistForm />
    </div>
  );
}
