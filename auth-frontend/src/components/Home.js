import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'


const Home = ({ access }) => {

    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const history = useHistory();


    useEffect(() => {
        if (access) {
            axios.get('http://127.0.0.1:8000/api/profile/',
                {
                    headers: {
                        'Authorization': `Bearer ${access}`
                    }
                },
                { withCredentials: true })
            .then(function (response) {
                setLoading(false)
                setData(response.data)
            })
            .catch(function (error) {
                history.push('/login')

            });
        }

    }, [access, history])



    // displaying the user 
    const display_user = () => {
        const list = []
        data.forEach(element => {
            list.push(<li key={element.id}>{element.name}</li>)
        });
        return list
    }


    return (
        <div className="container">
            <h1>List of all users name in my website</h1>
            {loading ? "Loading": data && <ul>
                {display_user()}
            </ul>}
        </div>
    )
}

export default Home
