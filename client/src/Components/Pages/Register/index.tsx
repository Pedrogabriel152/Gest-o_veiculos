import React, { useState } from "react";

// CSS
import styles from './Register.module.css';
import Input from "../../Layouts/Input";

const Register = () => {

    const [company, setCompany] = useState<any>({});

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCompany({...company,[e.target.name]: e.target.value});
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return(
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <h1>Regsitrar</h1>
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

export default Register;