import db from './../../../lib/db';

// Handle POST request to create a new product
export async function POST(req) {
  try {
    const requestBody = await req.json();  // This should still work if it's the first time calling json()

    const { title, brand, price, like, cart, category, discount, quantity, description, usage, image, color, more, ingredient, type } = requestBody;


    // Prepare and execute the SQL statement to insert the new product
    const stmt = db.prepare(`
      INSERT INTO products (
        title, brand, price, like, cart, category, discount, quantity, description, usage, image, color, more, ingredient, type
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      title || '', brand || '', price || 0, like , cart , category, discount || 0, quantity || 1, 
      description || '', usage || '', image || '', color || '', 
      more || '', ingredient || '', type || ''
    );

    // Return a successful response with the new product ID
    return new Response(
      JSON.stringify({ id: result.lastInsertRowid }),
      { status: 201 }
    );
  } catch (error) {
    console.log("Error creating product:", error);
    // Return an error response if the insertion fails
    return new Response(
      JSON.stringify({ error: 'Failed to create product' }),
      { status: 500 }
    );
  }
}
