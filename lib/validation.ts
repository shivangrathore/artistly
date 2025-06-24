import { CATEGORIES, LANGUAGES, LOCATIONS, MAX_PRICE, MIN_PRICE } from "@/data";
import { z } from "zod";

const isValidLanguage = (lang: string) =>
  LANGUAGES.some((l) => l.toLowerCase() === lang.toLowerCase());

const isValidCategory = (cat: string) =>
  CATEGORIES.some((c) => c.toLowerCase() === cat.toLowerCase());

const isValidLocation = (location: string) =>
  LOCATIONS.some((c) => c.toLowerCase() === location.toLowerCase());

export const CreateArtistSchema = z.object({
  name: z.string().min(1, "Name is required"),
  categories: z
    .array(
      z.object({
        value: z.string().min(1, "Category is required"),
      }),
    )
    .min(1, "At least one category is required")
    .refine((cats) => cats.every((cat) => isValidCategory(cat.value))),
  languages: z
    .array(
      z.object({
        value: z.string().min(1, "Language is required"),
      }),
    )
    .min(1, "At least one language is required")
    .refine((langs) => langs.every((lang) => isValidLanguage(lang.value))),
  image: z.string().url("Image must be a valid URL"),
  location: z.string().min(1, "Location is required").refine(isValidLocation),
  price: z.coerce
    .number()
    .min(MIN_PRICE, "Price must be a positive number")
    .max(MAX_PRICE, "Price must be less than 100000"),
});
