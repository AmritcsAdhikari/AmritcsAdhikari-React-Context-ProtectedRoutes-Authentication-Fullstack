import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import axios from "axios"


let Profile = () =>{

    let MYDATA_URL = "http://localhost:8080/users/me"

    const {authState} = useAuth()

    const [state,setState] = useState({
        isLoading: false,
        user_data: '',
        error: ''
    })

    useEffect(()=>{
        const getUserData =async()=>{
            if(authState.isAuthenticated){
                try{
                    setState({
                        ...state,
                        isLoading: true
                    })
                    const response = await axios.get(MYDATA_URL,{
                        headers: {
                            'x-auth-token': localStorage.getItem('token'),  
                          },
                    })
                    console.log("USER: ",response)
                    setState({
                        ...state,
                        user_data: response.data.data,
                        isLoading: false
                    })
                }catch(error){
                    console.log(error)
                    setState({
                        ...state,
                        error: error.message
                    })
                }
            }
        }
        getUserData()
    },[authState])

    let {isLoading, user_data, error} = state

    return (
        <>
            <h3>User Data:</h3>
            {
                isLoading && <>Loading ...</>
            }
            {
                error && <>Something went wrong ...</>
            }
            {
                user_data ? <>
                    {JSON.stringify(user_data)}
                </>: (
                    <>Not available</>
                )
            }
        </>
    )
}

export default Profile