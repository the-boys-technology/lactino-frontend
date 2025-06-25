import { CampoConfig } from "./campos";

export const camposLaticinio: CampoConfig[] = [
    {   name: "tipoProduto",
        type: "select",
        label: "Tipo:",
        options: [
            { label: "Queijo", value: "queijo" },
            { label: "Iogurte", value: "iogurte" },
            { label: "Manteiga", value: "manteiga" }
        ],
    },
    { name: "quantidadeProduzida", type: "number", placeholder: "Quantidade" },
    { name: "dataProducao", type: "date", placeholder: "Data de produção" },
    //{ name: "dataValidade", type: "date", placeholder: "Data de validade" },
    {   name: "status",
        type: "select",
        label: "Status:",
        options: [
            { label: "Em estoque", value: "EM_ESTOQUE" },
            { label: "Vendido", value: "VENDIDO" },
            { label: "Vencido", value: "VENCIDO" },
            { label: "Descartado", value: "DESCARTADO" }
        ],
    },
    { name: "descricao", type: "text", placeholder: "Descrição" }, 
    { name: "leiteUtilizadoId", type: "text", placeholder: "Leite de origem"}
];