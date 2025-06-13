import GestaoForm   from "../../components/GestaoForm";
import { useNavigate } from "react-router-dom";
import { CampoConfig } from "../../types/campos";
import { registrarLaticinio } from "../../services/gestao_leite_laticinio";


const camposProducao: CampoConfig[] = [
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


function GestaoLaticinioPage() {
  const navigate = useNavigate();

  async function salvarLaticinio(data: Record<string, any>) {
    try {
        console.log(data);
        const req = await registrarLaticinio(data);
        console.log(req);
        navigate("/historico");
    } catch (error) {
        console.log(data);
        console.error('Erro ao registrar laticínio:', error)
    }
    
  }

  return (
    <main className="paginaGestao">
      <section className="paginaGestao__container">
        <GestaoForm
          title="Informe os dados do laticínio"
          fields={camposProducao}
          onSubmit={salvarLaticinio}
        />
      </section>
    </main>
  );
}

export default GestaoLaticinioPage;