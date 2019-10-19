const mongoose =require('mongoose');

const carSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    brand:{type:String,required:true},
    vehicleNumber:{type:String,required:true},
    vModel:{type:String,required:true},
    vPrice:{type:Number ,required:true}
});

module.exports=mongoose.model('Car',carSchema);