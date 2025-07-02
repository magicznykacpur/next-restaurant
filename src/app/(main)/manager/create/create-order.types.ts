export type MealData = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export type CreateOrderValue = {
  meals: MealData[];
};

export type CreateOrderActionResult = {
  orderId?: string,
  mealsCount?: number,
  error?: string
}