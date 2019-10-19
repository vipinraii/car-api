const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const  Car =require('../models/car');


router.get('/',(req,res,next)=>{
    Car.find()
    .exec()
    .then(docs =>{
        console.log(docs);
        if(docs.length>=0){
            res.status(200).json(docs);
        }else{
            res.status(200).json({
                message:"No entries founnd"
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });

});

router.post('/',(req,res,next)=>{
    const car= new  Car({
        _id:new mongoose.Types.ObjectId(),
        brand:req.body.brand,
        vehicleNumber:req.body.vehicleNumber,
        vModel:req.body.vModel,
        vPrice:req.body.vPrice
    });
    car
    .save()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message:'post request to /cars',
           addedCars:result,
        });
     })
     .catch(err => {
         console.log(err);
         res.status(500).json({
             error:err
         })
     });
     
     

    
});
router.get('/:carId',(req,res,next)=>{
    const id=req.params.carId;
    Car.findById(id)
    .exec()
    .then(doc =>{
        console.log("From Database",doc);
        if(doc){
            res.status(200).json(doc);
        }else{
            res.status(404).json({message:"No valid entry for provided ID"});
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error:err});
    });
    

});
router.patch('/:carId',(req,res,next)=>{
    const id=req.params.carId;
    const updateOps={};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Car.update({_id:id},{$set:updateOps})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err 
        });
    });
});
router.delete('/:carId',(req,res,next)=>{
    const id=req.params.carId;
    Car.remove({_id: id}).exec().then(result=>{
        res.status(200).json(result);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
           error:err
        });
    });
});
module.exports =router;