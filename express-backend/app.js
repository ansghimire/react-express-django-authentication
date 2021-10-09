const express = require('express');
const Joi = require('joi');
const axios = require('axios');
// const { response, application } = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()
const port = 5000


// enable parsing of json object in the body of the request 
app.use(express.json()); // adding piece of middleware
app.use(cookieParser())


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));





// login 
app.post('/api/login/', (req, res) => {
    const { error } = validateUser(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    let email = req.body.email
    let password = req.body.password

    axios.post('http://localhost:8000/api/token/', {
        email: email,
        password: password
    })
        .then(function (response) {
            res.cookie('refresh', response.data.refresh, { sameSite: "none", secure: true, httpOnly: true })
            // res.cookie('access', response.data.access, {sameSite: "none", secure:true, httpOnly:true})
            res.send({ "access": response.data.access })
        })
        .catch(function (error) {
            // console.log(error);
            res.status(401).send(error.message)
        })

})


// getting new refresh and access token from django
app.post('/api/refresh/', (req, res) => {
    const refresh = req.cookies.refresh;
    // const refresh = req.signedCookies.refresh;
    // console.log('refresh', refresh)

    if (refresh) {
        axios.post('http://localhost:8000/api/token/refresh/', {
            refresh: refresh
        })
        .then(function (response) {
                res.cookie('refresh', response.data.refresh, { sameSite: "none", secure: true, httpOnly: true })
                // res.cookie('access', response.data.access, {sameSite: "none", secure:true, httpOnly:true})
                res.send({ "access": response.data.access })
        })
        .catch(function (error) {
            // console.log(error.message);
            // console.log(error)
            res.status(401).send(error.message)
        })
    }else{
          res.status(400).send({ "mssg": "something went wrong" })
    }
})


// logout
app.get('/api/logout/', (req, res)=> {
    console.log(req.cookies.refresh);
   res.clearCookie('refresh');
//    res.clearCookie('access');
   res.status(200).send('succesfully logout');
})


app.listen(port, () => {
    console.log(`App listening at ${port}`)
})


// validating user
function validateUser(user) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    })
    return schema.validate(user)
}