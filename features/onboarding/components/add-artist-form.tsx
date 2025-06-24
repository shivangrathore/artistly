"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateArtistSchema, CreateArtistSchemaType } from "@/lib/validation";
import { useFieldArray } from "react-hook-form";
import { CATEGORIES, LANGUAGES, LOCATIONS, MAX_PRICE, MIN_PRICE } from "@/data";
import { MultiSelect } from "@/components/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categoryOptions = CATEGORIES.map((category) => ({
  value: category.toLowerCase(),
  label: category,
}));

const languageOptions = LANGUAGES.map((language) => ({
  value: language.toLowerCase(),
  label: language,
}));

export default function AddArtistForm() {
  const form = useForm({
    resolver: zodResolver(CreateArtistSchema),
    defaultValues: {
      name: "",
      categories: [],
      languages: [],
      image: "",
      location: "",
      price: MIN_PRICE,
    },
  });
  const { fields: categories, replace: setCategories } = useFieldArray({
    name: "categories",
    control: form.control,
  });
  const { fields: languages, replace: setLanguages } = useFieldArray({
    name: "languages",
    control: form.control,
  });
  const onSubmit = async (data: CreateArtistSchemaType) => {
    await fetch("/api/artists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };
  const onError = (errors: any) => {
    console.error("Form submission errors:", errors);
  };
  return (
    <Form {...form}>
      <form
        className="mt-8 max-w-xl flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit, onError)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Artist Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              {fieldState.error && (
                <p className="text-destructive text-sm">
                  {fieldState.error.message}
                </p>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categories"
          render={({ fieldState }) => (
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <FormControl>
                <MultiSelect
                  className="bg-input/30 hover:bg-input/50"
                  options={categoryOptions}
                  onValueChange={(value) => {
                    const selectedCategories = value.map((val) => ({
                      value: val,
                    }));
                    setCategories(selectedCategories);
                  }}
                  defaultValue={[]}
                  value={categories.map((cat: { value: string }) => cat.value)}
                  placeholder="Select categories"
                  variant="inverted"
                  maxCount={categoryOptions.length}
                />
              </FormControl>
              {fieldState.error && (
                <p className="text-destructive text-sm">
                  {fieldState.error.message}
                </p>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="languages"
          render={({ fieldState }) => (
            <FormItem>
              <FormLabel>Languages</FormLabel>
              <FormControl>
                <MultiSelect
                  className="bg-input/30 hover:bg-input/50"
                  options={languageOptions}
                  onValueChange={(value) => {
                    const selectedLanguages = value.map((val) => ({
                      value: val,
                    }));
                    setLanguages(selectedLanguages);
                  }}
                  defaultValue={[]}
                  value={languages.map((lang: { value: string }) => lang.value)}
                  placeholder="Select languages"
                  variant="inverted"
                  maxCount={languageOptions.length}
                />
              </FormControl>
              {fieldState.error && (
                <p className="text-destructive text-sm">
                  {fieldState.error.message}
                </p>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Fee</FormLabel>
              <FormControl>
                <Input
                  min={MIN_PRICE}
                  max={MAX_PRICE}
                  {...field}
                  type="number"
                  placeholder="Enter fee in INR"
                />
              </FormControl>
              {fieldState.error && (
                <p className="text-destructive text-sm">
                  {fieldState.error.message}
                </p>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <Input {...field} type="text" placeholder="Image URL" />
              </FormControl>
              {fieldState.error && (
                <p className="text-destructive text-sm">
                  {fieldState.error.message}
                </p>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="e.g., Delhi, Bhopal" />
                  </SelectTrigger>
                  <SelectContent>
                    {LOCATIONS.map((loc) => (
                      <SelectItem key={loc} value={loc.toLowerCase()}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              {fieldState.error && (
                <p className="text-destructive text-sm">
                  {fieldState.error.message}
                </p>
              )}
            </FormItem>
          )}
        />
        <Button>Submit</Button>
      </form>
    </Form>
  );
}
