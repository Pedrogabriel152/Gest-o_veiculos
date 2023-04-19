import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";


// CSS
import styles from '../Login/Login.module.css';
import Input from "../../Layouts/Input";

// API
import { api } from "../../../utils/api";

const Register = () => {

    const [company, setCompany] = useState<any>({});
    const navigate = useNavigate();

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCompany({...company,[e.target.name]: e.target.value});
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        api.post('/register', {
            email: company.email,
            name: company.name,
            password: company.password,
            confirmpassword: company.confirmpassword
        })
        .then((res: any) => {
            if(res.data.name && res.data.email){
                navigate('/');
                toast.success(`Bem vindo ao sistema ${res.data.name}`);
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
            <div className={styles.content}>
                <div className={styles.login}>
                    <h1>Registrar</h1>
                    <form onSubmit={handleSubmit}>
                        <Input 
                            name="name" 
                            text="Nome da Empresa" 
                            type="text" 
                            value={company.name? company.name : ''} 
                            placeholder="Nome da empresa"
                            handleOnChange={handleOnChange}
                        />

                        <Input 
                            name="email" 
                            text="Email" 
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

                        <Input 
                            name="confirmpassword" 
                            text="Senha" 
                            type="password" 
                            value={company.confirmpassword? company.confirmpassword : ''} 
                            placeholder="Confirme sua senha"
                            handleOnChange={handleOnChange}
                        />

                        <input type="submit" value={'Cadastre-se'}/>
                    </form>

                    <p className={styles.link}>
                        Já tem conta? 
                        <Link to={'/login'}> Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;