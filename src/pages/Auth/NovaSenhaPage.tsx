import Botao from "../../components/Botao";
import { Link, useLocation, useNavigate } from "react-router-dom";   
import '../../css/login_page.css';
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { redefinirSenhaApi } from "../../services/auth";

function NovaSenhaPage(): React.ReactElement {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<Record<string, any>>({})
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const email = location.state?.email

    function handleReturn() {
    navigate('/redefinir-senha');
    }

    const handleChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    async function redefinirSenha(req: Record<string, any>) {
            try {
                const data = {
                    email,
                    codigo: formData.codigo,
                    novaSenha: formData.senha,
                };
                console.log(data);
                const res = await redefinirSenhaApi(data);
                console.log(res);
                navigate("/login");
            } catch (error: any) {
                const message = error?.response?.data?.message || "E-mail inválido";
                console.log(req);
                console.error('Erro ao solicitar redefição de senha:', error)
            }
        }
    
        
        const handleSubmit: React.FormEventHandler = async (e) => {
            e.preventDefault();
            await redefinirSenha(formData);
        };

    return(
        <main className="login-main">
            <h1 className="login-main__titulo">LACTINO</h1>
            <form onSubmit={handleSubmit} className="login-main__forms">
                <h2 className="login-main__forms__descricao">Informe o código e sua nova senha</h2>
                <section className="login-main__forms__campos">
                    <input
                    type="text"
                    placeholder="Código"
                    className={`login-main__forms__campos--email`}
                    value={formData['codigo'] || ""}
                    onChange={(e) => handleChange('codigo', e.target.value)}
                    />    
                    <div className="login-main__forms__campos--senha-wrapper">
                    <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Nova senha"
                    className={`login-main__forms__campos--senha`}
                    value={formData.senha || ""}
                    onChange={e => handleChange('senha', e.target.value)}
                    />
                    <button
                    type="button"
                    className="toggle-password-button"
                    onClick={() => setShowPassword(v => !v)}
                    aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                    >
                    {showPassword ? <AiFillEye size={20} /> : <AiFillEyeInvisible size={20} />}
                    </button>
                    </div>                
                </section>
                <section className="login-main__forms__botoes">
                    <Botao tipo="secondary" label="Retornar" onClick={handleReturn} htmlType="button"></Botao>
                    <Botao tipo="primary" label="Enviar" htmlType="submit"></Botao>
                </section>
            </form>
            <hr className="login-main__linha-divisoria"></hr>
            <section className="login-main__links">
            </section>
            <p className="login-main__nome-empresa">© 2025 - Lactino</p>
        </main>
    )
}

export default NovaSenhaPage;