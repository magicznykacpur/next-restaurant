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
      name: z
        .string()
        .nonempty({ message: "You need to select at least one meal." }),
      quantity: z
        .number({ message: "Quantity cannot be lower than 1." })
        .min(1),
    })
  ),
});

export function CreateOrder({ open, onOpenChange, meals }: CreateOrderProps) {
  const {
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
    register,
  } = useForm<z.infer<typeof schema>>({
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

        <form onSubmit={handleSubmit(onSubmit)} onChange={() => console.log(errors)}>
          <div className="flex flex-col justify-between">
            {formMeals.length > 0 ? (
              formMeals.map((_, index) => (
                <MealSelectController
                  register={register}
                  setValue={setValue}
                  handleMealRemove={handleMealRemove}
                  errors={errors}
                  clearErrors={clearErrors}
                  meals={meals}
                  index={index}
                />
              ))
            ) : (
              <MealSelectController
                register={register}
                setValue={setValue}
                handleMealRemove={handleMealRemove}
                errors={errors}
                clearErrors={clearErrors}
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
