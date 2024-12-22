const mongoose = require('mongoose');

async function connect(url) {
    try {
        // Connect to MongoDB using async/await
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        // Access the database and collection
        const foodItems = mongoose.connection.db.collection("food_items");
        const foodCategory = mongoose.connection.db.collection("food-category");
        // Fetch and assign data from the collection to global.data
        global.data = await foodItems.find({}).toArray();
        global.category= await foodCategory.find({}).toArray();

        console.log("Food Items loaded into global data");
    } catch (err) {
        console.error("Connection failed:", err);
    }
}

module.exports = connect;

