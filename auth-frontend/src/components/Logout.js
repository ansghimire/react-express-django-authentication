import axios from 'axios'
import  React,{useEffect} from 'react'
import { useHistory } from 'react-router'


const Logout = ({log}) => {
    const history = useHistory()
    useEffect(() => {
        axios.get('http://localhost:5000/api/logout/', 
        { withCredentials: true })
        .then(response=> {
            log();
            history.push('/login')
        })
        .catch(error=> {
            console.log(error);
        })
        
    }, [log, history])
   

    return (
        <div>
            logout
        </div>
    )
}

export default Logout
