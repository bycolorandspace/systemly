import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { useFormContext } from "react-hook-form";
import { FormInputProps } from "./form-input-interface";

export default function TextInput({
  name,
  label,
  type,
  placeholder,
  description,
}: FormInputProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              className="input input-bordered border-border w-full"
              {...field}
              value={field.value ?? ""}
            />
          </FormControl>
          <FormDescription className="text-secondary text-sm">
            {description}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
