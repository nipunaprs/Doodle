
var connection = mysql.createConnection({
    host: '34.72.194.9',
    user: 'root',
    password: '3316',
    database: 'usersDB'


}); 

connection.connect();

/*
connection.query(`
                    CREATE TABLE Person (username varchar(20), password varchar(20)
                    );
                `
            , (error, rows, fields) => {
                console.log(error); //callback function
            }
)

connection.query ('insert into Person values ("admin","123")'
                    , (error, rows, fields) => {
                        console.log(error); //callback function
                    });
*/

connection.query('select * from Person'
                , (error,rows,fields) =>
                {
                    console.log(error);
                    console.log(rows);
                    console.log(fields);
                    for(r of rows)
                    {
                        console.log(r.username);
                        console.log(r.password);
                    }
                });