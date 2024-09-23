export const user = async (req, res) => {
  // Removed extra space in the route
  const product = req.body; // Get product data from request body
  // Check for missing fields: corrected the condition to check for 'name' and 'price'
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }
  const newProduct = new Product(product); //

  try {
    await newProduct.save(); // Save the new product to the database
    res.status(201).json({ success: true, data: newProduct }); // Respond with success
  } catch (error) {
    console.error("Error in creating product:", error.message); // Log the error
    res.status(500).json({ success: false, message: "Server error" }); // Respond with server error
  }
};
