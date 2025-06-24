import { useState, useEffect } from "react";
import { Campo } from "./Campo";
import Botao from "./Botao";
import { ItemTransacao, CategoriaItem } from "../types/item-transacao";
import { buscarLaticinios, buscarLeites } from "../services/gestao_leite_laticinio";
import { buscarInsumos } from "../services/estoque";
import { ClipLoader } from "react-spinners";

interface ProdutosFormProps {
  onSalvar: (item: ItemTransacao) => void;
  onCancelar: () => void;
  itemEdicao?: ItemTransacao | null;
}

export default function ProdutosForm({
  onSalvar,
  onCancelar,
  itemEdicao,
}: ProdutosFormProps) {
  const [produto, setProduto] = useState<Partial<ItemTransacao>>({
    produtoId: undefined,
    categoria: undefined,
    quantidade: undefined,
    precoUnitario: undefined,
    unidadeDeMedida: undefined,
  });

  const [produtos, setProdutos] = useState<any[]>([]); // Lista de produtos filtrados
  const [produtosOriginais, setProdutosOriginais] = useState<any[]>([]); // Lista de todos os produtos
  const [nomeProdutoBusca, setNomeProdutoBusca] = useState(""); 
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<CategoriaItem | undefined>(undefined);
  const [loading, setLoading] = useState(false); // Estado para carregar produtos
  const [error, setError] = useState(""); // Para mensagens de erro
  const [quantidadeError, setQuantidadeError] = useState(""); // Mensagem de erro de quantidade
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Para desabilitar o botão

  useEffect(() => {
    async function carregarProdutos() {
      setLoading(true);
      try {
        let response;
        if (categoriaSelecionada === CategoriaItem.LEITE) {
          response = await buscarLeites();
        } else if (categoriaSelecionada === CategoriaItem.LATICINIO) {
          response = await buscarLaticinios();
        } else if (categoriaSelecionada === CategoriaItem.INSUMO) {
          response = await buscarInsumos();
        }

        if (response && Array.isArray(response.data)) {

          console.log("DADOS RECEBIDOS DA API:", response.data);
          setProdutos(response.data);
          setProdutosOriginais(response.data);
        } else {
        console.warn("A resposta da API não continha um array 'data':", response);
      }
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        setError("Erro ao carregar produtos.");
      } finally {
        setLoading(false);
      }
    }

    if (categoriaSelecionada) {
      carregarProdutos();
    }
  }, [categoriaSelecionada]);

  const handleProdutoChange = (produtoId: string) => {
    const selectedProduct = produtos.find(
      (produto) => produto.id === produtoId
    );
    if (selectedProduct) {
      setProduto({
        ...produto,
        produtoId: selectedProduct.id,
        categoria: selectedProduct.categoria,
        precoUnitario: selectedProduct.precoUnitario,
        unidadeDeMedida: selectedProduct.unidadeDeMedida,
      });
    }
  };

const handleBuscaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const textoBusca = e.target.value;
  // 1. Atualiza o estado do campo de texto, permitindo a digitação
  setNomeProdutoBusca(textoBusca);

  // 2. Tenta encontrar um produto que corresponda exatamente ao texto digitado (caso o usuário selecione na lista)
  const produtoSelecionado = produtosOriginais.find(
    (p) => p.nome.toLowerCase() === textoBusca.toLowerCase()
  );

  if (produtoSelecionado) {
    // Se encontrou, atualiza o formulário principal com os dados do produto
    setProduto((prev) => ({
      ...prev,
      produtoId: produtoSelecionado.id,
      precoUnitario: produtoSelecionado.precoUnitario,
      unidadeDeMedida: produtoSelecionado.unidadeDeMedida,
    }));
  }

  // 3. Filtra a lista de sugestões para o datalist
  const filteredForDatalist = produtosOriginais.filter((p) =>
    p.nome.toLowerCase().includes(textoBusca.toLowerCase())
  );
  setProdutos(filteredForDatalist);
};

  // Validação da quantidade
  const validateQuantidade = (quantidade: number) => {
    const selectedProduct = produtos.find((produto) => produto.id === produto.produtoId);
    if (selectedProduct && selectedProduct.quantidadeTotal < quantidade) {
      setQuantidadeError(`Quantidade excede o disponível em estoque: ${selectedProduct.quantidadeTotal}`);
      return false;
    }
    setQuantidadeError("");
    return true;
  };

  const handleSalvar = () => {
    if (
      produto.produtoId != null &&
      produto.categoria &&
      produto.quantidade != null &&
      produto.precoUnitario != null &&
      produto.unidadeDeMedida &&
      validateQuantidade(produto.quantidade)
    ) {
      setIsButtonDisabled(true); // Desabilita o botão enquanto salva
      onSalvar({
        id: itemEdicao?.id ?? Date.now(),
        transacaoId: 0,
        produtoId: produto.produtoId,
        categoria: produto.categoria,
        quantidade: produto.quantidade,
        precoUnitario: produto.precoUnitario,
        unidadeDeMedida: produto.unidadeDeMedida,
      });
    }
  };

  // Limpeza dos campos após o cancelamento
  const handleCancelar = () => {
    setProduto({
      produtoId: undefined,
      categoria: undefined,
      quantidade: undefined,
      precoUnitario: undefined,
      unidadeDeMedida: undefined,
    });
    setError("");
    setQuantidadeError("");
    onCancelar();
  };

  useEffect(() => {
  // Se estiver em modo de edição e as listas de produtos já foram carregadas
  if (itemEdicao && produtosOriginais.length > 0) {
    const produtoExistente = produtosOriginais.find(p => p.id === itemEdicao.produtoId);
    if (produtoExistente) {
      setNomeProdutoBusca(produtoExistente.nome); // Preenche o campo de busca com o nome
      setProduto(itemEdicao); // Preenche o resto do formulário
    }
  }
}, [itemEdicao, produtosOriginais]);

  return (
    <div className="formulario-produto">
      <h3 className="formulario-produto__titulo">
        {itemEdicao ? "Editar Produto" : "Adicionar Produto"}
      </h3>

      <div className="formulario-produto__campos">
        <Campo
          label="Categoria"
          type="select"
          options={Object.values(CategoriaItem).map((categoria) => ({
            label: categoria,
            value: categoria,
          }))}
          value={produto.categoria || ""}
          selectFunction={(e) => {
            const selectedCategoria = e.target.value as CategoriaItem;
            setCategoriaSelecionada(selectedCategoria);
            setProduto({
              ...produto,
              categoria: selectedCategoria,
              produtoId: undefined,
            });
          }}
        />

        <Campo
          label="Produto"
          type="text"
          value={nomeProdutoBusca}
          inputFunction={handleBuscaChange}
          placeHolder="Digite para buscar o produto"
          list="produtos-lista"
        />
        <datalist id="produtos-lista">
          {produtos.map((produto) => (
            <option key={produto.id} value={produto.nome} />
          ))}
        </datalist>

        {quantidadeError && <p className="error-message">{quantidadeError}</p>}

        <Campo
          label="Preço Unitário"
          type="number"
          value={produto.precoUnitario || ""}
          inputFunction={(e) =>
            setProduto((prev) => ({
              ...prev,
              precoUnitario: parseFloat(e.target.value),
            }))
          }
        />

        <Campo
          label="Unidade de Medida"
          type="text"
          value={produto.unidadeDeMedida || ""}
          inputFunction={(e) =>
            setProduto((prev) => ({
              ...prev,
              unidadeDeMedida: e.target.value,
            }))
          }
        />

        <Campo
          label="Quantidade"
          type="number"
          value={produto.quantidade || ""}
          inputFunction={(e) =>
            setProduto((prev) => ({
              ...prev,
              quantidade: parseFloat(e.target.value),
            }))
          }
        />
      </div>

      {loading && (
        <div className="loading-container">
          <ClipLoader size={50} color="#123abc" loading={loading} />
        </div>
      )}

      {error && <p className="error-message">{error}</p>}

      <div className="formulario-produto__botoes">
        <Botao
          label="Cancelar"
          tipo="secondary"
          htmlType="button"
          onClick={handleCancelar}
        />
        <Botao
          label={itemEdicao ? "Confirmar Edição" : "Confirmar Produto"}
          tipo={itemEdicao ? "success" : "primary"}
          htmlType="button"
          onClick={handleSalvar}
          disabled={isButtonDisabled || loading} // Desabilita o botão durante o carregamento ou salvamento
        />
      </div>
    </div>
  );
}
