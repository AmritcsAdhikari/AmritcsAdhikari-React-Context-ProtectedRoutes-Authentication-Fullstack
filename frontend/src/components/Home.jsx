import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

let Home = ()=>{
    const {authState,login,logout} = useAuth()

    useEffect(()=>{
        console.log("Auth state updated:", authState);
    },[authState])

    return(
        <>
            <div>Home Page</div>
            
            <pre>{JSON.stringify(authState)}</pre>
        </>
    )
}

export default Home