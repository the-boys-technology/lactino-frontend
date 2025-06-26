import React, { createContext, useContext, useState, useEffect } from "react";
import { Notificacao } from "../types/notificacao";

interface NotificacoesContextType {
  notificacoes: Notificacao[];
  setNotificacoes: React.Dispatch<React.SetStateAction<Notificacao[]>>;
}

const NotificacoesContext = createContext<NotificacoesContextType | undefined>(undefined);

export const NotificacoesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);

  useEffect(() => {
    setNotificacoes(notificacoes);
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
