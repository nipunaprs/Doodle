var mysql = require('mysql')


var connection = mysql.createConnection({
    host: '34.72.194.9',
    user: 'root',
    password: '3316',
    database: 'usersDB'


}); 

/*
connection.query(`
                    CREATE TABLE Time (slot int NOT NULL, time varchar(20), user varchar(20)
                    );
                `
            , (error, rows, fields) => {
                console.log(error); //callback function
            });
*/

/*
connection.query ('insert into Time values (6,"13:00","")'
                    , (error) => {
                        console.log(error); //callback function
                    });

*/
/*
connection.query ('DELETE from Time'
                    , (error, rows, fields) => {
                        console.log(error); //callback function
                    });
                    

var query = "INSERT into Time (slot,time,user) VALUES ?"
var values = [
    ['1','9:00','Nick'],
    ['2','10:00','John'],
    ['3','11:00','Kate'],
    ['4','12:00','Shaima'],
    ['5','13:00','Bob'],
    ['6','14:00',''],
    ['7','15:00',''],
    ['8','16:00',''],
    ['9','17:00',''],
    ['10','18:00',''],

];


connection.query (query, [values], (err, result) => {
    console.log(err)
    console.log(result)
});


*/



connection.query('select * from Time ORDER BY slot'
            , (error,rows,fields) =>
            {
                console.log(error);
                console.log(rows);
                //console.log(fields);
                for(r of rows)
                {
                    console.log(r.slot);
                    console.log(r.time);
                    console.log(r.user);
                }
            });

connection.end();