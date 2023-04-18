import React from "react";

// CSS
import './Title.css';
import { IconType } from "react-icons";

const Title = ({children, name}: any) => {
    return(
        <div className="title">
            {children}
            <span>{name}</span>
        </div>
    );
}

export default Title;