import axios from 'axios';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Home from './components/Home';
import Message from './components/Message';
import About from './components/About';
import Logout from './components/Logout';



function App() {
  const [access, setAccess] = useState()
  const [error, setError] = useState('')
  const [redirect, setRedirect] = useState(false)


  useEffect(() => {
    axios.post('http://localhost:5000/api/refresh/',
      axios.defaults.withCredentials = true)
      .then(response => {
        console.log('firsttime', response.data);
        setAccess(response.data.access)
        setRedirect(true)
      })
      .catch(error => {
        setAccess('error')
        setRedirect(false)
        console.log(error)
      })

  }, [])

  // useEffect(() => {
  //   effect
  //   return () => {
  //     cleanup
  //   }
  // }, [input])


  useEffect(() => {

    const interval = setInterval(() => {
      if (access && access !== 'error') {
        axios.post('http://localhost:5000/api/refresh/',
          axios.defaults.withCredentials = true)
          .then(response => {
            console.log('everytime', response.data);
            setAccess(response.data.access)
            setRedirect(true)
          })
          .catch(error => {
            setAccess('error everytime')
            setRedirect(false)
            console.log(error)
          })
      }
      return () => {
        clearInterval(interval)
      }
    }, 30000);


  }, [access])



  // login
  const submit_to_backend = (userData) => {
    axios.post(`http://localhost:5000/api/login`, {
      email: userData.email,
      password: userData.password
    },
      { withCredentials: true })

      .then((response) => {
        // console.log(response.data.access);
        setAccess(response.data["access"])
        setRedirect(true)
        setError('')
      })

      .catch((error) => {
        // console.log(error);
        setError('something went wrong');
        setRedirect(false);
      })
  }

  // making error state empty after 3 sec
  useEffect(() => {
    setInterval(function () { setError('') }, 3000);
  }, [error])


  // logout
  const logout_user = () => {
    setAccess('error')
    setRedirect(false)
  }




  return (
    <div>
      <Router>
        <Navbar status={access}/>

        <Route exact path="/" render={(props) => (
          <>
            {access && <Home access={access} />}
          </>
        )} />

        {error && <Message error={error} type="warning" />}

        <Route path="/login" render={(props) => (
          <>
            <Login saving_data_backends={submit_to_backend} redirect={redirect} />
          </>
        )} />

        <Route path="/about" component={About} />
        {/* <Route path="/logout" component={Logout}/> */}
        <Route path="/logout" render={(props) => (
          <>
            <Logout log={logout_user} />
          </>
        )} />

      </Router>
    </div>
  );
}

export default App;
