import React, { useState } from 'react';
import "../css/select.css";

function Select({ nome }: {nome: string}): React.ReactElement {

    const [produtoSelecionado, setProdutoSelecionado] = useState<string | undefined>(undefined);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value || undefined;
        setProdutoSelecionado(value);
    };

    return (
        <section className="campo">
            <h3 className="campo__nome">{nome}</h3>
            <select className="campo__select" name="produto" value={produtoSelecionado ?? ''} onChange={handleChange}>
                <option className="campo__select__opcao--padrao" value="" disabled>
                ------------------Selecione um produto-------------------
                </option>
                <option className="campo__select__opcao" value="leite">Leite</option>
                <option className="campo__select__opcao" value="laticinio">Laticínio</option>
            </select>
        </section>
    )
}

export default Select;