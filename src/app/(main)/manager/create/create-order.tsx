import { useState } from "react";
import { z } from "zod";

import { Input } from "@/components/form/input";
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

const schema = z.object({});

export function CreateOrder({ open, onOpenChange, meals }: CreateOrderProps) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: CreateOrderValue) => {};

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

        <form>
          <div className="flex flex-col justify-between">
            {formMeals.length > 0 ? (
              formMeals.map((mealData, i) => (
                <div className="flex">
                  <MealSelectController
                    meals={meals}
                    control={form.control}
                    index={i}
                    className="w-1/2"
                  />
                  <Input
                    placeholder="Quantity"
                    type="number"
                    className="w-1/8 ml-5"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleMealRemove(i)}
                    className="ml-auto text-4xl"
                  >
                    X
                  </Button>
                </div>
              ))
            ) : (
              <div className="flex">
                <MealSelectController
                  meals={meals}
                  control={form.control}
                  index={0}
                  className="w-1/2"
                />
                <Input
                  placeholder="Quantity"
                  type="number"
                  className="w-1/4 ml-5"
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleMealRemove(0)}
                  className="ml-auto"
                >
                  X
                </Button>
              </div>
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
