import "../css/botao.css";

interface BotaoProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    onClick?: () => void;
    tipo: 'primary' | 'secondary' | 'danger' | 'success';
    htmlType: 'submit' | 'button' | 'reset'

}

function Botao({ label, onClick, tipo, htmlType }: BotaoProps): React.ReactElement {
    return (
        <button className={`botao ${tipo}`} onClick={onClick} type={htmlType}>{label}</button>
    )
}

export default Botao;