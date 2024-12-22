const express = require('express');
const app = express();
const port = 5000;
const connect = require('./connecct');
const Singup = require("./Routes/SingUp");
const Login = require("./Routes/Login")
const Data = require("./Routes/Data")
const orders = require("./Routes/Orders.")
const myorders = require("./Routes/Myorder")

connect('mongodb+srv://kartavya:%40Kartavya28@cluster0.h01ae.mongodb.net/GoFood?retryWrites=true&w=majority&appName=Cluster0');

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3001");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type,Accept"
  );
  next();
})
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

// Test route to check if the server is running
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Route to handle user signup
app.use('/createUser', Singup);
app.use('/loginUser',Login);
app.use('/data',Data)
app.use("/",orders)
app.use("/",myorders)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
