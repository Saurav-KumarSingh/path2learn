// seed.js
import { Client, Databases, ID } from "appwrite";
import backendRoadmapData from "../data/roadMapData.js"; // your JSON

// 1️⃣ Initialize Appwrite client
const client = new Client()
  .setEndpoint('https://nyc.cloud.appwrite.io/v1') // e.g. https://cloud.appwrite.io/v1
  .setProject('68a7ff4d0001ef4636b1');               // your project ID

const databases = new Databases(client);

const DB_ID = '68a8007800041b9f49fa';                // database ID
const COLLECTION_ID = 'roadmap' // roadmap collection ID

// 2️⃣ Seeder function
async function seedRoadmap(roadmap) {
  try {
    const doc = await databases.createDocument(
      DB_ID,
      COLLECTION_ID,
      ID.unique(), // auto-generate document ID
      {
        title: roadmap.name,
        children: JSON.stringify(roadmap.children),
      }
    );
    console.log("Roadmap seeded:", doc);
  } catch (err) {
    console.error("Error seeding roadmap:", err);
  }
}

// 3️⃣ Run seeder
seedRoadmap(backendRoadmapData);
