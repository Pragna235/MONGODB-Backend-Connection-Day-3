# MONGODB-Connection-Day-3

## Playbook

* Hierarchay --> Database -> Collection -> Document

## Inserting

* Open the `Mongosh` terminal
*     mongosh
*     show databases
*     use pvpsitdb
*     db.createCollection('users')
*     db.createCollection('products')
*     show dbs
*     show collections
*     db.users.insertOne({userId:100,username:'Pragna',age:20,marks:[90,70],address:{city:"Hyderabad"}})
* For inserting many documents, use `insertmany`

## Reading

*     db.users.findOne()
*     db.users.find()
*     db.users.findOne({username:{$eq:'Pragna'}})
*     db.users.find({age:{$lt:21}})
*     db.users.find({$and: [{'address.city':{$eq:"Hyderabad"}},{age:{$lt:30}}]})

## Updating

*     db.users.updateOne({userId:{$eq:100}},{$set:{age:27}})
*     db.users.updateOne({userId:{$eq:100}},{$addToSet:{marks:100}})
*     db.users.deleteOne({userId:100})
*     db.users.findOneAndUpdate({userId:{$eq:200}},{$set:{username:"Sneha Latha",age:30}},{returnDocument:"after"})

