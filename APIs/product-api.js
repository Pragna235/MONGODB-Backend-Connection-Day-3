//create mini express app user api
const exp=require('express');
const productApp=exp.Router();

//middleware
let productsCollection;
productApp.use((req,res,next)=>{
    productsCollection = req.app.get('productsCollection');
    next();
})


//create API(routes)
//each route consists a request handling mechanism  -CRUD Operations
//route to get users
productApp.get('/products',async(req,res)=>{
    //read all users from usersCollection
    let productsList = await productsCollection.find().toArray();
    //send res
    res.send({message:"All Products",payload:productsList});
   
})

//route to get individual user data
productApp.get('/products/:id',async(req,res)=>{
    //get id from url
    const index = Number(req.params.id);
    //find the user with the id
    let prod = await productsCollection.findOne({productId:index});
    //send res
    res.send(prod);
    
})

//route to create user
productApp.post('/product',async(req,res)=>{
    //get body from req
    let newProduct = req.body;
    //insert newUser in db
    await productsCollection.insertOne(newProduct);
    //send res
    res.send({message:"New Product Created"});
})

//route to update user
productApp.put('/product',async(req,res)=>{
    //get body from req
    let modifiedProduct = req.body;
    let newProduct = await productsCollection.findOneAndUpdate({productId:modifiedProduct.productId},
        {$set:{ ...modifiedProduct}},
        {returnDocument:"after"});
    //send res
    //console.log(newUser);
    res.send({message:"Product Details Updated",payload:newProduct});
})


//route to delete user method 2
productApp.delete('/product/:id',async(req,res)=>{
    //get userId from url
    let id = Number(req.params.id);
    //delete user from DB
    await productsCollection.deleteOne({productId:id});
    res.send({message:"Product Removed"});
    
})

module.exports = productApp;