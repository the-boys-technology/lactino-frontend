import "../PopUpVigilancia/PopupVigilancia.css";
import infoIcon from "../../../assets/FaInfoCircle.png";
import arrowIcon from "../../../assets/FaArrowRight.png";

interface Props {
  onClose: () => void;
}

export default function PopupVigilancia({ onClose }: Props) {
  return (
    <div className="popup-overlay">
      <div className="popup-vigilancia">
        <h2 className="popup-vigilancia__titulo">Direcionamento para a Vigilância Sanitária</h2>
        <p className="popup-vigilancia__subtitulo">
          É responsabilidade do produtor garantir que os dados estejam atualizados e corretos
        </p>

        <div className="popup-vigilancia__info-card">
          <img src={infoIcon} alt="Info" className="popup-vigilancia__icon" />
          <p className="popup-vigilancia__mensagem">
            Para atender às exigências legais de rastreabilidade e segurança sanitária,
            disponibilizamos um link para o sistema oficial da Vigilância Sanitária.
          </p>
        </div>

        <button
          className="popup-vigilancia__botao"
          onClick={() => window.open("https://sistema.vigilancia.gov.br", "_blank")}
        >
          Acessar Sistema da Vigilância Sanitária
          <img src={arrowIcon} alt="Acessar" />
        </button>

        <p className="popup-vigilancia__suporte">
          Em caso de dúvidas, entre em contato com o suporte técnico
        </p>
        <button className="popup-vigilancia__fechar" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}
