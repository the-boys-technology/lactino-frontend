import React, { createContext, useContext, useState, useEffect } from "react";
import { Notificacao } from "../types/notificacao";
import { mockNotificacoes } from "../mocks/mockNotificacoes";

interface NotificacoesContextType {
  notificacoes: Notificacao[];
  setNotificacoes: React.Dispatch<React.SetStateAction<Notificacao[]>>;
}

const NotificacoesContext = createContext<NotificacoesContextType | undefined>(undefined);

export const NotificacoesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);

  // Para apresentação com o mock (Mudar depois)
  useEffect(() => {
    setNotificacoes(mockNotificacoes);
  }, []);

  return (
    <NotificacoesContext.Provider value={{ notificacoes, setNotificacoes }}>
      {children}
    </NotificacoesContext.Provider>
  );
};

export const useNotificacoes = () => {
  const context = useContext(NotificacoesContext);
  if (!context) {
    throw new Error("useNotificacoes deve ser usado dentro do NotificacoesProvider");
  }
  return context;
};
