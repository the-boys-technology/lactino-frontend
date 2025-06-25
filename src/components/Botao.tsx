import React from "react";
import "../css/botao.css";

interface BotaoProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    onClick?: () => void;
    tipo: 'primary' | 'secondary' | 'danger' | 'success';
    htmlType: 'submit' | 'button' | 'reset';
    desabilitado?: boolean;
}

function Botao({ label, onClick, tipo, htmlType, desabilitado }: BotaoProps): React.ReactElement {
    return (
        <button
            className={`botao ${tipo}`}
            onClick={onClick}
            type={htmlType}
            disabled={desabilitado}
        >
            {label}
        </button>
    );
}

export default Botao;