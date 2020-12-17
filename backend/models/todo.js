var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
  description:{
    type: String
  },
  priority:{
    type:String
  },
  completed:{
    type:Boolean
  }
})

module.exports = mongoose.model("Todo",todoSchema)