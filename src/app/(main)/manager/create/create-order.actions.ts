"use server";

import { prisma } from "@/config/prisma.config";
import { Decimal } from "@/generated/prisma/runtime/library";
import { CreateOrderActionResult, MealData } from "./create-order.types";
import { v4 as uuidv4 } from "uuid";

export async function createOrderAction(
  meals: MealData[]
): Promise<CreateOrderActionResult> {
  try {
    const orderId = uuidv4();
    const orderResult = await prisma.order.create({
      data: { id: orderId },
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

    const mealsResult = await prisma.meal.createMany({
      data: mealData,
    });
    
    return { orderId: orderResult.id, mealsCount: mealsResult.count };
  } catch (e) {
    return { error: "couldn't create order" };
  }
}
