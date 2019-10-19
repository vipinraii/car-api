const mongoose =require('mongoose');

const carSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    brand:String,
    vehicleNumber:String,
    vModel:String,
    vPrice:Number
});

module.exports=mongoose.model('Car',carSchema);