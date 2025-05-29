// app/api/products/[id]/route.js
import db from "./../../../../lib/db";

// Handle GET request to retrieve a product by ID
export async function GET(req, { params }) {
  const { id } = params; // Extract the product ID from the URL

  try {
    const stmt = db.prepare('SELECT * FROM products WHERE id = ?');
    const product = stmt.get(id); // Fetch the product by ID

    // If no product is found, return a 404 error
    if (!product) {
      return new Response(
        JSON.stringify({ error: 'Product not found' }),
        { status: 404 }
      );
    }

    // Return the product data as a JSON response
    return new Response(JSON.stringify({ product }), { status: 200 });
  } catch (error) {
    console.error('Error retrieving product:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to retrieve product' }),
      { status: 500 }
    );
  }
}
