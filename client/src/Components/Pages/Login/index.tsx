import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";


// CSS
import './Login.css';
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
                localStorage.setItem('@session', JSON.stringify(res.data));
                console.log(res.data)
                return
            }
            toast.error(`${res.data.message}`);
            
        })
        .catch((error: any) => {
            toast.error(`${error.response.data.message}`);
        })
    }

    return(
        <div className="container">
            <div className='content'>
                <div className='login'>
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
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

                        <input type="submit" value={'Logar'}/>
                    </form>

                    <p className={'link'}>
                        Ainda não tem conta? 
                        <Link to={'/register'}> Cadastre-se</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;