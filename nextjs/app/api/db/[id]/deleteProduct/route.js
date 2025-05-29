import db from "./../../../../lib/db";

export async function DELETE(req, {params}) {
    const { id } = params; // Extract the product ID from the URL
  
    try {
      const stmt = db.prepare('DELETE FROM products WHERE id = ?');
      const result = stmt.run(id);
  
      // Check if any rows were deleted (i.e., if the product exists)
      if (result.changes === 0) {
        return new Response(
          JSON.stringify({ error: 'Product not found' }),
          { status: 404 }
        );
      }
  
      return new Response(
        JSON.stringify({ message: 'Product deleted successfully' }),
        { status: 200 }
      );
    } catch (error) {
      console.error('Error deleting product:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to delete product' }),
        { status: 500 }
      );
    }
  }