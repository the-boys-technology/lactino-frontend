import { Link, useNavigate } from "react-router-dom";   
import Botao from "../../components/Botao";
import "../css/cadastro_page.css";
import { useEffect, useState } from "react";
import { EstadoRaw, MunicipioRaw } from "../../types/ibge";
import { api_ibge } from "../../services/api";
import { consultarEstadoEId } from "../../services/consulta_ibge";
import { cadastrarConta } from "../../services/auth";

function CadastroPage(): React.ReactElement {

  const navigate = useNavigate();

  const [formData, setFormData] = useState<Record<string, any>>({
  role: "ADMIN",             
  })

  const [estados,    setEstados]    = useState<EstadoRaw[]>([]);
  const [ufId,       setUfId]       = useState<number | "">("");
  const [municipios, setMunicipios] = useState<string[]>([]);
  const [cidade, setCidade] = useState(""); 
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState<string | null>(null);

  const onUfChange: React.ChangeEventHandler<HTMLSelectElement> = e => {
    const id  = e.target.value ? Number(e.target.value) : "";
    setUfId(id);                               
    const nomeUF =
      id === ""
        ? ""
        : estados.find(uf => uf.id === id)?.nome ?? "";
    updateField("estado", nomeUF);             
    setCidade("");
    updateField("cidade", "");
  };

  const onCidadeChange: React.ChangeEventHandler<HTMLSelectElement> = e => {
    setCidade(e.target.value);
    updateField("cidade", e.target.value);   
  };

function updateField(name: string, value: string) {
  handleChange(name, value);         
}



  const handleChange = (name: string, value: string) =>
    setFormData(prev => ({ ...prev, [name]: value }));

  useEffect(() => {
    (async () => {
      try {
        const resp = consultarEstadoEId();
        (await resp).data.sort((a: { nome: string; }, b: { nome: any; }) => a.nome.localeCompare(b.nome));
        setEstados((await resp).data);
      } catch (e) {
        setError("Não foi possível carregar os estados");
      }
    })();
  }, []);

  useEffect(() => {
    if (!ufId) {                             
      setMunicipios([]);
      return;
    }

    setLoading(true);
    setMunicipios([]);                      
    setError(null);

    (async () => {
      try {
        const { data } = await api_ibge.get<MunicipioRaw[]>(
          `/estados/${ufId}/municipios`
        );
        const nomes = data
          .map(m => m.nome)
          .sort((a, b) => a.localeCompare(b));
        setMunicipios(nomes);
      } catch (e) {
        setError("Erro ao buscar municípios.");
      } finally {
        setLoading(false);
      }
    })();
  }, [ufId]);


  async function cadastrarUsuario(data: Record<string, any>) {
        try {
            console.log(data);
            const req = await cadastrarConta(data);
            console.log(req);
            navigate("/login");
        } catch (error) {
            console.log(data);
            console.error('Erro ao cadastrar usuário:', error)
        }
        
      }

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    await cadastrarUsuario(formData);          
  };

  return (
    <main className="cadastro-main">
      <h1 className="cadastro-main__titulo">LACTINO</h1>

      <form onSubmit={handleSubmit} className="cadastro-main__forms">
        <h2 className="cadastro-main__forms__descricao">Fazer cadastro</h2>
        <p className="cadastro-main__forms__informacao">
          Todos os campos são obrigatórios&nbsp;
          <span style={{ color: "red" }}>*</span>
        </p>

        <p className="cadastro-main__forms__direcionamento">
          Já possui uma conta? <Link to="/login">Faça login</Link>
        </p>
        
        <section className="cadastro-main__forms__campos">
          <input
            type="email"
            placeholder="E-mail"
            value={formData['email'] || ""}
            className="cadastro-main__forms__campos--texto"
            onChange={(e) => handleChange('email', e.target.value)}
          />

          <input
            type="text"
            placeholder="Nome"
            value={formData['nome'] || ""}
            className="cadastro-main__forms__campos--texto"
            onChange={(e) => handleChange('nome', e.target.value)}
          />

          <div className="cadastro-main__forms__campos--linha-dupla">
            <select
              value={ufId}
              onChange={onUfChange}
              className="cadastro-main__forms__campos--select"
            >
              <option value="" disabled>
                Estado
              </option>
              {estados.map(uf => (
                <option key={uf.id} value={uf.id}>
                  {uf.nome} ({uf.sigla})
                </option>
              ))}
            </select>

            <select
              value={cidade}
              onChange={onCidadeChange}
              disabled={!municipios.length}                 
              className="cadastro-main__forms__campos--select"
            >
              <option value="" disabled hidden>
                Cidade                                       
              </option>

              {municipios.map(cidade => (
                <option key={cidade} value={cidade}>
                  {cidade}
                </option>
              ))}
            </select>
          </div>

          <input
            type="password"
            placeholder="Senha"
            value={formData['senha'] || ""}
            onChange={(e) => handleChange('senha', e.target.value)}
            className="cadastro-main__forms__campos--senha"
          />

          <input
            type="password"
            placeholder="Confirmar senha"
            className="cadastro-main__forms__campos--senha"
          />
        </section>

        <section className="cadastro-main__forms__botoes">
          <Botao
            tipo="primary"
            label="Criar conta"
            htmlType="submit"
          />
        </section>
      </form>

      <hr className="cadastro-main__linha-divisoria" />

      <p className="cadastro-main__nome-empresa">© 2025 - Lactino</p>
    </main>
  );
}

export default CadastroPage;