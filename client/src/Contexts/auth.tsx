import { useState, createContext, useEffect } from "react";

// Toastify
import { toast } from "react-toastify";

// API
import { api } from "../utils/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

const AuthProvider = ({children}: any) => {  
    const [company, setCompany] = useState<any>({});
    const navigate = useNavigate();

    useEffect(() => {
        let company = localStorage.getItem('@session');

        if(company) {
            setCompany(company);
        }
    }, [])

    const logout = () => {
        api.get('/logout');
        localStorage.removeItem('@session');
        setCompany({});
        navigate('/login');
    }

    return (
        <AuthContext.Provider 
            value={{
                logout,
                company
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;