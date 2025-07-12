import { Decimal } from "@/generated/prisma/runtime/library";

export type MealModel = {
  id: string;
  name: string;
  price: number;
};

export type MealDbModel = {
  id: string;
  name: string;
  price: Decimal;
};
