// imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const Student = require('./models/Students');


//db connections
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/students')
mongoose.connection.on('connected', () => {
    console.log('Database is connected');
})
mongoose.connection.on('error', () => {
    console.log('error occured');
})

//middlewares
app.use(cors());
app.use(express.json());

//routes

//read
app.get('/', (req, res) => {
    Student.find()
    .exec()
    .then( result =>{
        console.log(result);
        res.status(200).send(result);
    }).catch(error =>{
        console.log(error);
        res.status(500).send(error);
    });
});

//create
app.post('/students/:id', (req, res) => {
    // console.log(req.body.firstName);
    // console.log(req.body.lastName);
    // console.log(req.body.place);
    console.log("req=>",req.body , req.params , req.query)
    const student = new Student({          //creating student object
        _id: new mongoose.Types.ObjectId,  //for uniquely identifying
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        place: req.body.place
    });
    student.save()        //save the data
    .then(result =>{                          
        console.log(result);
        res.status(201).json({ message: "Successfully Submitted" });
        }).catch( err => {
            console.log(err);
            res.status(500).json({ message: "Error Occured" });
        });   
});

//delete
app.delete('/students/delete/:id', (req,res)=>{
    const id = req.params.id; //getting id from parameters
    Student.remove({_id:id}, (error, result)=>{
        if(error){
            console.log(error);
            res.status(500).send(error);
        }else{
            console.log(result);
            res.status(200).json({message : "Successfully Deleted"});
        }
    });
});

//update
app.post('/students/update/:id', (req, res) => {
        console.log("jdtfyh",req.body);
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const place =  req.body.place;
        const id = req.params.id;
        Student.update({_id:id}, {$set:{firstName:firstName, lastName: lastName, place:place}})
        .then(result =>{
            console.log("result",result);
            res.status(200).json({message: "Successfully Updated"});
        }).catch(error =>{
            console.log("error",error);
            
            res.status(200).json({message: "Something went wrong"});
        });
    });

//server
app.listen(5000, () => {
    console.log('Server is listening to port 5000')
});