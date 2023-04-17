import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


// CSS
import styles from './Login.module.css';
import Input from "../../Layouts/Input";

// API
import { api } from "../../../utils/api";

const Login = () => {

    const [company, setCompany] = useState<any>({});
    const navigate = useNavigate();

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCompany({...company,[e.target.name]: e.target.value});
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        api.post('/login', {
            email: company.email,
            password: company.password
        })
        .then((res: any) => {
            if(res.data.name && res.data.email){
                navigate('/');
                toast.success(`Bem vindo de volta ${res.data.name}`);
                return
            }
            toast.error(`${res.data.message}`);
        })
        .catch((error: any) => {
            toast.error(`${error.response.data.message}`);
        })
    }

    return(
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <Input 
                    name="email" 
                    text="E-mail" 
                    type="email" 
                    value={company.email? company.email : ''} 
                    placeholder="Seu e-mail"
                    handleOnChange={handleOnChange}
                />

                <Input 
                    name="password" 
                    text="Senha" 
                    type="password" 
                    value={company.password? company.password : ''} 
                    placeholder="Sua senha"
                    handleOnChange={handleOnChange}
                />

                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default Login;