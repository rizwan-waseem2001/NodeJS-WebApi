const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(express.json());
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'myFirstProject',
    multipleStatements: true
});

mysqlConnection.connect((err)=> {
    if(!err){

        console.log ("DB CONNECTION SUCCEED")
    }
    else{
        console.log("FAILES TO CONNECT \n Error" + JSON.stringify(err, undefined, 2))
    }

})

app.listen(3100,()=>console.log('Express Server is ruuning at port no. 3100'));


// GET ALL EMPLOYEES DATA

app.get('/Customer', (req, res)=>{

    mysqlConnection.query('Select * FROM Customer', (err, rows, field)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
})



// GET AN EMPLOYEES DATA

app.get('/Customer/:CustomerID', (req, res)=>{

    mysqlConnection.query('Select * FROM Customer WHERE CustomerID = ? ', [req.params.CustomerID] ,(err, rows, field)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
})




// Delete AN EMPLOYEES DATA

app.delete('/Customer/:CustomerID', (req, res)=>{

    mysqlConnection.query('Delete FROM Customer WHERE CustomerID = ? ', [req.params.CustomerID] ,(err, rows, field)=>{
        if(!err)
        res.send("DELETED SUCCESSFULLY");
        else
        console.log(err);
    })
})



// Insert AN EMPLOYEES DATA


app.post('/Customer', (req, res)=>{

    const data = req.body;
    mysqlConnection.query('INSERT INTO CUSTOMER SET ? ', data,(err,rows,field)=>{

        if(err){
            res.send('ERROR');
        }
        else{
            res.send(rows);
        }

    })
})

//update DATA
app.put('/Customer/:CustomerID', (req, res)=>{

    const data = [req.body.LastName, req.body.FirstName, req.body.City, req.params.CustomerID];
    mysqlConnection.query('Update CUSTOMER SET LastName = ?, FirstName = ?, City = ? Where CustomerId = ? ', data, (err,rows,field)=>{

        if(err){
            res.send('202ERROR');
        }
        else{
            res.send(rows);
        }

    })
})


