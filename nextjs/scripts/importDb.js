const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

// Step 1: Read the db_products.json file
fs.readFile('db_products.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  const products = JSON.parse(data).products;

  // Step 2: Connect to SQLite database
  const db = new sqlite3.Database('./products.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      console.error('Error opening database:', err);
      return;
    }
    console.log('Connected to the SQLite database.');
  });

  // Step 3: Create the products table (Ensure it runs before proceeding)
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      brand TEXT,
      price REAL NOT NULL,
      like BOOLEAN DEFAULT false,
      cart BOOLEAN DEFAULT false,
      category TEXT,
      discount INTEGER DEFAULT 0,
      quantity INTEGER DEFAULT 1,
      description TEXT,
      usage TEXT,
      image TEXT,
      color TEXT,
      more TEXT,
      ingredient TEXT,
      type TEXT
    );
  `, function(err) {
    if (err) {
      console.error('Error creating table:', err);
      db.close();  // Ensure database is closed in case of error
      return;
    }

    console.log('Table "products" created or already exists.');

    // Step 4: Insert products into the table (Remove `id` from insert to auto-generate)
    const stmt = db.prepare(`
      INSERT INTO products (
        title, brand, price, like, cart, category, discount, quantity, description,
        usage, image, color, more, ingredient, type
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    products.forEach(product => {
      // Ensure that required fields have values. Set defaults if necessary.
      const title = product.title || 'Untitled';
      const price = product.price || 0;
      const like = product.like || false;
      const cart = product.cart || false;
      const category = product.category || 'Uncategorized';
      const discount = product.discount || 0;
      const quantity = product.quantity || 1;
      const color = JSON.stringify(product.color) || '{}';
      const description = product.description ? product.description.join('/br') : '';
      const usage = product.usage ? product.usage.join('/br') : '';
      const image = product.image ? product.image.join('/br') : '';
      const more = product.more ? product.more.join('/br') : '';
      const ingredient = product.ingredient ? product.ingredient.join('/br') : '';
      const type = product.type || 'Unknown';

      // Insert the product data into the database (no `id` field)
      stmt.run(
        title,
        product.brand,
        price,
        like,
        cart,
        category,
        discount,
        quantity,
        description,
        usage,
        image,
        color,
        more,
        ingredient,
        type
      );
    });

    // Finalize and close the database connection
    stmt.finalize((err) => {
      if (err) {
        console.error('Error finalizing statement:', err);
      } else {
        console.log('Products inserted successfully.');
      }
      db.close((err) => {
        if (err) {
          console.error('Error closing database:', err);
        } else {
          console.log('Database connection closed.');
        }
      });
    });
  });
});
