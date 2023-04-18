import React, { useState, useEffect, useContext, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";

// CSS
import './VeiculoCreate.css';

// Layouts
import Header from "../../../Layouts/Header";
import Title from "../../../Layouts/Title";
import Input from "../../../Layouts/Input";

// Icons
import { FiPlusCircle } from "react-icons/fi";

// Context 
import { AuthContext } from "../../../../Contexts/auth";

// Toastify
import { toast } from "react-toastify";

const VeiculoCreate = () => {
    const [veiculo, setVeiculo] = useState<any>({});
    const [idCustomer, setIdCustomer] = useState<boolean>(false);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVeiculo({...veiculo,[e.target.name]: e.target.value});
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    }

    const handleOnChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => setVeiculo({...veiculo,[e.target.name]: e.target.value})

    return(
        <div>
            <Header />
            <div className="content">
                <Title name={"Novo Veiculo"}>
                    <FiPlusCircle size={25}/>
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={handleSubmit}>
                        
                        <Input 
                            handleOnChange={handleOnChange}
                            name="modelo"
                            placeholder="Modelo do veiculo"
                            text="Modelo"
                            type="text"
                            value={veiculo.modelo? veiculo.modelo: ''}
                        />

                        <Input
                            handleOnChange={handleOnChange}
                            name="marca"
                            placeholder="Marca do veiculo"
                            text="Marca"
                            type="text"
                            value={veiculo.marca? veiculo.marca: ''} 
                        />

                        <Input
                            handleOnChange={handleOnChange}
                            name="placa"
                            placeholder="Placa do veiculo"
                            text="Placa"
                            type="text"
                            value={veiculo.placa? veiculo.placa: ''} 
                        />

                        <Input
                            handleOnChange={handleOnChange}
                            name="cor"
                            placeholder="Cor do veiculo"
                            text="Cor"
                            type="text"
                            value={veiculo.cor? veiculo.cor: ''} 
                        />

                        <Input
                            handleOnChange={handleOnChange}
                            name="ano"
                            placeholder="Ano do veiculo"
                            text="Ano"
                            type="text"
                            value={veiculo.ano? veiculo.ano: ''} 
                        />

                        <button type="submit">{idCustomer ? 'Salvar' : 'Registrar'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default VeiculoCreate;