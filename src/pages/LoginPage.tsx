import Botao from "../components/Botao";
import Campo from "../components/Campo";
import '../css/login_page.css';

function LoginPage(): React.ReactElement {
    return(
        <main className="login-main">
            <h1 className="login-main__titulo">LACTINO</h1>
            <section className="login-main__forms">
                <h2 className="login-main__forms__descricao">Faça login ou crie uma conta</h2>
                <section className="login-main__forms__campos">
                    <input type="text" placeholder="E-mail" className="login-main__forms__campos--email"></input>
                    <input type="password" placeholder="Senha" className="login-main__forms__campos--senha"></input>
                </section>
                <section className="login-main__forms__botoes">
                    <Botao tipo="secondary" label="Cadastre-se"></Botao>
                    <Botao tipo="primary" label="Entrar"></Botao>
                </section>
            </section>
            <hr className="login-main__linha-divisoria"></hr>
            <section className="login-main__links">
            </section>
            <p className="login-main__nome-empresa">© 2025 - Lactino</p>
        </main>
    )
}

export default LoginPage;