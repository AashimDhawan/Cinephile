const express= require('express');
const app=express();
const path=require('path');
const router=express.Router();

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/user.html'));
});




app.use('/',router);
app.listen(process.env.port||5000);