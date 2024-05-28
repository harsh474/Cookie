const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors') ; 
const {generateJWT,verifyJWT} = require("../backend/token.js") ;
app.use(cors({ origin: 'http://localhost:4000', credentials: true }))
app.use(cookieParser())

const user = {
    id: 1,
    username: 'admin',
    role: 'admin',
  };
app.get('/login',check,(req,res)=>{
    // console.log(req.cookies.Name)
    // Example usage:
const userToken = generateJWT(user);
console.log('Generated JWT:', userToken);
res.status(200).cookie("Token",userToken).send('Hello World');
}) 
function check(req,res,next){
    console.log(req.cookies.Name) ; 
    const decodedToken = verifyJWT(req.cookies.Token);
if (decodedToken) {
    console.log("successfull verficzation")
//   console.log('Decoded JWT payload:', decodedToken);
}
    // next()
}
app.listen(4000, () => console.log('Server ready'))