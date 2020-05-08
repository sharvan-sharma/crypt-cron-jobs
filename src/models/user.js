const mongoose =require('mongoose');

const appSchema = mongoose.Schema({
    appdocID:{type:String}
})

const clientSchema = mongoose.Schema({
    client_id:{type:String},
    projectname:{type:String}
})

const userSchema = mongoose.Schema({
  username:{type:String,unique:true},//tester1
  password:{type:String},
  email:{type:String,unique:true},
  cryptId:{type:String},//tester1.user-crypt
  name:{type:Object},
  attempts:{type:Number},
  last:{type:String},
  verified:{type:Boolean},
  transaction_id:{type:String},
  createdAt:{type:Date,default:Date.now},
  status:{type:String},
  apps:[appSchema],
  approved_clients:[clientSchema]
})

const User = mongoose.model('users',userSchema,'users');

module.exports = User;