//create a http server
const exp=require('express')
const app=exp(); //main express application

//connect to Database
   //get mongodb client
   const mongoClient = require('mongodb').MongoClient;
   //connect to database using mongo client
   mongoClient.connect('mongodb://localhost:27017') //port number of mongodb : 27017
   .then(client =>{
      //get db object on the client
      const dbObj = client.db('pvpsitdb');
      //get collection objects
      const usersCollection = dbObj.collection('users');
      const productsCollection = dbObj.collection('products');
      //share collection objects with APIs
      app.set('usersCollection',usersCollection);
      app.set('productsCollection',productsCollection);
      //print confirmation
      console.log("Database Connection Success");
   })
   .catch(err => console.log("Error in DB Connection",err)); 


//add body parser middleware
app.use(exp.json());

//import userApp and productApp
const userApp=require('./APIs/user-api');
const productApp=require('./APIs/product-api');

//if url starts with /user-api,then forward req to userApp
app.use('/user-api',userApp);
//if url starts with /product-api,then forward req to productApp
app.use('/product-api',productApp);


//assign port number
const port =4000
app.listen(port,()=>console.log(`Server is listening on ${port}`))


 //error handling middleware
 app.use((err,req,res,next)=>{
    res.send({message:"Error occured",payload:err.message})
})
    


