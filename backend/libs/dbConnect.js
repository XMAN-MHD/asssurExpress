// import packages
import { MongoClient, ServerApiVersion } from "mongodb";

// access environment variables for the database connection
const { MONGODB_URI, MONGODB_DATABASE } = process.env;

// get a client access
const client = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
    // Connect the client to the server
    await client.connect();
    
    // Send a ping to confirm a successful connection
    await client.db().command({ ping: 1 });
    
    //send a message to confirm a successful connection
    console.log("Connected to MongoDB!");

} catch (err) {
  console.error(err);
}

// select the DB to use then export it to the server
export const db = client.db(MONGODB_DATABASE);