import Botao from "../../components/Botao";
import { Link, useNavigate } from "react-router-dom";   
import '../../css/login_page.css';
import { useState } from "react";
import { solicitarRedefinirSenhaApi } from "../../services/auth";

function RedefinirSenhaPage(): React.ReactElement {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<Record<string, any>>({})

    function handleReturn() {
        navigate('/login');
    }

    const handleChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    async function solicitarRedefinirSenha(data: Record<string, any>) {
            try {
                console.log(data);
                const res = await solicitarRedefinirSenhaApi(data.email);
                console.log(res);
                navigate('/nova-senha', { state: { email: formData.email } }); 
            } catch (error: any) {
                const message = error?.response?.data?.message || "E-mail inválido";
                console.log(data);
                console.error('Erro ao solicitar redefição de senha:', error)
            }
        }
    
        
        const handleSubmit: React.FormEventHandler = async (e) => {
            e.preventDefault();
            await solicitarRedefinirSenha(formData); 
        };

    return(
        <main className="login-main">
            <h1 className="login-main__titulo">LACTINO</h1>
            <form onSubmit={handleSubmit} className="login-main__forms">
                <h2 className="login-main__forms__descricao">Informe seu e-mail</h2>
                <section className="login-main__forms__campos">
                    <input
                    type="text"
                    placeholder="E-mail"
                    className={`login-main__forms__campos--email`}
                    value={formData['email'] || ""}
                    onChange={(e) => handleChange('email', e.target.value)}
                    />                    
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

export default RedefinirSenhaPage;