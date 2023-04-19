import React, { FormEvent, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// CSS
import './Profile.css';

// Toatfy
import { toast } from 'react-toastify';

// Layouts
import Header from "../../Layouts/Header";
import Title from "../../Layouts/Title";
import Input from "../../Layouts/Input";

// Icons
import { FiSettings, FiUpload } from "react-icons/fi";

// API
import { api } from "../../../utils/api";

// Context
import { AuthContext } from "../../../Contexts/auth";

const Profile = () => {
    const { company } = useContext<any>(AuthContext);
    const navigate = useNavigate();
    const [companyEdit, setCompanyEdit] = useState<any>({});

    useEffect(() => {
        api.get('company/edit', {
            headers: {
                session: JSON.parse(localStorage.getItem('@session')!),
                email: company.email
            }
        })
        .then((res : any) => {
            setCompanyEdit(res.data);
        })
    }, []);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCompanyEdit({...companyEdit, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let data: {} = {
            name: companyEdit.name,
            email: companyEdit.email
        }

        if(companyEdit.password){
            data = {
                ...data, 
                password: companyEdit.password,
                confirmpassword: companyEdit.confirmpassword
            }
        }

        await api.patch('company/update', data, {
            headers: {
                session: JSON.parse(localStorage.getItem('@session')!),
                email: company.email
            }
        })
        .then((res: any) => {
            toast.success('Empresa atualizada com sucesso');
        })
        .catch((error: any) => {
            toast.error('Erro ao salvar as alterações, tente novamente mais tarde');
        })

    }

    return (
        <div>
            <Header />
            <div className="content">
                <Title name='Minha conta'> 
                    <FiSettings size={25}/>
                </Title>

                {companyEdit && (
                    <div className="container">
                        <form className="form-profile" onSubmit={handleSubmit}>
                            <Input 
                                type="text" 
                                name="name" 
                                placeholder="Seu nome" 
                                value={companyEdit.name? companyEdit.name : ''} 
                                text="Nome"
                                handleOnChange={handleOnChange}
                            />

                            <Input 
                                type="email" 
                                name="email" 
                                placeholder="Seu email" 
                                value={companyEdit.email? companyEdit.email : ''} 
                                text="Email"
                                handleOnChange={handleOnChange}
                            />

                            <Input 
                                type="password" 
                                name="password" 
                                placeholder="Seu senha (opicional)" 
                                value={companyEdit.password? companyEdit.password : ''} 
                                text="Senha"
                                handleOnChange={handleOnChange}
                            />

                            <Input 
                                type="password" 
                                name="confirmpassword" 
                                placeholder="Confirme sua senha (opicional)" 
                                value={companyEdit.confirmpassword? companyEdit.confirmpassword : ''} 
                                text="Confirmação de senha"
                                handleOnChange={handleOnChange}
                            />

                            <button type="submit">Salvar</button>

                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;