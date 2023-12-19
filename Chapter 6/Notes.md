MongoDB Chapter 6 Notes

--MongoDB is NOSQL database which has JSON like(BSON data) data storage.

--MonogDB structure
1.hostname
2.databse
3.collection
4.document

--DATABASE CRUD Commands:
(eun only from inside a database)

CREATE COMMANDS
- db.<collectionName>.incsertOne(newDOcument)
- db.<collectionName>.insertMany(documentArray)

READ COMMANDS
- db.<collectionName>.find(filterObject) -- to read all docs
- db.<collectionName>..fineOne(filterObject) - to read one document
- db.<collectionName>.countDocumentts(filterObject) - show total numbers of doc

--filter Object : {fieldName: {operator:value}}
fieldName: database fields name
operator: $eq = equal, $gt = greater than, $lt = less than, $get = greater than equal, $and and $or operator valye : what value we are comparing with operator.

e.g {age : {$get:5}} - age is greater than value 5.

Cursor functions: these are applied to find() query.
- sort({fieldName:1}) : 1 for ascending, -1 for descending
- limit(x): only gives x documents.

UPDATE COMMANDS
- db.<collectionName>.updateOne(filterObject, updateObject, options)
- update Objects = {$set : {field:value}}
- options: {upsert: true}

Upsert: Update + Insert, when we want a new info to create a new objects if no existing object matches filter queries.

- db.<collectionName>.replaceOne(filterObject,updateObject)
Overwrites other fields also which are not in updateObject.

DELETE COMMANDS
- db.<collectionName>.deleteOne(filterObject)

PROJECTION
-only return selected field while returing result documents.
- db.<collectionName>.find(filterObject,prohjectionObject) e.g {name:1, age:1, id:0} - only show name and age and don't show id.