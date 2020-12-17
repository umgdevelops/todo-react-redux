const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 6001;
const mongoose = require('mongoose');
const router = express.Router();
var Todo = require('./models/todo');
const todo = require('./models/todo');

app.use(bodyParser.json());
app.use(cors());
app.use('/todos',router);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true); 
mongoose.connect("mongodb://localhost/mern_todo");
mongoose.connection = mongoose.connection;
const connection = mongoose.connection;
connection.once('open', function(){
  console.log("MONGODB CONNECTED ...........");
})

router.route('/').get(function(req,res){
  console.log("request received to ROOT");
  Todo.find(function(err,todos){
    if(err){
      console.log("todos didn't fetched");
    }else{
      res.json(todos);
    }
  });
});

router.route('/:id').get(function(req,res){
  let receivedId = req.params.id;
  console.log("ID ROUTE REQ and id is ",receivedId);
  Todo.findById(receivedId, function(err,foundTodo){
    if(err){
      console.log("todos didn't fetched",err);
    }else{
      console.log(foundTodo);
      res.json(foundTodo);
    }
  });
});

router.route('/update/:id').post(function(req,res){
  Todo.findById(req.params.id, function(err,foundTodo){
    if(!foundTodo){
      res.status(404).send(`Data wasn't found`);
    }else{
      foundTodo.description = req.body.description;
      foundTodo.priority = req.body.priority;
      foundTodo.completed = req.body.completed;

      foundTodo.save().then( todo=>{
        res.json("Todo Updated!",todo)
      }).catch(err => {
        res.status(400).send("Update failed")
      })
    }
  });
});

router.delete('/:id', function(req,res){
  Todo.findByIdAndDelete(req.params.id, function(err,deletedTodo){
      if (err) {
          console.log(err)
      } else {
          console.log("deleted successfully :",deletedTodo)
      }
  })
})

router.route('/add').post(function(req,res){
  console.log("request received to ADD a todo");
  Todo.create(req.body,function(err,added){
    if(err){
      console.log("error in adding new todo",err);
    } 
    else{
      added.save()
      .then(todo=>{
        res.status(200).send("TODO ADDED SUCCESSFULLY!");
      }).catch(err=>{
        res.status(400).send("FAILED TO ADD TODO :(")
      });
      console.log("todo added successfully", added);
    }
  })
})

app.listen(PORT,function(){
  console.log(`TODO APP SERVER HAS STARTED PORT - ${PORT}`);
})