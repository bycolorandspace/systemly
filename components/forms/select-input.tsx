import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ChevronDown } from "lucide-react";
import { FormInputProps } from "./form-input-interface";
import { useFormContext } from "react-hook-form";

export default function SelectInput({
  name,
  label,
  placeholder,
  description,
  data,
}: FormInputProps) {
  const { control } = useFormContext();
  const formatedData = data as [string, unknown][];
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="">
          <FormLabel>{label}</FormLabel>
          <Select
            defaultValue={
              formatedData.length > 0 ? String(formatedData[0][1]) : ""
            }
            value={field.value}
            onValueChange={(e) => {
              field.onChange(e);
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const flatKey = field.name.split(".").pop();
            }}
          >
            <FormControl>
              <SelectTrigger className="relative w-full text-primary  border border-border p-2 pl-3 rounded-md text-left h-[40px]">
                <SelectValue
                  className="text-secondary"
                  placeholder={placeholder}
                />
                <ChevronDown className="text-secondary absolute right-2 top-1/2 transform -translate-y-1/2" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-border text-primary focus:text-primary">
              {formatedData.map(([key, symbol]) => (
                <SelectItem key={key} value={String(symbol)}>
                  {String(key)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription className="text-secondary text-sm">
            {description}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
