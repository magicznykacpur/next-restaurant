export const formatPrice = (price: number) => {
  if (price <= 0) {
    return "Order was free...";
  } else {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })
    return formatter.format(price)
  }
};
