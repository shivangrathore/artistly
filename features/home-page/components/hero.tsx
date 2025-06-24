import SingerImage from "@/assets/singer.png";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="flex flex-col justify-center min-h-screen h-screen text-white relative overflow-hidden shadow-md bg-black">
      <div className="max-w-7xl mx-auto w-full relative overflow-hidden h-full flex items-center px-6 isolate">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-4">
            Artists That Make Your Events Unforgettable
          </h1>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mb-8">
            Artistly connects event planners with verified singers, dancers,
            DJs, and speakers across India. Fast. Reliable. Impactful.
          </p>
          <Link
            href="/explore"
            className="bg-primary text-primary-foreground px-8 py-4 text-sm sm:text-base rounded-full hover:bg-gray-200 transition-colors"
          >
            Explore Artists
          </Link>
          <p className="text-sm text-gray-500 mt-6">
            * Terms and conditions applied
          </p>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-0 h-[900px] w-[400px] -z-10">
          <Image
            src={SingerImage}
            className="-scale-x-100 object-contain absolute top-0 w-[400px] -z-10 max-lg:opacity-40 transition-opacity duration-1000 -right-14 md:right-0"
            alt="Artist"
          />
        </div>
      </div>
    </div>
  );
}
