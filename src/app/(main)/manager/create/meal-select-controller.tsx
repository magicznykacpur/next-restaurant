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
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { MealData } from "./create-order.types";
import { Label } from "@/components/ui/label";

type MealSelectControllerProps = {
  setValue: UseFormSetValue<{
    meals: MealData[];
  }>;
  register: UseFormRegister<{
    meals: MealData[];
  }>;
  handleMealRemove: (index: number) => () => void;
  errors: FieldErrors<{
    meals: MealData[];
  }>;
  clearErrors: UseFormClearErrors<{
    meals: {
      id: string;
      name: string;
      price: number;
      quantity: number;
    }[];
  }>;
  index: number;
  meals: MealModel[];
  className?: string;
};

export function MealSelectController({
  register,
  setValue,
  handleMealRemove,
  clearErrors,
  errors,
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

    clearErrors(`meals.${index}.name`);
  };

  const isNameError =
    errors.meals && errors.meals[index] && errors.meals[index].name;
  const isQuantityError =
    errors.meals && errors.meals[index] && errors.meals[index].quantity;

  return (
    <div className={cn("flex", className)}>
      <div className="w-1/2">
        <Select onValueChange={handleChange(index)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose a meal" />
          </SelectTrigger>
          <SelectContent>
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
        {isNameError && (
          <Label className="absolute text-xs text-rose-500">
            You must choose a meal.
          </Label>
        )}
      </div>
      <div className="w-1/8 ml-5">
        <Input
          defaultValue={1}
          {...register(`meals.${index}.quantity`, {
            valueAsNumber: true,
          })}
          type="number"
        />
        {isQuantityError && (
          <Label className="absolute text-xs text-rose-500">
            Quantity invalid.
          </Label>
        )}
      </div>
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
