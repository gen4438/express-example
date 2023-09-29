#!/usr/bin/env node
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoUsername = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoHost = process.env.MONGO_HOST;
const mongoPort = process.env.MONGO_PORT;

const url = `mongodb://${mongoUsername}:${mongoPassword}@${mongoHost}:${mongoPort}`;

async function main() {
  const client = new MongoClient(url);

  console.log("Connecting to MongoDB");
  await client.connect().catch((err) => {
    console.error(err);
    process.exit(1);
  });
  console.log("Connected correctly to server");

  const db = client.db("myproject");

  // drop database
  console.log("Dropping database");
  await db.dropDatabase().catch((err) => {
    console.error(err);
    process.exit(1);
  });

  // create collection
  console.log("Creating collection");
  await db.createCollection("users").catch((err) => {
    console.error(err);
    process.exit(1);
  });
  console.log("Collection created");

  // insert user
  console.log("Inserting user");
  await db
    .collection("users")
    .insertOne({
      name: "John",
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
  console.log("User inserted");

  client.close();
}

main();
