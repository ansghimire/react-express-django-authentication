import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'


const Login = ({saving_data_backends, redirect}) => {
    const [userData, setUserData] = useState({ email: '', password: '' })
    const [error, setError] = useState({ emailErr: '', passwordErr: '' })
    const history = useHistory();
    
    useEffect(() => {
        if(redirect){
            history.push('/')
        }  
    }, [redirect, history])
    
    // validating 
    const handle_login = (e) => {
        e.preventDefault();
        if(userData.email === ''){
            setError({...error, emailErr: "Email field is empty"})
            return 
        }
        setError({emailErr: '', passwordErr: ''})
        if(userData.password === ''){
            setError({emailErr: '', passwordErr: "Password field is empty"})
            return 
        }
        setError({emailErr:'', passwordErr:''})

        saving_data_backends(userData)
        userData.email = ''
        userData.password = ''    
    }



    return (
        <form className="container" onSubmit={handle_login}>
              

            {/* <img className="mb-4" src="/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/> */}
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-floating my-3">
                <input type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    value = {userData.email}
                    onChange={e=> setUserData({...userData, email:e.target.value})}
                    // required
                />
                <label htmlFor="floatingInput">Email address</label>
                <div style={{color:'red'}}>{error.emailErr}</div>
            </div>
            <div className="form-floating my-3">
                <input type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    value = {userData.password}
                    onChange={e=>setUserData({...userData, password:e.target.value})}
                    // required
                    />
                    
                <label htmlFor="floatingPassword">Password</label>
                <div style={{color:'red'}}>{error.passwordErr}</div>
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>


    )
}

export default Login
