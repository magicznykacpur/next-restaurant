import React from "react";

import { OrderManager } from "@/app/(main)/manager/order-manager";
import { prisma } from "@/config/prisma.config";

export async function MainPage() {
  // TODO: get orders from db

  // TODO: get meals from db
  const dbMeals = await prisma.meal.findMany({
    select: { id: true, name: true, price: true },
    where: { order: { is: null } },
  });
  const meals = dbMeals.map((m) => {
    return { ...m, price: m.price.toNumber() };
  });

  return (
    <div className="min-h-screen p-12">
      <header className="flex justify-between items-center mb-6">
        <h1 className="font-black text-xl">Orders</h1>
        <OrderManager meals={meals} />
      </header>

      <div className="flex flex-col gap-4">
        {[].map((order, index) => {
          // TODO: calculate total price with reduce

          return (
            <div key={index} className="border rounded-md p-6">
              {/* TODO: display id and creation date */}

              <div className="mt-4">
                {/* TODO: display meals */}

                <div className="w-full flex justify-end">
                  {/* TODO: display total price */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
