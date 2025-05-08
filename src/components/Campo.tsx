import React from "react";
import "../css/campo.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

function Campo({ type, placeholder, ...rest}: InputProps): React.ReactElement {


    return(
        <section className="campo-container">
            <h4 className="campo-container__nome">{placeholder}:</h4>
            <input className="campo-container__input" type={type} placeholder={placeholder} {...rest}></input>
        </section>
    )
}

export default Campo;
