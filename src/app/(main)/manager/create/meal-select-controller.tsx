import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/form/select";
import { MealModel } from "@/models/meal.model";
import { Control, Controller } from "react-hook-form";

type MealSelectControllerProps = {
  control: Control;
  index: number;
  meals: MealModel[];
  className?: string;
};

export function MealSelectController({
  control,
  index,
  meals,
  className,
}: MealSelectControllerProps) {
  return (
    <Controller
      control={control}
      name={`meal-${index}`}
      render={({ field }) => (
        <Select onValueChange={field.onChange}>
          <SelectTrigger className="w-1/2">
            <SelectValue placeholder="Choose a meal" />
          </SelectTrigger>
          <SelectContent className={className}>
            <SelectGroup>
              <SelectLabel>Meals</SelectLabel>
              {meals.map((m) => (
                <SelectItem key={m.id} value={m.name}>
                  <span>{m.name}</span>
                  <span>${m.price}</span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  );
}
