import GestaoForm from "../components/GestaoForm";
import { CampoConfig } from "../types/campos";

const camposProducao: CampoConfig[] = [
    {
        type: "select",
        label: "Tipo:",
        options: [
            { label: "Queijo", value: "queijo" },
            { label: "Iogurte", value: "iogurte" },
            { label: "Manteiga", value: "manteiga" }
        ],
    },
    { type: "number", placeholder: "Quantidade" },
    { type: "date", placeholder: "Data de produção" },
    { type: "date", placeholder: "Data de validade" },
    {
        type: "select",
        label: "Status:",
        options: [
            { label: "Em estoque", value: "em_estoque" },
            { label: "Vendido", value: "vendido" },
            { label: "Vencido", value: "vencido" },
            { label: "Descartado", value: "descartado" }
        ],
    },
    { type: "text", placeholder: "Descrição" },
];

function GestaoLaticinioPage(): React.ReactElement {
    return <GestaoForm title="Informe os dados do laticínio" fields={camposProducao} />;
}


export default GestaoLaticinioPage;