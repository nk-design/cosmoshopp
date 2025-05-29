import fs from 'fs';
import path from 'path';

// Load the initial slider data from the JS file
let sliderData;

// Load the initial slider data from the JSON file
const loadSliderData = () => {
    const filePath = path.join(process.cwd(), 'db_slider.json'); // Adjust to your file path
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    sliderData = JSON.parse(fileContent).slider; // Extract the slider array
};

// Helper function to save sliderData to JSON file
const saveSliderData = () => {
    const filePath = path.join(process.cwd(), 'db_slider.json'); // Adjust to your file path
    const dataToSave = { slider: sliderData };
    fs.writeFileSync(filePath, JSON.stringify(dataToSave, null, 2)); // Save in the desired format
};

// Load initial data when the module is imported
loadSliderData();

export async function PUT(req) {
    const { id, newEl } = await req.json();

    // Update the slider data
    sliderData = sliderData.map((item) =>
        item.id === id ? { ...item, ...newEl } : item
    );

    // Save updated data to file
    saveSliderData();

    // Respond with the updated data
    return new Response(JSON.stringify(sliderData), { status: 200 });
}

export async function DELETE(req) {
    const { id } = await req.json();

    // Remove the slider item with the specified ID
    sliderData = sliderData.filter((item) => item.id !== id);

    // Save updated data to file
    saveSliderData();

    // Respond with the updated slider data
    return new Response(JSON.stringify(sliderData), { status: 200 });
}

export async function POST(req) {
    const newItem = await req.json();

    // Assign a new ID based on the existing data length
    newItem.id = sliderData.length ? Math.max(sliderData.map(item => item.id)) + 1 : 1;

    // Add the new item to the slider data
    sliderData.push(newItem);

    // Save updated data to file
    saveSliderData();

    // Respond with the updated slider data
    return new Response(JSON.stringify(sliderData), { status: 201 });
}