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
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createOrderAction } from "./create-order.actions";
import {
  CreateOrderValue,
  isCreateOrderActionError,
} from "./create-order.types";
import { MealSelectController } from "./meal-select-controller";
import { useEffect } from "react";

type CreateOrderProps = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  meals: MealModel[];
};

const emptyMeal = { id: "", name: "", price: 0, quantity: 1 };

const schema = z.object({
  meals: z.array(
    z.object({
      price: z.number(),
      name: z.string().nonempty(),
      quantity: z.number().min(1),
    })
  ),
});

export function CreateOrder({ open, onOpenChange, meals }: CreateOrderProps) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onChange",
    shouldUnregister: true,
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "meals",
  });

  const onSubmit = async (values: CreateOrderValue) => {
    if (fields.length === 0) {
      toast.warning("Add a meal first to submit an order.");
      return;
    }

    const result = await createOrderAction(values.meals);

    if (isCreateOrderActionError(result)) {
      toast.error("Something went wrong when submitting your order...");
    } else {
      toast.success("Order has been submitted successfully.");
      remove();
      append(emptyMeal);
    }
  };

  const handleNewMeal = () => append(emptyMeal);

  const handleMealRemove = (index: number) => remove(index);

  useEffect(() => {
    append(emptyMeal);
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="flex flex-col gap-0">
          <DialogTitle className="text-md">Create an order</DialogTitle>
          <DialogDescription className="text-xs">
            Select a meal you want to add to your order
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-between">
            {fields.map((item, index) => (
              <MealSelectController
                form={form}
                key={item.id}
                handleMealRemove={handleMealRemove}
                meals={meals}
                index={index}
              />
            ))}
          </div>

          <Button
            type="button"
            variant="secondary"
            onClick={handleNewMeal}
            className="my-6"
            size="sm"
          >
            {fields.length === 0 ? "Add a meal" : "Add another meal"}
          </Button>

          <div className="flex items-center justify-end">
            <Button
              type="submit"
              variant="default"
              disabled={form.formState.isSubmitting}
            >
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
