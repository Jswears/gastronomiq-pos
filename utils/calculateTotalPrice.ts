const calculateTotalPrice = (price: number, quantity: number): number => {
  if (quantity <= 0 || price < 0) {
    throw new Error("Invalid price or quantity.");
  }
  return parseFloat((price * quantity).toFixed(2));
};

export { calculateTotalPrice };
