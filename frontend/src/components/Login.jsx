import {useState} from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate , Link } from 'react-router-dom'
let Login = () => {

    let LOGIN_API = 'http://localhost:8080/users/login/'

    //get context data
    const {login} = useAuth()
    const navigate = useNavigate();

    let [state,setState] = useState({
        email: '',
        password: '',
        isLoading: false,
        error: '',
    })

    let {email, password, error, isLoading} = state 

    const handleInputChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const body = {
            email,
            password
        }
        
        try{
            setState({
                ...state,
                isLoading: true
            })
        //     delegate payload to the login function from context : asynchronous
        //    Await the login function to ensure state is updated correctly before navigating
            await login(LOGIN_API,body)
            navigate("/user/me")
            setState({
                ...state,
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
    if(isLoading){
        return <>Loading...</>
    }

    if(error){
        return <>Something went wrong... {error}</>
    }

    return(
        <>
            <pre>{JSON.stringify(state)}</pre>
            <div className="container shadow-lg mt-5">
                <div className="row">
                    <div className="col-sm-6 mx-auto mx-auto d-flex align-items-center justify-content-center text-success mt-5">
                        <h3>Login Form</h3>
                    </div>
                    <div className="col-sm-6 mx-auto text-left">
                        <form className="m-5" onSubmit={handleSubmit}>
                            
                            <div className="form-group mb-2">
                                <label className="text text-primary">Email</label>
                                <input
                                    required 
                                    name={'email'} 
                                    type="email" 
                                    value={state.email}
                                    onChange={handleInputChange}  
                                    className="form-control" aria-describedby="emailHelp" placeholder="Enter email" />
                                <small className="form-text  text text-success">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group mb-2">
                                <label className="text text-primary">Password</label>
                                <input
                                    required
                                    name={'password'} 
                                    type="password"
                                    value={state.password}
                                    onChange={handleInputChange}   
                                    className="form-control"  placeholder="Enter password"/>
                            </div>

                            <button type="submit" className="my-4 btn btn-success">Submit</button>
                        </form>

                        <small>Don't have an account?<Link to="/user/register">Register</Link></small>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login