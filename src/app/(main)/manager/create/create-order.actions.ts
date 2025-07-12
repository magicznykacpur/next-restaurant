"use server";

import { prisma } from "@/config/prisma.config";
import { Decimal } from "@/generated/prisma/runtime/library";
import { MealData } from "./create-order.types";
import { v4 as uuidv4 } from "uuid";

export async function createOrderAction(meals: MealData[]) {
  const { id: orderId } = await prisma.order.create({
    data: { id: uuidv4() },
    select: { id: true },
  });

  const mealData: any[] = [];
  meals.forEach((meal) => {
    for (let i = 1; i <= meal.quantity; i++) {
      mealData.push({
        id: uuidv4(),
        name: meal.name,
        price: Decimal(meal.price),
        orderId,
      });
    }
  });

  const result = prisma.meal.createMany({
    data: mealData,
  });
}
