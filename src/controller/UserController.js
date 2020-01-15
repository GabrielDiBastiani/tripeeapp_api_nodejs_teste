require('dotenv').config()
const {Client} = require('pg');
const jwt = require('jsonwebtoken');

//Postgre connection
var connectionString = "postgres://postgres:gabriel@123@localhost:5432/Company";
const client = new Client({
    connectionString: connectionString
});

client.connect();

module.exports = {
    async index(req, res) {
        var response = null;
        response = client.query('SELECT * FROM test',  (err, result) => {
            if (err) {
                console.log(err);
                return  res.status(400).send(err);
                
            }
            return  res.status(200).send(result.rows);
        });

        return response;
    },
    async show(req, res) {
        var response = null;
        const { email,pwd } = req.body;
        
        response = client.query(`SELECT * FROM test where email = '${email}'`,  (err, result) => {
            if (err) {
                console.log(err);
                return  res.status(500).json({error: "Server error"});
                
            }
            const token = jwt.sign({ id: result.rows[0].id }, process.env.AUTH_SECRET, {
                expiresIn: 86400,
            });
            
            jwt.verify(token, process.env.AUTH_SECRET, (err,decoded) => {
                console.log(err);
                console.log(decoded);
            })  

            result.rows[0].pwd = undefined;
            result.rows[0].token = token;
            return  res.status(200).json(result.rows[0]);
        });


        
        return response;
    }
};