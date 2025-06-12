// components/NotificacoesPainel.tsx
import React from "react";
import "../css/notificacoes-painel.css";
import { FaRegTimesCircle } from "react-icons/fa";
import { formatarData } from "../utils/formatter_utils";

interface Notificacao {
  id: string;
  nome: string;
  validade: string;
  diasParaVencer: number;
}

interface NotificacoesPainelProps {
  notificacoes: Notificacao[];
  onRemoverNotificacao: (id: string) => void;
  onLimparTodas: () => void;
}

export default function NotificacoesPainel({
  notificacoes,
  onRemoverNotificacao,
  onLimparTodas,
}: NotificacoesPainelProps) {
  return (
    <div className="notificacoes-painel">
      <div className="notificacoes-painel__header">
        <h2>Notificações</h2>
        <button className="notificacoes-painel__limpar" onClick={onLimparTodas}>
          Limpar
        </button>
      </div>
      <div className="notificacoes-painel__lista">
        {notificacoes.length === 0 ? (
          <p className="notificacoes-painel__vazio">Nenhuma notificação.</p>
        ) : (
          notificacoes.map((n) => (
            <div key={n.id} className="notificacoes-painel__card">
              <div>
                <h3>{n.nome}</h3>
                <p>Validade: {formatarData(n.validade)}</p>
                <p>
                  {n.diasParaVencer === 0
                    ? "VENCE HOJE!"
                    : n.diasParaVencer === 1
                    ? "Vence em 1 dia"
                    : `Vence em ${n.diasParaVencer} dias`}
                </p>
              </div>
              <FaRegTimesCircle
                className="notificacoes-painel__icone-remover"
                onClick={() => onRemoverNotificacao(n.id)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
