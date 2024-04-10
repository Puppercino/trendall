require('dotenv').config();

const fs = require('fs');
const { MongoClient } = require('mongodb');

async function dumpDataToDB() {

    const data = fs.readFileSync('../text_extraction/records.json');
    const jsonData = JSON.parse(data);

    // Connect to MongoDB
    const client = new MongoClient(process.env.MONGO_URI);
    try {
        await client.connect();

        // Get a reference to the database
        const database = client.db('trendall_records');

        // Get a reference to the collection
        const collection = database.collection('records');

        // Insert the data into the collection
        const result = await collection.insertMany(jsonData);
        console.log(`${result.insertedCount} documents inserted`);

    } finally {
        // Close the connection
        await client.close();
    }
}

// Call the function to dump the data into MongoDB
dumpDataToDB().catch(console.error);
