import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

// Load the initial products data from the JS file
let productsData;

// Load the initial products data from the JSON file
const loadproductsData = () => {
    const filePath = path.join(process.cwd(), 'db_products.json'); // Adjust to your file path
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    productsData = JSON.parse(fileContent).products; // Extract the products array
};

// Helper function to save productsData to JSON file
const saveproductsData = () => {
    const filePath = path.join(process.cwd(), 'db_products.json'); // Adjust to your file path
    const dataToSave = { products: productsData };
    fs.writeFileSync(filePath, JSON.stringify(dataToSave, null, 2)); // Save in the desired format
};

// Load initial data when the module is imported
loadproductsData();

export async function GET() {
    // Load the current products data (to ensure the latest version is returned)
    loadproductsData();

    // Respond with the current products data
    return new Response(JSON.stringify(productsData), { status: 200 });
}

export async function PUT(req) {
    const { id, newEl } = await req.json();

    // Update the products data
    productsData = productsData.map((item) =>
        item.id === id ? { ...item, ...newEl } : item
    );

    // Save updated data to file
    saveproductsData();

    // Respond with the updated data
    return new Response(JSON.stringify(productsData), { status: 200 });
}

export async function DELETE(req) {
    const { id } = await req.json();

    // Remove the products item with the specified ID
    productsData = productsData.filter((item) => item.id !== id);

    // Save updated data to file
    saveproductsData();

    revalidatePath("/admin/products/");
    revalidatePath("/catalogue");
    // Respond with the updated products data
    return new Response(JSON.stringify(productsData), { status: 200 });
}

export async function POST(req) {
    const newItem = await req.json();

    const maxId = productsData.reduce((maxId, current) => {
      return current.id > maxId ? current.id : maxId;
    }, productsData[0].id); // Initialize with the first item's id

    // Assign a new ID based on the existing data length
    newItem.id = productsData.length ? maxId + 1 : 1;

    // Add the new item to the products data
    productsData.push(newItem);

    // Save updated data to file
    saveproductsData();

    revalidatePath("/admin/products/");
    revalidatePath("/catalogue");

    // Respond with the updated products data
    return new Response(JSON.stringify(productsData), { status: 201 });
}