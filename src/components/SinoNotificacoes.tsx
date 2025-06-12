import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import NotificacoesPainel from "./NotificacoesPainel";
import "../css/sino-notificacoes.css"; // importa o novo CSS

interface Produto {
  id: string;
  nome: string;
  validade: string;
}

interface SinoNotificacoesProps {
  produtos: Produto[];
}

export default function SinoNotificacoes({ produtos }: SinoNotificacoesProps) {
  const [painelVisivel, setPainelVisivel] = useState(false);
  const [notificacoes, setNotificacoes] = useState<any[]>([]);

  useEffect(() => {
    const hoje = new Date();

    const novasNotificacoes = produtos
      .filter((item) => item.validade)
      .map((item) => {
        const validade = new Date(item.validade);
        const diffTime = validade.getTime() - hoje.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return {
          id: item.id,
          nome: item.nome,
          validade: item.validade,
          diasParaVencer: diffDays,
        };
      })
      .filter((n) => n.diasParaVencer >= 0 && n.diasParaVencer <= 2);

    setNotificacoes(novasNotificacoes);
  }, [produtos]);

  const handleRemoverNotificacao = (id: string) => {
    setNotificacoes(notificacoes.filter((n) => n.id !== id));
  };

  const handleLimparTodas = () => {
    setNotificacoes([]);
  };

  return (
    <div className="sino-notificacoes" onClick={() => setPainelVisivel(!painelVisivel)}>
      <FaBell className="sino-notificacoes__icone" />
      {notificacoes.length > 0 && (
        <div className="sino-notificacoes__badge">
          {notificacoes.length}
        </div>
      )}

      {painelVisivel && (
        <NotificacoesPainel
          notificacoes={notificacoes}
          onRemoverNotificacao={handleRemoverNotificacao}
          onLimparTodas={handleLimparTodas}
        />
      )}
    </div>
  );
}
