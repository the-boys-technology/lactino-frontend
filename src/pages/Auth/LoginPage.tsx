import Botao from "../../components/Botao";
import { Link, useNavigate } from "react-router-dom";   
import '../../css/login_page.css';
import { useState } from "react";
import { fazerLogin } from "../../services/auth";

function LoginPage(): React.ReactElement {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<Record<string, any>>({})

    function handleSignUp() {
    navigate('/cadastro');
    }

    const handleChange = (name: string, value: string) =>
    setFormData(prev => ({ ...prev, [name]: value }));

    async function realizarLogin(data: Record<string, any>) {
            try {
                console.log(data);
                const res = await fazerLogin(data);
                console.log(res);
                sessionStorage.setItem('access_token', res.data.token);
                navigate("/");
            } catch (error) {
                console.log(data);
                console.error('Erro ao fazer login:', error)
            }
            
          }
    
      const handleSubmit: React.FormEventHandler = async (e) => {
        e.preventDefault();
        await realizarLogin(formData);          
      };

    return(
        <main className="login-main">
            <h1 className="login-main__titulo">LACTINO</h1>
            <form onSubmit={handleSubmit} className="login-main__forms">
                <h2 className="login-main__forms__descricao">Faça login ou crie uma conta</h2>
                <section className="login-main__forms__campos">
                    <input type="text" placeholder="E-mail" className="login-main__forms__campos--email" value={formData['email'] || ""} onChange={(e) => handleChange('email', e.target.value)}></input>
                    <input type="password" placeholder="Senha" className="login-main__forms__campos--senha" value={formData['senha'] || ""}onChange={(e) => handleChange('senha', e.target.value)}></input>
                </section>
                <section className="login-main__forms__botoes">
                    <Botao tipo="secondary" label="Cadastre-se" onClick={handleSignUp} htmlType="button"></Botao>
                    <Botao tipo="primary" label="Entrar" htmlType="submit"></Botao>
                </section>
            </form>
            <hr className="login-main__linha-divisoria"></hr>
            <section className="login-main__links">
            </section>
            <p className="login-main__nome-empresa">© 2025 - Lactino</p>
        </main>
    )
}

export default LoginPage;