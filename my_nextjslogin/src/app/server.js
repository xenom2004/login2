const express = require('express')
const app = express()
const cors = require('cors'); 
const bodyParser = require("body-parser");
const mysql = require('mysql2');
// import bcrypt from "bcrypt";
const bcrypt =require("bcrypt");
const { error } = require('console');

// Create a connection pool
function con(){const connection = mysql.createConnection({
  host: 'localhost',         
  user: 'root',    
  password: '@mysql271314', 
  database: 'nodeadv', 
  
});
return connection;}

app.use(cors());
// respond with "hello world" when a GET request is made to the homepage
app.get('/loginaddress', (req, res) => {
  res.send('hello world')
})


app.get('/', (req, res) => {
    res.send('hello world')
  })

app.get('/welcome', (req, res) => {
res.send('welcome to IIT INDORE')
})


app.use(express.json());
const users=[];
// app.get('/users', (req, res) => {
//     res.send(users);
//     })
// app.post('/users', async (req, res) => {
//     try {
//         const hashedPassword = await bcrypt.hash(req.body.password, 10)
//         const user = { name: req.body.name, password: hashedPassword }
//         users.push(user)
//         res.status(201).send()
//     } catch {
//         res.status(500).send()
//     }
//     })
// app.post('/users/login', async (req, res) => {
//     const user = users.find(user => user.name === req.body.name)
//     if (user == null) {
//       return res.status(400).send('Cannot find user')
//     }
//     try {
//       if(await bcrypt.compare(req.body.password, user.password)) {
//         res.send('Success')
//       } else {
//         res.send('Not Allowed')
//       }
//     } catch {
//       res.status(500).send()
//     }
//   })

app.post("/myform",async (req,res)=>{
    const password=req.body.Password;
    const useri=req.body.user;
    const ph=req.body.phone;
    console.log(req.body);
    const insertQuery = 'INSERT INTO mytable VALUE (?, ?, ?);';
    const selectquery="select count(*) from mytable where userID=?;"
    const b=[useri];
    c=con();
    const li=c.query(selectquery,b,(err,results)=>{if(err){throw err;}
            if(results[0]["count(*)"]>0){
                
                res.status(202).send();
                
                
            }});
    
   
    const hashedPassword = await bcrypt.hash(password, 10)
    const user2 = { name: useri, password: hashedPassword }
    users.push(user2);
    const values = [useri,ph,hashedPassword];
    console.log(hashedPassword);
    
    c.query(insertQuery, values, (err, results) => {
        if (err) {
          console.error('Error inserting data:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          console.log('successfully registered');
          res.status(201).send();
                
        }
      });
})  
// app.post("/mylogin",(req,res)=>{
//     const { password, user} = req.body;
//     console.log(req.body);
//     const insertQuery = 'select password  from mytable where password=(?)';
//     const values = [password];
//     c=con();
//     c.query(insertQuery, values, (err, results) => {
//         if (err) {
//           console.error('Error inserting data:', err);
//           res.status(500).json({ error: 'Internal Server Error' });
//         } else {
//           console.log('successfully registered');
//           res.status(201).json({ message: 'Data inserted successfully' });
//         }
//       });


// })
app.post("/mylogin", async (req, res) => {
    const password=req.body.Password;
    const useri=req.body.user;
    
    // Retrieve the hashed password from the database based on the user's name
    const selectQuery = 'SELECT password FROM mytable WHERE userID= ?';
    const values = [useri];
    
    const connection = con();
  
    connection.query(selectQuery, values, async (err, results) => {
      if (err) {
        console.error('Error querying data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        
        if (results.length === 0) {
          // User not found
          console.log("failed 0")
          res.status(203).json({ message: 'Login failed no such user' });
        } else {
          // Compare the received password with the stored hashed password
          const storedHashedPassword = results[0].password;
          const isPasswordValid = await bcrypt.compare(password, storedHashedPassword);
          
          if (isPasswordValid) {
            // Password is valid
            console.log("success")
            res.status(200).json({ message: 'Login successful' });
            
          } else {
            // Password is not valid
            console.log("failed")
            res.status(204).json({ error: 'Login failed' });
          }
        }
      }
  
      connection.end(); // Close the database connection
    });
  });

app.listen(5000); //the port you want to use
console.log("Express server running");


// const express = require('express');
// const next = require('next');

// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   const server = express();

//   server.get('*', (req, res) => {
//     return handle(req, res);
//   });

//   server.listen(3000, (err) => {
//     if (err) throw err;
//     console.log('> Ready on http://localhost:3000');
//   });
// });






