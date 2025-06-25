import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import NotificacoesPainel from "./NotificacoesPainel";
import "../css/sino-notificacoes.css";

interface Notificacao {
  id: string;
  titulo: string;
  mensagem: string;
  tipo: string;
  data_criacao: string;
  lida: boolean;
}

interface SinoNotificacoesProps {
  notificacoes: Notificacao[];
}

export default function SinoNotificacoes({ notificacoes }: SinoNotificacoesProps) {
  const [painelVisivel, setPainelVisivel] = useState(false);
  const [notificacoesVisiveis, setNotificacoesVisiveis] = useState<Notificacao[]>([]);

  useEffect(() => {
    setNotificacoesVisiveis(notificacoes.filter((n) => !n.lida));
  }, [notificacoes]);

  const handleRemoverNotificacao = (id: string) => {
    setNotificacoesVisiveis(notificacoesVisiveis.filter((n) => n.id !== id));
  };

  const handleLimparTodas = () => {
    setNotificacoesVisiveis([]);
  };

  return (
    <div className="sino-notificacoes" onClick={() => setPainelVisivel(!painelVisivel)}>
      <FaBell className="sino-notificacoes__icone" />
      {notificacoesVisiveis.length > 0 && (
        <div className="sino-notificacoes__badge">
          {notificacoesVisiveis.length}
        </div>
      )}

      {painelVisivel && (
        <NotificacoesPainel
          notificacoes={notificacoesVisiveis}
          onRemoverNotificacao={handleRemoverNotificacao}
          onLimparTodas={handleLimparTodas}
        />
      )}
    </div>
  );
}