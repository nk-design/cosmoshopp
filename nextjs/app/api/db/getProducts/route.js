import db from './../../../lib/db';

// Handle GET request to fetch all products
export async function GET() {
    try {
        const stmt = db.prepare('SELECT * FROM products');
        const products = stmt.all();

        // Return products as a response with status 200
        return new Response(JSON.stringify({ products }), {
            status: 200,
            headers: {
                'Cache-Control': 'no-store', // Prevent caching of the response
            },
        });
    } catch (error) {
        console.log("Error fetching products:", error);
        // Return an error message with status 500
        return new Response(JSON.stringify({ error: 'Failed to fetch products' }), { status: 500 });
    }
}