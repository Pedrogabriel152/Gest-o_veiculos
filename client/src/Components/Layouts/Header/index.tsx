import React, { useContext } from "react";
import { Link } from "react-router-dom";

// CSS
import './Headers.css';

// Context
import { AuthContext } from "../../../Contexts/auth";

// Icons
import { FiHome, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';

const Header = () => {
    const { logout, company }: any = useContext(AuthContext)

    return(
        <div className="sidebar">
            <Link to={'/dashboard'}>
                <FiHome color="#FFF" size={24} />
                Veiculos
            </Link>
            <Link to={'/profile'}>
                <FiSettings color="#FFF" size={24} />
                Perfil
            </Link>

            <Link to={''} onClick={logout}>
                <FiLogOut color="#FFF" size={24} />
                Sair
            </Link>
            
        </div>
    );
}

export default Header;