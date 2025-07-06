export type MealData = {
  name: string;
  price: number;
  quantity: number;
};

export type CreateOrderValue = {
  meals: MealData[];
};

export type CreateOrderActionPayload = {
  orderId: string;
  mealsCount: number;
};

export type CreateOrderActionError = {
  message: string;
};

export function isCreateOrderActionPayload(
  payload: CreateOrderActionPayload | CreateOrderActionError
): payload is CreateOrderActionPayload {
  return (
    (payload as CreateOrderActionPayload).orderId !== undefined &&
    (payload as CreateOrderActionPayload).mealsCount !== undefined
  );
}

export function isCreateOrderActionError(
  error: CreateOrderActionPayload | CreateOrderActionError
): error is CreateOrderActionError {
  return (error as CreateOrderActionError).message !== undefined;
}
