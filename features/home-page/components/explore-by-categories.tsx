import SingerImage from "@/assets/categories/singer.png";
import DJImage from "@/assets/categories/dj.png";
import DancerImage from "@/assets/categories/dancer.png";
import SpeakerImage from "@/assets/categories/speaker.png";
import ComedianImage from "@/assets/categories/comedian.png";
import MagicianImage from "@/assets/categories/magician.png";
import PainterImage from "@/assets/categories/painter.png";
import PhotographerImage from "@/assets/categories/photographer.png";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Singer",
    description: "Explore talented singers for your next event.",
    image: SingerImage,
  },
  {
    name: "Dancer",
    description: "Discover skilled dancers to elevate your event.",
    image: DancerImage,
  },
  {
    name: "DJ",
    description: "Find the perfect DJ to set the mood for your party.",
    image: DJImage,
  },
  {
    name: "Speaker",
    description: "Engage with inspiring speakers for your conferences.",
    image: SpeakerImage,
  },
  {
    name: "Comedian",
    description: "Add humor to your events with talented comedians.",
    image: ComedianImage,
  },
  {
    name: "Magician",
    description: "Amaze your guests with skilled magicians.",
    image: MagicianImage,
  },
  {
    name: "Painter",
    description: "Hire artists to create live art at your events.",
    image: PainterImage,
  },
  {
    name: "Photographer",
    description: "Capture memories with professional photographers.",
    image: PhotographerImage,
  },
];

export function ExploreByCategories() {
  return (
    <div className="flex flex-col max-w-7xl mx-auto p-6 py-40 justify-center min-h-screen bg-neutral-900">
      <h1 className="text-4xl font-bold mb-2">Explore by Categories</h1>
      <p className="text-lg text-gray-600 mb-4">
        Discover artists across various categories to make your events special.
      </p>
      <div className="grid grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link
            href={`/explore?category=${category.name.toLowerCase()}`}
            key={category.name}
            className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-4 flex flex-col items-center"
          >
            <Image
              width={600}
              height={400}
              src={category.image}
              alt={category.name}
              className="size-64 mb-4 object-cover object-top grayscale-100 hover:grayscale-0 transition-all duration-300 rounded-lg transform hover:scale-105"
            />
            <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              {category.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
