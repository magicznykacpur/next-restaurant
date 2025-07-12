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
import { Label } from "@/components/ui/label";
import { MealModel } from "@/models/meal.model";
import { cn } from "@/utils/cn";
import { UseFormReturn } from "react-hook-form";
import { MealData } from "./create-order.types";

type MealSelectControllerProps = {
  form: UseFormReturn<{ meals: MealData[] }, any, { meals: MealData[] }>;
  handleMealRemove: (index: number) => void;
  index: number;
  meals: MealModel[];
  className?: string;
};

export function MealSelectController({
  form,
  handleMealRemove,
  index,
  meals,
  className,
}: MealSelectControllerProps) {
  const {
    setValue,
    clearErrors,
    register,
    formState: { errors },
  } = form;

  const handleChange = (value: string) => {
    const id = meals.filter((meal) => meal.name === value)[0].id;
    const price = meals.filter((meal) => meal.name === value)[0].price;

    setValue(`meals.${index}.name`, value);
    setValue(`meals.${index}.id`, id);
    setValue(`meals.${index}.price`, price);

    clearErrors(`meals.${index}`);
  };

  const isNameError =
    errors.meals && errors.meals[index] && errors.meals[index].name;
  const isQuantityError =
    errors.meals && errors.meals[index] && errors.meals[index].quantity;

  return (
    <div className={cn("flex my-2.5", className)}>
      <div className="w-1/2">
        <Select onValueChange={(value) => handleChange(value)}>
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
          min={1}
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
        onClick={() => handleMealRemove(index)}
        className="ml-auto"
      >
        X
      </Button>
    </div>
  );
}
