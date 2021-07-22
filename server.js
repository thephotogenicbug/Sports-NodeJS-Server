const express = require('express');
const app = express();
const cors = require("cors");
app.use(express.json())
app.use(cors())

// MySQL Connection
const mysql = require("mysql");
const mydatabase = mysql.createConnection({
    host     : 'localhost',
    user     :  'root',
    password : '',
    database : 'sports' 
})
mydatabase.connect();


// user login with validation
app.post("/login", function(req , res){
    var mobile = req.body.mobile;
	
    var sql = "select * from users where mobile='" +mobile+ "'";
    mydatabase.query( sql , function(error , rows, fields){
        if(error) throw error
		if(rows.length > 0){
			res.send(rows);
			res.end();
		}else{
			res.send({"id":""});
			res.end();
		}
       
    })
});


// post user data
app.post("/register", function(req,res){
    var mobile = req.body.mobile;
    var sql = "insert into users(mobile) values('"+mobile+"')";
    mydatabase.query(sql , function(error, rows, fields){
        if(error) throw error
        res.send("Registration Successfull !");
        res.end();
    })
})


// // get user login data 
//  app.get("/user", function(req,res){
//      var id = req.body.id;
//      mydatabase.query('select * from users order by id desc' , function(error, rows, fields){
//          if(error) throw error
//          res.send(JSON.stringify(rows));
//          res.end();
//      })
//  })



// get user data after login 
 app.get("/data", function(req,res){
    var id = req.body.id;
    mydatabase.query('select * from data order by id desc' , function(error, rows, fields){
        if(error) throw error
        res.send(JSON.stringify(rows));
        res.end();
    })
})


// post user request
app.post("/userdata", function(req,res){
    var data = req.body.data;
    var courts = req.body.courts;
    var showerarea = req.body.showerarea;
    var open = req.body.open;
    var parking = req.body.parking;
    var date = req.body.date;
    var sql = "insert into data(data, courts, showerarea, open, parking, date) values('"+data+"', '"+courts+"', '"+showerarea+"', '"+open+"', '"+parking+"', '"+date+"')";
    mydatabase.query(sql , function(error, rows, fields){
        if(error) throw error
        res.send("User data recieved successfully !");
        res.end();
    })
})

 app.listen(2222, function(){
    console.log("Server is Running on port 2222")
})