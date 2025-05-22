import { Link, useNavigate } from "react-router-dom";   
import Botao from "../components/Botao";
import "../css/cadastro_page.css";

function CadastroPage(): React.ReactElement {
  const estados = ["AC", "AL", "AP", "BA", "CE", "DF", "ES",
                   "GO", "MA", "MG", "MS", "MT", "PA", "PB",
                   "PE", "PI", "PR", "RJ", "RN", "RO", "RR",
                   "RS", "SC", "SE", "SP", "TO"];

  const cidades = ["Cidade 1", "Cidade 2", "Cidade 3"];

  const navigate = useNavigate();
  function handleClick() {
    navigate('/');
  }

  return (
    <main className="cadastro-main">
      <h1 className="cadastro-main__titulo">LACTINO</h1>

      <section className="cadastro-main__forms">
        <h2 className="cadastro-main__forms__descricao">Fazer cadastro</h2>
        <p className="cadastro-main__forms__informacao">
          Todos os campos são obrigatórios&nbsp;<span style={{ color: "red" }}>*</span>
        </p>

        <p className="cadastro-main__forms__direcionamento">
          Já possui uma conta?{" "}
          <Link to="/login">Faça login</Link>
        </p>

        <section className="cadastro-main__forms__campos">
          <input
            type="email"
            placeholder="E-mail"
            className="cadastro-main__forms__campos--texto"
          />

          <input
            type="text"
            placeholder="Nome"
            className="cadastro-main__forms__campos--texto"
          />

          <input
            type="text"
            placeholder="CEP"
            className="cadastro-main__forms__campos--cep"
          />

          <div className="cadastro-main__forms__campos--linha-dupla">
            <select
              defaultValue=""
              className="cadastro-main__forms__campos--select"
            >
              <option value="" disabled>
                Estado
              </option>
              {estados.map((uf) => (
                <option key={uf}>{uf}</option>
              ))}
            </select>

            <select
              defaultValue=""
              className="cadastro-main__forms__campos--select"
            >
              <option value="" disabled>
                Cidade
              </option>
              {cidades.map((cidade) => (
                <option key={cidade}>{cidade}</option>
              ))}
            </select>
          </div>

          <input
            type="password"
            placeholder="Senha"
            className="cadastro-main__forms__campos--senha"
          />

          <input
            type="password"
            placeholder="Confirmar senha"
            className="cadastro-main__forms__campos--senha"
          />
        </section>

        <section className="cadastro-main__forms__botoes">
          <Botao tipo="primary" label="Criar conta" onClick={handleClick} />
        </section>
      </section>

      <hr className="cadastro-main__linha-divisoria" />

      <p className="cadastro-main__nome-empresa">© 2025 - Lactino</p>
    </main>
  );
}

export default CadastroPage;
