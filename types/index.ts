export type Artist = {
  id: string;
  name: string;
  category: string;
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
