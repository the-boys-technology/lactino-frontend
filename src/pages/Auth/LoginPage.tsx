import Botao from "../../components/Botao";
import { Link, useNavigate } from "react-router-dom";   
import '../../css/login_page.css';
import { useState } from "react";
import { fazerLogin, verDados } from "../../services/auth";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

function LoginPage(): React.ReactElement {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<Record<string, any>>({})
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    const [hasError, setHasError] = useState<boolean>(false);


    function handleSignUp() {
    navigate('/cadastro');
    }

    const handleChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        setLoginError(null);
        setHasError(false);
    };

    async function realizarLogin(data: Record<string, any>) {
        try {
            console.log(data);
            const res = await fazerLogin(data);
            const token = res.data.token;
            sessionStorage.setItem('access_token', token);

            const userRes = await verDados();
            const { nome, email, cep, estado, cidade, fotoPerfil } = userRes.data;

            sessionStorage.setItem('nome', nome);
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('cep', cep);
            sessionStorage.setItem('estado', estado);
            sessionStorage.setItem('cidade', cidade);
            sessionStorage.setItem('fotoPerfil', fotoPerfil);

            navigate("/");
        } catch (error: any) {
            const message = error?.response?.data?.message || "Credenciais inválidas";
            console.log(data);
            console.error('Erro ao fazer login:', error)
            setLoginError(message);
            setHasError(true);
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
                    <input
                    type="text"
                    placeholder="E-mail"
                    className={`login-main__forms__campos--email ${hasError ? 'has-error' : ''}`}
                    value={formData['email'] || ""}
                    onChange={(e) => handleChange('email', e.target.value)}
                    />
                    <div className="login-main__forms__campos--senha-wrapper">
                        <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Senha"
                        className={`login-main__forms__campos--senha ${hasError ? 'has-error' : ''}`}
                        value={formData.senha || ""}
                        onChange={e => handleChange('senha', e.target.value)}
                        />
                        <button
                        type="button"
                        className="toggle-password-button"
                        onClick={() => setShowPassword(v => !v)}
                        aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                        >
                        {showPassword
                            ? <AiFillEye size={20} />
                            : <AiFillEyeInvisible size={20} />
                        }
                        </button>
                    </div>
                    {loginError && (<p className="login-error-message">{loginError}</p>)}
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