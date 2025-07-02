import { Input } from "@/components/form/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/form/select";
import { Button } from "@/components/ui/button";
import { MealModel } from "@/models/meal.model";
import { cn } from "@/utils/cn";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

type MealSelectControllerProps = {
  setValue: UseFormSetValue<{
    meals: { id: string; price: number; name: string; quantity: number }[];
  }>;
  register: UseFormRegister<{
    meals: {
      name: string;
      id: string;
      price: number;
      quantity: number;
    }[];
  }>;
  handleMealRemove: (index: number) => () => void;
  index: number;
  meals: MealModel[];
  className?: string;
};

export function MealSelectController({
  register,
  setValue,
  handleMealRemove,
  index,
  meals,
  className,
}: MealSelectControllerProps) {
  const handleChange = (index: number) => (value: string) => {
    setValue(`meals.${index}.name`, value);

    const id = meals.filter((meal) => meal.name === value)[0].id;
    const price = meals.filter((meal) => meal.name === value)[0].price;

    setValue(`meals.${index}.id`, id);
    setValue(`meals.${index}.price`, price);
  };

  return (
    <div className={cn("flex", className)}>
      <Select
        {...register(`meals.${index}.name`, { onChange: handleChange(index) })}
        onValueChange={handleChange(index)}
      >
        <SelectTrigger className="w-1/2">
          <SelectValue placeholder="Choose a meal" />
        </SelectTrigger>
        <SelectContent className={className}>
          <SelectGroup>
            <SelectLabel>Meals</SelectLabel>
            {meals.map((m) => (
              <SelectItem key={`${m.id}-${index}`} value={m.name}>
                <span>{m.name}</span>
                <span>${m.price}</span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input
        defaultValue={1}
        {...register(`meals.${index}.quantity`, {
          valueAsNumber: true,
        })}
        min={1}
        placeholder="Quantity"
        type="number"
        className="w-1/8 ml-5"
      />
      <Button
        type="button"
        variant="destructive"
        onClick={handleMealRemove(index)}
        className="ml-auto"
      >
        X
      </Button>
    </div>
  );
}
