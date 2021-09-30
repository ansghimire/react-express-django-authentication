import axios from 'axios';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Home from './components/Home';
import Message from './components/Message';
// import PageNotFound from './components/PageNotFound
// import {useHistory} from 'react-router-dom'


function App() {

  const [access, setAccess] = useState()
  const [error, setError] = useState('')
  const [redirect, setRedirect] = useState(false)
  // const history = useHistory();

  useEffect(() => {
    axios.post('http://localhost:5000/api/refresh/', 
     { withCredentials: true })
    .then(response=> {
      console.log(response.data);
    })
    .catch(error=> {
      console.log(error)
    })
   
  }, [])



  //verifying
//   useEffect(() => {
//     axios.post('http://127.0.0.1:8000/api/token/verify/', {
//         token : access.access
//     }) 
//     .then(function(response){
//         if(response){
//             setRedirect(true)
//         }
//     })
//     .catch(function (error) {
//          setRedirect(false)
//  });
 
//  }, [access, history])


  // login
  const submit_to_backend = (userData) => {
    axios.post(`http://localhost:5000/api/login`, {
      email: userData.email,
      password: userData.password
     
    },
    {
      withCredentials:true
    })

      .then((response) => {
        setAccess(response.data)
        setRedirect(true)
        setError('')
      })

      .catch((error) => {
        // console.log(error);
        setError('something went wrong');
        setRedirect(false);
      })
  }

  useEffect(() => {
    setInterval(function () { setError('') }, 3000);
  }, [error])

  

  return (
    <div>
      <Router>
        <Navbar />
        {/* <Switch> */}
        <Route exact path="/" component={Home} />
        {error && <Message error={error} type="warning"/>}
      
        <Route path="/login" render={(props) => (
          <>
            <Login saving_data_backends={submit_to_backend} redirect={redirect}  />
          </>
        )} />
        
        {/* <Route component={PageNotFound} /> */}
        {/* </Switch> */}
      </Router>
    </div>
  );
}

export default App;
