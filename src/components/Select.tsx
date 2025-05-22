import React, { useState } from 'react';
import "../css/select.css";

interface Option {
    label: string;
    value: string;
}

interface SelectProps {
    nome: string;
    options: Option[];
    value?: string;
    onChange?: (value: string) => void;
}

function Select({ nome, options, value, onChange }: SelectProps): React.ReactElement {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target.value;
        if (onChange) {
            onChange(selected);
        }
    };

    return (
        <section className="campo">
            <h4 className="campo__nome">{nome}</h4>
            <select
                className="campo__select"
                value={value ?? ''}
                onChange={handleChange}
            >
                <option value="" disabled>Selecione uma opção</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </section>
    );
}


export default Select;
