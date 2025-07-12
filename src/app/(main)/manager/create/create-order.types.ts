export type MealData = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export type CreateOrderValue = {
  meals: MealData[];
};
