import { OrderManager } from "@/app/(main)/manager/order-manager";
import { prisma } from "@/config/prisma.config";
import { MealDbModel } from "@/models/meal.model";
import { formatPrice } from "@/utils/format";
import { ToastContainer } from "react-toastify";

export async function MainPage() {
  const orders = await prisma.order.findMany({
    select: { id: true, createdAt: true, meals: true },
  });

  const dbMeals = await prisma.meal.findMany({
    select: { id: true, name: true, price: true },
    where: { order: { is: null } },
  });

  const mapToMealModels = (meals: MealDbModel[]) =>
    meals.map((m) => {
      return { ...m, price: m.price.toNumber() };
    });

  return (
    <div className="min-h-screen p-12">
      <header className="flex justify-between items-center mb-6">
        <h1 className="font-black text-xl">Orders</h1>
        <OrderManager meals={mapToMealModels(dbMeals)} />
      </header>

      <div className="flex flex-col gap-4">
        {orders.map((order, index) => {
          const total: number = order.meals.reduce(
            (prev, curr) => prev + curr.price.toNumber() * curr.quantity,
            0
          );

          return (
            <div key={index} className="border rounded-md p-6">
              <div className="flex flex-col">
                <span className="text-s">
                  id: <strong>{` ${order.id}`}</strong>
                </span>
                <span>
                  creation date:
                  <strong>
                    {` ${order.createdAt.toLocaleDateString()}`}
                    {` ${order.createdAt.toLocaleTimeString()}`}
                  </strong>
                </span>
              </div>

              <div className="mt-4">
                {order.meals.map((meal, index) => (
                  <div key={`meal-${index}`} className="grid grid-cols-3 w-3/5">
                    <span>
                      <strong>{meal.name}</strong>
                    </span>
                    <span className="text-emerald-700">
                      {formatPrice(meal.price.toNumber())}
                    </span>
                    <span className="text-">
                      servings: <strong>{meal.quantity}</strong>
                    </span>
                  </div>
                ))}

                <div className="w-full flex justify-end text-emerald-700">
                  <span>
                    <strong className="text-black mr-2">total:</strong>
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ToastContainer />
    </div>
  );
}
