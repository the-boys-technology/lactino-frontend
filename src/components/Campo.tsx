import React from "react";
import "../css/campo.css";

interface CampoProps {
  name?: string;
  label?: string;
  type?: "text" | "number" | "date" | "select" | "textarea";
  value?: string | number;
  placeHolder?: string;
  disabled?: boolean;
  options?: { label: string; value: string }[];
  leftAdd?: React.ReactNode;
  rightAdd?: React.ReactNode;
  errorText?: string;
  errorShow?: boolean;
  inputFunction?: React.ChangeEventHandler<HTMLInputElement>;
  selectFunction?: React.ChangeEventHandler<HTMLSelectElement>;
  textAreaFunction?: React.ChangeEventHandler<HTMLTextAreaElement>;
  infoText?: string;
  status?: "" | "warning" | "error";
  list?: string;
  styleInput?: React.CSSProperties;
  readOnly?: boolean;
}

export const Campo: React.FC<CampoProps> = ({
  name,
  label,
  type = "text",
  value,
  placeHolder,
  disabled,
  options,
  leftAdd,
  rightAdd,
  errorText,
  errorShow,
  inputFunction,
  selectFunction,
  textAreaFunction,
  list,
  styleInput,
  readOnly,
}) => {
  const renderInput = () => {
    if (type === "select" && options) {
      return (
        <select
          className="campo-container__select"
          value={value}
          disabled={disabled}
          onChange={selectFunction}
          style={styleInput}
        >
          <option value="">Selecione uma opção</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    if (type === "textarea") {
      return (
        <textarea
          className="campo-container__input"
          value={value as string}
          readOnly={readOnly}
          placeholder={placeHolder}
          disabled={disabled}
          onChange={textAreaFunction}
          style={styleInput}
        />
      );
    }

    return (
      <input
        type={type}
        className="campo-container__input"
        value={value}
        readOnly={readOnly}
        placeholder={placeHolder}
        disabled={disabled}
        onChange={inputFunction}
        list={list}
        style={styleInput}
      />
    );
  };

  return (
    <section className={`campo-container ${errorShow ? "erro" : ""}`}>
      {label && <h4 className="campo-container__nome">{label}:</h4>}
      <div className={`campo-container__wrapper ${type === 'select' ? 'campo-container__wrapper--no-border' : ''}`}>
        {leftAdd && <span className="campo-container__addon">{leftAdd}</span>}
        {renderInput()}
        {rightAdd && <span className="campo-container__addon">{rightAdd}</span>}
      </div>
      {errorShow && <span className="campo-container__erro">{errorText}</span>}
    </section>
  );
};
