"use server";

import { prisma } from "@/config/prisma.config";
import { Meal } from "@/generated/prisma";
import { Decimal } from "@/generated/prisma/runtime/library";
import { revalidatePath } from "next/cache";
import {
  CreateOrderActionError,
  CreateOrderActionPayload,
  MealData,
} from "./create-order.types";

export async function createOrderAction(
  mealData: MealData[]
): Promise<CreateOrderActionPayload | CreateOrderActionError> {
  try {
    const { id: orderId } = await prisma.order.create({
      select: { id: true },
      data: {},
    });

    const meals: Omit<Meal, "id">[] = mealData.map((meal) => {
      return {
        name: meal.name,
        price: Decimal(meal.price),
        quantity: meal.quantity,
        orderId,
      };
    });

    const mealsResult = await prisma.meal.createMany({
      data: meals,
    });

    revalidatePath("/");

    return { orderId, mealsCount: mealsResult.count };
  } catch (e) {
    return { message: (e as Error).message };
  }
}
