"use client";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateArtistSchema,
  type CreateArtistSchemaType,
} from "@/lib/validation";
import { CATEGORIES, LANGUAGES, LOCATIONS, MAX_PRICE, MIN_PRICE } from "@/data";
import { FormFieldWrapper } from "./form-field-wrapper";
import { MultiSelectField } from "./multi-select-field";

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
      image: "",
      location: "",
      categories: [],
      languages: [],
      price: MIN_PRICE,
    },
  });

  const onSubmit = async (data: CreateArtistSchemaType) => {
    await fetch("/api/artists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    form.reset(undefined, {
      keepDefaultValues: true,
      keepErrors: false,
      keepDirty: false,
    });
  };

  return (
    <Form {...form}>
      <form
        className="mt-8 max-w-xl flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormFieldWrapper
              label="Artist Name"
              error={fieldState.error?.message}
            >
              <Input {...field} />
            </FormFieldWrapper>
          )}
        />

        <FormField
          control={form.control}
          name="categories"
          render={({ field, fieldState }) => (
            <MultiSelectField
              label="Categories"
              options={categoryOptions}
              value={field.value}
              onChange={field.onChange}
              placeholder="Select categories"
              error={fieldState.error?.message}
            />
          )}
        />

        <FormField
          control={form.control}
          name="languages"
          render={({ field, fieldState }) => (
            <MultiSelectField
              label="Languages"
              options={languageOptions}
              value={field.value}
              onChange={field.onChange}
              placeholder="Select languages"
              error={fieldState.error?.message}
            />
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field, fieldState }) => (
            <FormFieldWrapper label="Fee" error={fieldState.error?.message}>
              <Input
                min={MIN_PRICE}
                max={MAX_PRICE}
                {...field}
                type="number"
                placeholder="Enter fee in INR"
              />
            </FormFieldWrapper>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field, fieldState }) => (
            <FormFieldWrapper
              label="Profile Image"
              error={fieldState.error?.message}
            >
              <Input {...field} type="text" placeholder="Image URL" />
            </FormFieldWrapper>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field, fieldState }) => (
            <FormFieldWrapper
              label="Location"
              error={fieldState.error?.message}
            >
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
            </FormFieldWrapper>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
