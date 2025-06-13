import React, { useEffect, useState } from "react";
import SinoNotificacoes from "./SinoNotificacoes";

export default function MockNotificacoes() {
  const [notificacoesMock, setNotificacoesMock] = useState<any[]>([]);

  useEffect(() => {
    // Simula um mock de notificações que o backend retornaria
    const mock = [
      {
        id: "1",
        titulo: "Insumo abaixo do estoque mínimo",
        mensagem: "A Ração Tipo A está com apenas 2kg, abaixo do mínimo de 5kg.",
        tipo: "INSUMO",
        referencia_id: 7,
        referencia_tipo: "INSUMO",
        usuario_id: 1,
        data_criacao: new Date().toISOString(),
        lida: false,
      },
      {
        id: "2",
        titulo: "Leite vencendo em 1 dia",
        mensagem: "O lote 123 de Leite Integral vence amanhã.",
        tipo: "LEITE",
        referencia_id: 15,
        referencia_tipo: "LEITE",
        usuario_id: 1,
        data_criacao: new Date().toISOString(),
        lida: false,
      },
      {
        id: "3",
        titulo: "Laticínio prestes a vencer",
        mensagem: "O lote de Queijo Minas vence em 2 dias.",
        tipo: "LATICINIO",
        referencia_id: 33,
        referencia_tipo: "LATICINIO",
        usuario_id: 1,
        data_criacao: new Date().toISOString(),
        lida: false,
      },
    ];

    setNotificacoesMock(mock);
  }, []);

  return (
    <div>
    </div>
  );
}
