import { useEffect, useRef } from "react";
import "../PopUpVigilancia/PopupVigilancia.css";
import infoIcon from "../../../assets/FaInfoCircle.png";
import arrowIcon from "../../../assets/FaArrowRight.png";
import closeIcon from "../../../assets/Close.png";

interface Props {
  onClose: () => void;
}

export default function PopupVigilancia({ onClose }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickFora(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickFora);
    return () => {
      document.removeEventListener("mousedown", handleClickFora);
    };
  }, [onClose]);

  return (
    <div className="popup-overlay">
      <div className="popup-vigilancia" ref={modalRef}>
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
          onClick={() => window.open("https://wikisda.agricultura.gov.br/pt-br/Inspe%C3%A7%C3%A3o-Animal/Produto-Origem-Animal/manual_leite", "_blank")}
        >
          Acessar Sistema da Vigilância Sanitária
          <img src={arrowIcon} alt="Acessar" />
        </button>

        <p className="popup-vigilancia__suporte">
          Em caso de dúvidas, entre em contato com o suporte técnico
        </p>
        <button className="popup-vigilancia__fechar" onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>
      </div>
    </div>
  );
}