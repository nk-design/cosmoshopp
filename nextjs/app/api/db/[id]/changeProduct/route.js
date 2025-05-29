import db from "./../../../../lib/db";

// Handle PUT request to update a product by ID
export async function PUT(req, { params }) {
  const { id } = params; // Extract the product ID from the URL
  const {
    title, brand, price, like, cart, category, discount, quantity, 
    description, usage, image, color, more, ingredient, type
  } = await req.json();

  try {
    // Serialize arrays and objects to JSON strings (e.g., category, usage, color)
    const categoryStr = JSON.stringify(category);
    const descriptionStr = JSON.stringify(description);
    const usageStr = JSON.stringify(usage);
    const imageStr = JSON.stringify(image);
    const moreStr = JSON.stringify(more);
    const ingredientStr = JSON.stringify(ingredient);
    const colorStr = JSON.stringify(color);  // Serialize color object to string

    // Prepare the SQL statement for updating the product
    const stmt = db.prepare(`
      UPDATE products
      SET 
        title = ?, 
        brand = ?, 
        price = ?, 
        like = ?, 
        cart = ?, 
        category = ?, 
        discount = ?, 
        quantity = ?, 
        description = ?, 
        usage = ?, 
        image = ?, 
        color = ?, 
        more = ?, 
        ingredient = ?, 
        type = ?
      WHERE id = ?
    `);

    // Run the SQL query with the updated values
    const result = stmt.run(
      title, 
      brand, 
      price, 
      like, 
      cart, 
      categoryStr,    // Store category as a JSON string
      discount, 
      quantity, 
      descriptionStr, // Store description as a JSON string
      usageStr,       // Store usage as a JSON string
      imageStr,       // Store image as a JSON string
      colorStr,       // Store color as a JSON string
      moreStr,        // Store more as a JSON string
      ingredientStr,  // Store ingredient as a JSON string
      type, 
      id
    );

    // Check if any rows were affected (i.e., if the product exists)
    if (result.changes === 0) {
      return new Response(
        JSON.stringify({ error: 'Product not found' }),
        { status: 404 }
      );
    }

    // Return a success response
    return new Response(
      JSON.stringify({ message: 'Product updated successfully' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating product:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to update product' }),
      { status: 500 }
    );
  }
}
