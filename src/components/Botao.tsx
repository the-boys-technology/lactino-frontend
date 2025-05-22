import "../css/botao.css";

interface BotaoProps {
    label: string;
    onClick?: () => void;
    tipo: 'primary' | 'secondary' | 'danger' | 'success';

}

function Botao({ label, onClick, tipo }: BotaoProps): React.ReactElement {
    return (
        <button className={`botao ${tipo}`} onClick={onClick}>{label}</button>
    )
}

export default Botao;