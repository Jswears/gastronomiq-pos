const calculateTotalPrice = (
  price: string | number,
  quantity: number
): number => {
  // Ensure quantity is valid
  if (quantity <= 0) {
    throw new Error("Quantity must be greater than zero.");
  }

  // Parse the price if it's a string
  let numericPrice: number;
  if (typeof price === "string") {
    // Remove non-numeric characters (like $ or spaces)
    numericPrice = parseFloat(price.replace(/[^0-9.]/g, ""));
    if (isNaN(numericPrice)) {
      throw new Error("Invalid price format.");
    }
  } else if (typeof price === "number") {
    numericPrice = price;
  } else {
    throw new Error("Price must be a string or a number.");
  }

  // Calculate the total
  const total = numericPrice * quantity;

  // Return the total rounded to 2 decimal places
  return parseFloat(total.toFixed(2));
};

const calculateTotalCheckPrice = () => {};

export { calculateTotalPrice };
