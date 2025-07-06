"use server";

import { prisma } from "@/config/prisma.config";
import { Meal } from "@/generated/prisma";
import { Decimal } from "@/generated/prisma/runtime/library";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";
import {
  CreateOrderActionError,
  CreateOrderActionPayload,
  MealData,
} from "./create-order.types";

export async function createOrderAction(
  mealData: MealData[]
): Promise<CreateOrderActionPayload | CreateOrderActionError> {
  try {
    const orderId = uuidv4();
    const orderResult = await prisma.order.create({
      data: { id: orderId },
      select: { id: true },
    });

    const meals: Meal[] = [];
    mealData.forEach((meal) => {
      meals.push({
        id: uuidv4(),
        name: meal.name,
        price: Decimal(meal.price),
        quantity: meal.quantity,
        orderId,
      });
    });

    const mealsResult = await prisma.meal.createMany({
      data: meals,
    });

    revalidatePath("/");

    return { orderId: orderResult.id, mealsCount: mealsResult.count };
  } catch (e) {
    return { message: "couldn't create order" };
  }
}
