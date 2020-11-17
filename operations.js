const assert = require('assert');

exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.insertOne(document, (err, result) => {
        assert.strictEqual(err, null);
        console.log("Inserted " + result.result.n + " documents into the collection " + collection);
        callback(result);
    });
};

exports.findDocuments = (db, collection, callback) => {  //search the collection and find all the docs
    const coll = db.collection(collection);
    coll.find({}).toArray((err, docs) => {
        assert.strictEqual(err, null);
        callback(docs);
    });
};

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, result) => {
        assert.strictEqual(err, null);
        console.log("Removed the document ", document);
        callback(result);
    });
};

exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    coll.updateOne(document, { $set: update }, null, (err, result) => {
        assert.strictEqual(err, null);
        console.log("Updated the document with ", update);
        callback(result);
    });
};

//insertDocument, findDocuments, removeDocument, updateDocument are functions we create  and its we that can fix nb of params
/* 

 { $set: update }: indicates which field should be updated
  
 
 ******* params interpretaion *******

   *document  : the document i want to insert, remove , update
   *collection : the collection in which i want make operations
   * callback : function : will be called back once the op is finished
   * update : the update 
*/