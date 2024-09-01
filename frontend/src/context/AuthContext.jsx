import {useState, createContext,useContext, useEffect} from 'react'
import axios from 'axios';
const AuthContext = createContext();

export const AuthProvider = ({children})=> {

    const [authState,setAuthState] = useState({
        isLoading: false,
        isAuthenticated: false,
        error: '',
        token: '',
        userdtl: ''
    })

    /**
     * an effect that synchronizes authState with local storage on app start or context mount. 
     * This ensures the app remains logged in even after a page refresh.
     */
    useEffect(()=>{
        // Check if a token exists in localStorage on mount, and update the auth state accordingly
        const token = localStorage.getItem('token');
        if (token) {
            setAuthState(prevState => ({
                ...prevState,
                isAuthenticated: true,
                token: token,
            }));
        }
    },[])

    const login = async(url,payload) =>{
        try{
            setAuthState(prevState => ({
                ...prevState,
                isLoading: true
            }));

            const response = await axios.post(url,payload)
            console.log("AuthContext.jsx:::",response)
            if(response.status === 200){
                console.log("Here")
                localStorage.setItem('token', response.data.token);
                setAuthState(prevState => ({
                    ...prevState,
                    isLoading: false,
                    isAuthenticated: true,
                    token: response.data.token,
                    userdtl: response.data.data 
                }));       
            }
        }catch(error){
            console.log(error)
            setAuthState(prevState => ({
                ...prevState,
                isLoading: false,
                error: 'Something went wrong'
            }));
        }
    }

    const logout = ()=> {
        localStorage.removeItem('token');
        setAuthState({
            isLoading: false,
            isAuthenticated: false,
            error: '',
            token: '',
            userdtl: ''
        });
    }

    return (
        <AuthContext.Provider value={{authState,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=> {
    return useContext(AuthContext);
}