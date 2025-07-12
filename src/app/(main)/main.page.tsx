
import { OrderManager } from "@/app/(main)/manager/order-manager";
import { prisma } from "@/config/prisma.config";

export async function MainPage() {
  const orders = await prisma.order.findMany({
    select: { id: true, createdAt: true, meals: true },
  });

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
        {orders.map((order, index) => {
          // TODO: calculate total price with reduce
          const total: number = order.meals.reduce(
            (prev, curr) => prev + curr.price.toNumber(),
            0
          );

          return (
            <div key={index} className="border rounded-md p-6">
              {/* TODO: display id and creation date */}

              <div className="mt-4">
                {/* TODO: display meals */}

                <div className="w-full flex justify-end">
                  {total}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
