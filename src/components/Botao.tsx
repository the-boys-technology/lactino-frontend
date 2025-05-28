import React from "react";
import "../css/botao.css";

interface BotaoProps {
  label?: string | React.ReactNode;
  onClick?: () => void;
  tipo?: "primary" | "secondary" | "danger" | "success";
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

function Botao({ label, onClick, tipo = "primary", disabled = false, loading = false, icon }: BotaoProps): React.ReactElement {
  return (
    <button
      className={`botao ${tipo} ${disabled ? "disabled" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? (
        <span className="botao__loading">⏳</span>
      ) : (
        <>
          {icon && <span className="botao__icon">{icon}</span>}
          {label}
        </>
      )}
    </button>
  );
}

export default Botao;
