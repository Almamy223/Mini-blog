var mysql= require("mysql");


var conn= mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "",
    database: "MiniBLog"
    
});

conn.connect(function(err){
    console.log(err);
});

/*conn.query("CREATE DATABASE MiniBlog", function(err){
    if(err)
        throw err;
});
*/

conn.query("CREATE TABLE posts (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(225) NOT NULL, image VARCHAR(512), content VARCHAR(10000) NOT NULL)", function(err){
    if(err)
        throw err;
});