import "../css/gestao_produto.css"
import Campo from "./Campo";
import Select from "./Select";
import Botao from "./Botao";
import { CampoConfig } from '../types/campos'; 
import { useNavigate  } from "react-router-dom";


interface GestaoFormProps {
    title: string;

    fields: CampoConfig[];
}

function GestaoForm({ title, fields }: GestaoFormProps): React.ReactElement {
    const navigate = useNavigate();

    return (
        <main className="paginaGestao">
            <section className="paginaGestao__container">
                <h2 className="paginaGestao__titulo">{title}</h2>
                <section className="paginaGestao__campos">
                    {fields.map((field, index) => {
                        if (field.type === "select") {
                            return (
                                <Select
                                    key={index}
                                    nome={field.label}
                                    options={field.options}
                                />
                            );
                        }

                        return (
                            <Campo
                                key={index}
                                type={field.type}
                                placeholder={field.placeholder}
                            />
                        );
                    })}
                </section>
                <section className="paginaGestao__botoes">
                    <Botao label="Retornar" tipo="secondary" onClick={() => navigate('/selecionar-produto')}></Botao>
                    <Botao label="Salvar" tipo="primary" onClick={() => navigate('/historico')}></Botao>
                </section>
            </section>
        </main>
    );
}

export default GestaoForm;
