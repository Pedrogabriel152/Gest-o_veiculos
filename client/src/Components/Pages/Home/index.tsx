import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
// CSS
import './Home.css';

// Context
import { AuthContext } from "../../../Contexts/auth";

// API
import { api } from "../../../utils/api";

// Layouts
import Header from "../../Layouts/Header";
import Title from "../../Layouts/Title";

// Icons
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from "react-icons/fi";
import { PaginationControl } from "react-bootstrap-pagination-control";

const Home = () => {
    const [verify, setVerify] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [veiculos, setVeiculos] = useState<any>();
    const [dados, setdados] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const url = `vehicles?page=${page}`;
        let empresa = JSON.parse(localStorage.getItem('@session')!)
        api.get(url, {
            headers: {
                session: JSON.parse(localStorage.getItem('@session')!),
                email: empresa.email
            }
        })
        .then((res: any) => {
            setLoading(false);
            setdados(res.data);
            if(res.data.message) {
                navigate('/login');
                toast.error(res.data.message);
                setdados({});
                setVerify(false);
                return;
            }

            setdados(res.data);
            setVerify(true);
            setVeiculos(res.data.data);
        })
        .catch((erro: any) => {
            setLoading(false);
            // navigate('/login');
            toast.error('Ocorreu algum erro, tente novamente');
            setdados({});
            setVerify(false);
        })
    }, [verify, page]);

    if(!verify && !loading) {
        navigate('/login');
    }

    if(loading) {
        return (
            <div>
                <Header />

                <div className="content">
                    <Link to={'/new'} className="new">
                        <FiPlus color="#FFF" size={25} />
                        Novo veiculo
                    </Link>

                    <div className="container dashboard">
                        <span>Buscando veiculos...</span>
                    </div>
                </div>
            </div>
        );
    }


    return(
        <div>
            <Header/>
            <div className="content">
                <Title name="Veiculos"> 
                    <FiMessageSquare size={25} />
                </Title>
                <>
                    {!veiculos
                        ? (
                            <div className="container dashboard">
                                <span>Nenhum chamado encontrado...</span>

                                <Link to={'/new'} className="new">
                                    <FiPlus color="#FFF" size={25} />
                                    Novo chamado
                                </Link>
                            </div>
                        )
                        : (
                            <>
                                <Link to={'/new'} className="new">
                                    <FiPlus color="#FFF" size={25} />
                                    Novo chamado
                                </Link>
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">Modelo</th>
                                            <th scope="col">Marca</th>
                                            <th scope="col">Placa</th>
                                            <th scope="col">Cor</th>
                                            <th scope="col">Ano</th>
                                            <th scope="col">#</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {veiculos.map((item: any, index: number) => (
                                            <tr key={index}>
                                                <td data-label="Modelo">{item.modelo}</td>
                                                <td data-label="Marca">{item.marca}</td>
                                                <td data-label="Placa">{item.placa}</td>
                                                <td data-label="Cor">{item.cor}</td>
                                                <td data-label="Ano">{item.ano}</td>
                                                <td data-label="#">
                                                    <button className="action" style={{backgroundColor: '#3583f6'}}>
                                                        <FiSearch color="#FFF" size={17} />
                                                    </button>

                                                    <Link className="action" style={{backgroundColor: '#f6a935'}} to={`/new/${item.id}`}>
                                                        <FiEdit2 color="#FFF" size={17} />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                        
                                    </tbody>
                                </table>
                            </>
                        )
                    }
                    {dados && (
                        <PaginationControl
                            page={page}
                            between={4}
                            total={dados.last_page*10}
                            limit={10}
                            changePage={(page) => {
                            setPage(page); 
                            console.log(page)
                            }}
                            ellipsis={1}
                        />
                    )}
                </>
            </div>
        </div>
    );
}

export default Home;