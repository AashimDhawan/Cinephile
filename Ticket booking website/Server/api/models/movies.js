const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    genre: String

});

module.exports= mongoose.model('movie', movieSchema)