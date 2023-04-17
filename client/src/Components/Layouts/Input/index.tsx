import React from "react";

interface Props {
    type: string
    name: string
    value: string
    text: string
    placeholder: string
    handleOnChange(e: React.ChangeEvent<HTMLInputElement>): void
}

const Input = ({type, name, value, text, placeholder, handleOnChange}: Props) => {
    return(
        <>
            <label htmlFor={name}>{text}:</label>
            <input 
                type={type} 
                value={value}
                placeholder={placeholder}
                name={name}
                onChange={handleOnChange}
            />
        </>
    );
}

export default Input;