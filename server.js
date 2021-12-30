const express = require('express');
var mysql = require('mysql')


//Use express command
const app = express();

//Connect to database
var connection = mysql.createConnection({
    host: '34.72.194.9',
    user: 'root',
    password: '3316',
    database: 'usersDB'


}); 

//Establish connection to DB
connection.connect();

//CORS requirements for localhost ip
const cors = require('cors');


app.use(cors({
    origin: 'http://localhost:3000'
}));


//Get request to get the admin username and password to verify at front-end
app.get('/users', (req,res) => {
    //Add database and query to verify admin details

    connection.query('select * from Person'
                , (error,rows,fields) =>
                {
                    console.log(error);
                    console.log(rows);
                    console.log(fields);
                    res.json(rows);
                    /*
                    for(r of rows)
                    {
                        adminuser = r.username;
                        adminpass = r.password;
                    }*/
                });

        

    
});

//Get request for the times table (slot#,time,user)
app.get('/times', (req,res) => {
        connection.query('select * from Time'
        , (error,rows,fields) =>
        {
            console.log(error);
            res.json(rows);
        });
});

//Code to enable usage and recieving of JSON
app.use(express.json());

//Post request to get any changes to the Times database from front-end
app.post('/send',(req,res) => {
    
    //Delete prev table
    connection.query ('DELETE from Time'
                    , (error, rows, fields) => {
                        console.log(error); //callback function
                    });
                  
    //insert query
    var query = "INSERT into Time (slot,time,user) VALUES ?"
    var values = req.body;
    

    //connection DB query exection
    connection.query (query, [values], (err, result) => {
        console.log(err)
        console.log(result)
    });
    

});
//Port 5000 (i added this as a firewall on Google)
const port = 5000;

app.listen(port, () => console.log(`the server is running on ${port}`));

