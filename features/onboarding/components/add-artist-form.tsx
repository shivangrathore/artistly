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

export default function AddArtistForm() {
  const form = useForm({
    defaultValues: {
      artistName: "",
      categories: [],
      fee: 500,
      image: "",
      location: "",
    },
  });
  const onSubmit = (data: any) => {
    console.log("Form submitted with data:", data);
  };
  return (
    <Form {...form}>
      <form
        className="mt-8 max-w-xl flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="artistName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Artist Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g., Rock, Pop" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Languages</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g., Hindi, English" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fee</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Enter fee in USD"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="file"
                  accept="image/*"
                  placeholder="Upload profile image"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g., New York, USA" />
              </FormControl>
            </FormItem>
          )}
        />
        <Button>Submit</Button>
      </form>
    </Form>
  );
}
