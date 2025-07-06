import { prisma } from "../src/config/prisma.config";
import { Meal } from "../src/generated/prisma";
import { Decimal } from "../src/generated/prisma/runtime/library";

const meals: Omit<Meal, "id">[] = [
  {
    name: "Salmon Nigiri",
    price: Decimal(24.99),
    orderId: null,
    quantity: 0,
  },
  {
    name: "Tuna Roll",
    price: Decimal(21.99),
    orderId: null,
    quantity: 0,
  },
  {
    name: "Eel Avocado",
    price: Decimal(22.99),
    orderId: null,
    quantity: 0,
  },
  {
    name: "California Roll",
    price: Decimal(23.99),
    orderId: null,
    quantity: 0,
  },
];

async function main() {
  await prisma.meal.createMany({
    data: meals,
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
