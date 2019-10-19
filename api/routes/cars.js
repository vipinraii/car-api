const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const  Car =require('../models/car');
const checkAuth = require('../middleware/check-auth');

router.get('/',(req,res,next)=>{
    Car.find().select('brand vehicleNumber vModel vPrice')
    .exec()
    .then(docs =>{
        const response ={
            count:docs.length,
            cars:docs

        };

        res.status(200).json(response);
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });

});

router.post('/', checkAuth ,(req,res,next)=>{
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
            message:'Created Cars Successfully',
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
    Car.find().select('brand vehicleNumber vModel vPrice')
    .exec()
    .then(doc =>{
        console.log("From Database",doc);
        if(doc){
            res.status(200).json({
                cars:doc

            });
        }else{
            res.status(404).json({message:"No valid entry for provided ID"});
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error:err});
    });
    

});
router.patch('/:carId',checkAuth,(req,res,next)=>{
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
router.delete('/:carId',checkAuth,(req,res,next)=>{
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