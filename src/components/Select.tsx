import React, { useState } from 'react';
import "../css/select.css";

interface Option {
    label: string;
    value: string;
}

interface SelectProps {
    nome: string;
    options: Option[];
}

function Select({ nome, options }: SelectProps): React.ReactElement {
    const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value || undefined;
        setSelectedValue(value);
    };

    return (
        <section className="campo">
            <h4 className="campo__nome">{nome}</h4>
            <select
                className="campo__select"
                name="produto"
                value={selectedValue ?? ''}
                onChange={handleChange}
            >
                <option className="campo__select__opcao--padrao" value="" disabled>Selecione uma opção</option>
                {options.map((option) => (
                    <option
                        key={option.value}
                        className="campo__select__opcao"
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </section>
    );
}

export default Select;
