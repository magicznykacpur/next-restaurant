import { v4 as uuidv4 } from "uuid";
import { prisma } from "../src/config/prisma.config";
import { Meal } from "../src/generated/prisma";
import { Decimal } from "../src/generated/prisma/runtime/library";

const meals: Meal[] = [
  {
    id: uuidv4(),
    name: "Salmon Nigiri",
    price: Decimal(24.99),
    orderId: null
  },
  {
    id: uuidv4(),
    name: "Tuna Roll",
    price: Decimal(21.99),
    orderId: null,
  },
  {
    id: uuidv4(),
    name: "Eel Avocado",
    price: Decimal(22.99),
    orderId: null,
  },
  {
    id: uuidv4(),
    name: "California Roll",
    price: Decimal(23.99),
    orderId: null,
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
