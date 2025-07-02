import { useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MealModel } from "@/models/meal.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateOrderValue, MealData } from "./create-order.types";
import { MealSelectController } from "./meal-select-controller";

type CreateOrderProps = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  meals: MealModel[];
};

const initialValues: CreateOrderValue = {
  meals: [],
};

const schema = z.object({
  meals: z.array(
    z.object({
      id: z.string(),
      price: z.number(),
      name: z.string({ message: "Name required." }),
      quantity: z
        .number({ message: "Quantity cannot be lower than 1." })
        .min(1),
    })
  ),
});

export function CreateOrder({ open, onOpenChange, meals }: CreateOrderProps) {
  const { control, handleSubmit, formState, setValue, getValues, register } =
    useForm<z.infer<typeof schema>>({
      resolver: zodResolver(schema),
    });

  const onSubmit = async (values: CreateOrderValue) => {
    console.log(values);
  };

  const [formMeals, setFormMeals] = useState<MealData[]>(initialValues.meals);
  const handleNewMeal = () => {
    // TODO: add new meal
  };

  const handleMealRemove = (index: number) => () => {
    // TODO: remove meal
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="flex flex-col gap-0">
          <DialogTitle className="text-md">Create an order</DialogTitle>
          <DialogDescription className="text-xs">
            Select a meal you want to add to your order
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          onChange={() => {
            console.log(formState.errors);
            console.log(getValues());
          }}
        >
          <div className="flex flex-col justify-between">
            {formMeals.length > 0 ? (
              formMeals.map((mealData, i) => (
                <MealSelectController
                  register={register}
                  setValue={setValue}
                  handleMealRemove={handleMealRemove}
                  meals={meals}
                  index={i}
                  className="w-1/2"
                />
              ))
            ) : (
              <MealSelectController
                register={register}
                setValue={setValue}
                handleMealRemove={handleMealRemove}
                meals={meals}
                index={0}
              />
            )}
          </div>

          <Button
            type="button"
            variant="secondary"
            onClick={handleNewMeal}
            className="my-6"
            size="sm"
          >
            Add another meal
          </Button>

          <div className="flex items-center justify-end">
            <Button type="submit" variant="default">
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
