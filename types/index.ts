export type Artist = {
  id: string;
  name: string;
  categories: string[];
  languages: string[];
  image: string;
  location: string;
  price: number;
};

export type Category =
  | "Dancer"
  | "Singer"
  | "Comedian"
  | "Painter"
  | "DJ"
  | "Speaker"
  | "Magician"
  | "Photographer";
