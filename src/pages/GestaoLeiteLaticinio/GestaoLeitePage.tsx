import GestaoForm   from "../../components/GestaoForm";
import { useNavigate } from "react-router-dom";
import { CampoConfig } from "../../types/campos";
import { registrarLeite } from "../../services/gestao_leite_laticinio";

const camposProduto: CampoConfig[] = [
  { name: "nome",        type: "text",  placeholder: "Nome" },
  { name: "descricao",   type: "text",  placeholder: "Descrição" },
  { name: "dataObtencao",type: "date",  placeholder: "Data de obtenção" },
  { name: "origem",      type: "text",  placeholder: "Origem" },
  {
    name: "turno",
    type: "select",
    label: "Turno:",
    options: [
      { label: "Matutino",   value: "MATUTINO" },
      { label: "Vespertino", value: "VESPERTINO" },
      { label: "Noturno",    value: "NOTURNO" }
    ]
  },
  //{ name: "dataValidade",    type: "date",  placeholder: "Data de validade" },
  {
    name: "status",
    type: "select",
    label: "Status:",
    options: [
      { label: "Disponível", value: "DISPONIVEL" },
      { label: "Utilizado",  value: "UTILIZADO" },
      { label: "Vencido",    value: "VENCIDO" },
      { label: "Descartado", value: "DESCARTADO" }
    ]
  },
  { name: "finalidade",  type: "text",  placeholder: "Finalidade" },
  { name: "fornecedorId",  type: "text",  placeholder: "Fornecedor" }
];

function GestaoLeitePage() {
  const navigate = useNavigate();

  async function salvarLeite(data: Record<string, any>) {
      try {
          console.log(data);
          const req = await registrarLeite(data);
          console.log(req);
          navigate("/historico");
      } catch (error) {
          console.log(data);
          console.error('Erro ao registrar leite:', error)
      }
      
    }

  return (
    <main className="paginaGestao">
      <section className="paginaGestao__container">
        <GestaoForm
          title="Informe os dados do leite"
          fields={camposProduto}
          onSubmit={salvarLeite}
        />
      </section>
    </main>
  );
}

export default GestaoLeitePage;