//node app that onteracts with the mongo server
const MongoClient = require('mongodb').MongoClient;   //to connect to the server
const assert = require('assert');
const dbOperations = require('./operations');

//to start connection to the mongo server
const url= 'mongodb://localhost:27017/';
const dbname = 'conFusion';

//to access server
MongoClient.connect(url, { useUnifiedTopology: true }, (err,client) => {    //current Server Discovery and Monitoring engine is deprecated
  assert.strictEqual(err, null); // check that error = null
  console.log("connected correctly to the server");

  const db = client.db(dbname); //the db connection with node app

  dbOperations.insertDocument(
    db,
    { name: "Vadonut", description: "Test" },
    "dishes",
    (result) => {
      console.log("Insert Document:\n", result.ops);

      dbOperations.findDocuments(db, "dishes", (docs) => {
        console.log("Found Documents:\n", docs);

        dbOperations.updateDocument(
          db,
          { name: "Vadonut" },
          { description: "Updated Test" },
          "dishes",
          (result) => {
            console.log("Updated Document:\n", result.result);

            dbOperations.findDocuments(db, "dishes", (docs) => {
              console.log("Found Updated Documents:\n", docs);

              db.dropCollection("dishes", (result) => {
                console.log("Dropped Collection: ", result);
                client.close();
              });
            });
          }
        );
      });
    }
  );
});