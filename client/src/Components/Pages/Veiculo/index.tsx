import React, { useState, useEffect, useContext, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";

// CSS
import './VeiculoCreate.css';

// Layouts
import Header from "../../Layouts/Header";
import Title from "../../Layouts/Title";
import Input from "../../Layouts/Input";

// Icons
import { FiPlusCircle } from "react-icons/fi";

// Context 
import { AuthContext } from "../../../Contexts/auth";

// Toastify
import { toast } from "react-toastify";

// API
import { api } from "../../../utils/api";

const VeiculoCreate = () => {
    const [veiculo, setVeiculo] = useState<any>({});
    const {company}: any = useContext(AuthContext);
    const {id} = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if(id){
            
            api.get(`/vehicles/edit/${id}`, {
                headers: {
                    session: JSON.parse(localStorage.getItem('@session')!)
                }
            })
            .then((res: any) => {
                setLoading(false);
                setVeiculo(res.data);
            })
            .catch((error: any) => {
                navigate('/dashboard');
                toast.error(error.response.data.message);
                setLoading(false);
                setVeiculo({});
            })
        }
    },[]);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.name == 'placa') {
            let placa = e.target.value.toUpperCase();
            setVeiculo({...veiculo, placa: placa});
            return;
        }
        setVeiculo({...veiculo,[e.target.name]: e.target.value});
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        
        if(id){
            api.patch(`vehicles/update/${id}`, {
                modelo: veiculo.modelo,
                marca: veiculo.marca,
                placa: veiculo.placa,
                cor: veiculo.cor,
                ano: veiculo.ano,
                tipo: veiculo.tipo
            },{
                headers: {
                    session: JSON.parse(localStorage.getItem('@session')!),
                    email: company.email
                }
            })
            .then((res: any) => {
                navigate('/dashboard');
                toast.success('Veiculo editado com sucesso');
                setLoading(false);
                setVeiculo({});
            })
            .catch((error: any) => {
                toast.error(error.response.data.message);
                setLoading(false);
            })
            return;
        }

        api.post('vehicles/create', {
            modelo: veiculo.modelo,
            marca: veiculo.marca,
            placa: veiculo.placa,
            cor: veiculo.cor,
            ano: veiculo.ano,
            tipo: veiculo.tipo
        },{
            headers: {
                session: JSON.parse(localStorage.getItem('@session')!),
                email: company.email
            }
        })
        .then((res: any) => {
            toast.success('Veiculo criado com sucesso');
            setLoading(false);
        })
        .catch((error: any) => {
            toast.error(error.response.data.message);
            setLoading(false);
        })
    }

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
                            type="number"
                            value={veiculo.ano? veiculo.ano: ''} 
                        />

                        <Input
                            handleOnChange={handleOnChange}
                            name="tipo"
                            placeholder="Carro ou moto"
                            text="Tipo"
                            type="text"
                            value={veiculo.tipo? veiculo.tipo: ''} 
                        />

                        {id
                            ? <input type="submit" value={loading? "Carregando" : 'Salvar'} />
                            : <input type="submit" value={loading? "Carregando" : 'Registrar'} />
                        }
                    </form>
                </div>
            </div>
        </div>
    );
}

export default VeiculoCreate;