import { useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from 'axios';

let Register = () => {

    let REGISTER_API = 'http://localhost:8080/users/register'
    const navigate = useNavigate()
    
    let [state,setState] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        isLoading: false,
        error: '',
    })

    let {error, isLoading} = state 

    //const navigate = useNavigate()
    
    const handleInputChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    } 

    let {firstname, lastname,email,password} = state

    const handleSubmit = async (event) => {
        event.preventDefault()
        const body = {
            firstName: firstname,
            lastName: lastname,
            email: email,
            password: password
        }
        console.log("Body:::", body)
        try{
            setState({
                ...state,
                isLoading: true
            })
            const response = await axios.post(REGISTER_API, body)
            console.log(response)
            if(response.status === 201){
                console.log("Registration success!")
                navigate("/user/login")
            }
            setState({
                ...state,
                isLoading: false
            })
            
        }catch(error){
            console.log(error)
            setState({
                ...state,
                error: error.response?.data?.message || 'Something went wrong'
            })
        }
        finally {
            setState(prevState => ({
                ...prevState,
                isLoading: false
            }));
        }
    }


    if(isLoading){
        return <>Loading...</>
    }

    if(error){
        return <>Something went wrong...</>
    }

    return (
    <>
    <pre>{JSON.stringify(state)}</pre>
        <div className="container shadow-lg mt-5">
            <div className="row">
                <div className="col-sm-6 mx-auto d-flex align-items-center justify-content-center text-success mt-5">
                    <h3>Registration Form</h3>
                </div>
                <div className="col-sm-6 mx-auto text-left">
                    <form className="m-5" onSubmit={handleSubmit}>
                        <div className="form-group mb-2">
                                <label className="text text-primary">First Name</label>
                                <input
                                    required
                                    name={'firstname'} 
                                    type="text"
                                    value={state.firstname}
                                    onChange={handleInputChange} 
                                    className="form-control"  placeholder="Enter first Name"/>
                        </div>
                        <div className="form-group mb-2">
                            <label className="text text-primary">Last Name</label>
                            <input
                                required
                                name={'lastname'} 
                                type="text" 
                                value={state.lastname} 
                                onChange={handleInputChange} 
                                className="form-control"  placeholder="Enter last Name"/>
                        </div>
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
                    
                </div>
                
            </div>
        </div>
    </>
    );
  }
  
  export default Register;
  