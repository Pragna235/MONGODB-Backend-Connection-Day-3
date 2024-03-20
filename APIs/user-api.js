//create mini express app user api
const exp=require('express');
const userApp=exp.Router();

//middleware
let usersCollection;
userApp.use((req,res,next)=>{
    usersCollection = req.app.get('usersCollection');
    next();
})

//create API(routes)
//each route consists a request handling mechanism  -CRUD Operations
//route to get users
userApp.get('/users',async(req,res)=>{
    //read all users from usersCollection
    let usersList = await usersCollection.find().toArray();
    //send res
    res.send({message:"All Users",payload:usersList});
    
})

//route to get individual user data
userApp.get('/users/:id',async (req,res)=>{
    //get id from url
    const id = Number(req.params.id);
    //read all users from usersCollection
    let usersList = await usersCollection.find().toArray();
    //find the user with the id
    let user = await usersCollection.findOne({userId:id});
    //send res
    let index = usersList.findIndex(user => user.userId === id);
    console.log("index = ",index);
    if(index == -1){
        res.send({message:"User with id not found"});
    }
    else{
        res.send(usersList[index]);
    }
    
    
    
})

//route to create user
userApp.post('/user',async(req,res)=>{
    //get body from req
    let newUser = req.body;
    //insert newUser in db
    await usersCollection.insertOne(newUser);
    //send res
    res.send({message:"New User Created"});

});

//route to update user
userApp.put('/user',async(req,res)=>{
    //get body from req
    let modifiedUser = req.body;
    let newUser = await usersCollection.findOneAndUpdate({userId:modifiedUser.userId},
        {$set:{ ...modifiedUser}},
        {returnDocument:"after"});
    //send res
    console.log(newUser);
    res.send({message:"User Details Updated",payload:newUser});


    
});



//route to delete user method 2
userApp.delete('/user/:id',async(req,res)=>{
    //get userId from url
    let id = Number(req.params.id);
    //get usersCollection obj
    const usersCollection = req.app.get('usersCollection');
    //delete user from DB
    await usersCollection.deleteOne({userId:id});
    res.send({message:"User Removed"});
    
});

module.exports = userApp;
