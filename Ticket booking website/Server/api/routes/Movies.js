const express = require('express');
const router = express.Router();
const mongoose= require('mongoose');

const Movie= require('../models/movies');

router.get('/', (req, res, next) => {
    Movie.find()
    .select('name genre _id')
    .exec()
    .then(docs => {
        const response ={
        count: docs.length,
        movies: docs.map(doc =>{
            return{
                name:doc.name,
                genre:doc.genre,
                _id: doc._id
               /* request:{
                    type:'GET',
                    url: 'http://localhost:3000/movies/'+ doc._id
                }*/
                //cant use as get name is used
            }
        })
        };
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
        error: err
        });
    });

});

router.post('/', (req, res, next) =>{

    const movie= new Movie({
       _id:new mongoose.Types.ObjectId(),
        name: req.body.name,
        genre: req.body.genre
    });
    movie.save().then(result =>{
        res.status(201).json({
            message:'Movie added',
            createdMovie: {
                name: result.name,
                genre: result.genre,
                _id: result._id,
                request:{
                    type:'GET',
                    url:"http;//localhost:3000/movies/" + result._id
                }
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json();
        error: err    
    });
   

});

/*router.get('/:movieid', (req, res, next) =>{
    const id=req.params.movieid;
   
    Movie.findById(id)
    .exec()

    .then(doc => {
        console.log("From database",doc);
        if(doc){
            res.status(200).json(doc);
        }
        else{
            res.status(404).json({message: 'No valid entry found'});
        }    
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
});
*/
router.get('/:name', (req, res, next) =>{
    const name=req.params.name;
   
    Movie.find({name:name})
    .exec()

    .then(doc => {
        console.log("From database",doc);
        if(doc){
            res.status(200).json(doc);
        }
        else{
            res.status(404).json({message: 'No valid entry found'});
        }    
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
});

router.patch('/:movieid', (req, res, next) =>{
    const id= req.params.movieid;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Movie.update({ _id: id},{ $set :updateOps})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Product Updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/movies/'+ id
            }
        }); 
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

router.delete('/:name', (req, res, next) =>{
    const name= req.params.name;
    Movie.remove({ name:name})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch (err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});
/*
router.delete('/:movieid', (req, res, next) =>{
    const id= req.params.movieid;
    Movie.remove({ _id: id})
    .exec()
    .then(resut => {
        res.status(200).json(result);
    })
    .catch (err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});
  */
module.exports= router;