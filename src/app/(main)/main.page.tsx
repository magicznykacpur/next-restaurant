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

  const getFormattedMeals = (meals: MealDbModel[]) => {
    const formattedMeals: {
      [key: string]: { price: number; quantity: number };
    } = {};

    meals.reduce((prev, curr) => {
      prev[curr.name] = {
        price: curr.price.toNumber(),
        quantity: prev[curr.name] ? prev[curr.name].quantity + 1 : 1,
      };

      return prev;
    }, formattedMeals);

    return formattedMeals;
  };

  return (
    <div className="min-h-screen p-12">
      <header className="flex justify-between items-center mb-6">
        <h1 className="font-black text-xl">Orders</h1>
        <OrderManager meals={mapToMealModels(dbMeals)} />
      </header>

      <div className="flex flex-col gap-4">
        {orders.map((order, index) => {
          const total: number = order.meals.reduce(
            (prev, curr) => prev + curr.price.toNumber(),
            0
          );

          return (
            <div key={index} className="border rounded-md p-6">
              <div className="flex flex-col">
                <strong>{`id: ${order.id.slice(0, 8)}`}</strong>
                <strong>{`creation date: ${order.createdAt.toLocaleDateString()} ${order.createdAt.toLocaleTimeString()}`}</strong>
              </div>

              <div className="mt-4">
                {Object.entries(getFormattedMeals(order.meals)).map((entry, index) => (
                  <div key={`meal-${index}`} className="grid grid-cols-3 w-3/5">
                    <span>
                      <strong>{entry[0]}</strong>{" "}
                    </span>
                    <span className="text-emerald-700">
                      {formatPrice(entry[1].price)}
                    </span>
                    <span className="text-">
                      servings: <strong>{entry[1].quantity}</strong>
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
