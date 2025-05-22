import GestaoForm from "../components/GestaoForm";
import { CampoConfig } from "../types/campos";

const camposProduto: CampoConfig[] = [
    { type: "text", placeholder: "Nome" },
    { type: "text", placeholder: "Descrição" },
    { type: "date", placeholder: "Data de obtenção" },
    { type: "text", placeholder: "Origem" },
    {
        type: "select",
        label: "Turno:",
        options: [
            { label: "Matutino", value: "matutino" },
            { label: "Vespertino", value: "vespertino" },
            { label: "Noturno", value: "noturno" },
        ],
    },
    { type: "date", placeholder: "Data de validade" },
    {
        type: "select",
        label: "Status:",
        options: [
            { label: "Disponível", value: "disponivel" },
            { label: "Utilizado", value: "utilizado" },
            { label: "Vencido", value: "vencido" },
            { label: "Descartado", value: "descartado" },
        ],
    },
    { type: "text", placeholder: "Finalidade" },
    { type: "text", placeholder: "Fornecedor" },
];

function GestaoLeitePage(): React.ReactElement {
    return <GestaoForm title="Informe os dados do leite" fields={camposProduto} />;
}


export default GestaoLeitePage;