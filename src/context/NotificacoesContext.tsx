import React, { createContext, useContext, useState } from "react";

interface Produto {
  id: string;
  nome: string;
  validade: string;
}

interface NotificacoesContextProps {
  produtosAVencer: Produto[];
  setProdutosAVencer: React.Dispatch<React.SetStateAction<Produto[]>>;
}

const NotificacoesContext = createContext<NotificacoesContextProps | undefined>(undefined);

export const NotificacoesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [produtosAVencer, setProdutosAVencer] = useState<Produto[]>([]);

  return (
    <NotificacoesContext.Provider value={{ produtosAVencer, setProdutosAVencer }}>
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