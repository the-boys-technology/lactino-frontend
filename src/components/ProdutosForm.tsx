import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { Campo } from "./Campo";
import Botao from "./Botao";
import { ItemTransacao, CategoriaItem } from "../types/item-transacao";
import { buscarLaticinios, buscarLeites } from "../services/gestao_leite_laticinio";
import { buscarInsumos } from "../services/estoque";

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
  const [produto, setProduto] = useState<Partial<ItemTransacao>>({});
  const [produtos, setProdutos] = useState<any[]>([]);
  const [produtosOriginais, setProdutosOriginais] = useState<any[]>([]);
  const [nomeProdutoBusca, setNomeProdutoBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<CategoriaItem | undefined>();
  const [estoqueDisponivel, setEstoqueDisponivel] = useState<number | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    // "Travas" para o modo de edição dos campos
    const [isPrecoAutomatico, setIsPrecoAutomatico] = useState(false);
    const [isUnidadeAutomatica, setIsUnidadeAutomatica] = useState(false);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [quantidadeError, setQuantidadeError] = useState("");

    useEffect(() => {
      async function carregarProdutos() {
        if (!categoriaSelecionada) return;
        setLoading(true);
        setError("");
        setProdutosOriginais([]);
        setProdutos([]);
        try {
          let response;
          if (categoriaSelecionada === CategoriaItem.LEITE) response = await buscarLeites(0, 1000);
          else if (categoriaSelecionada === CategoriaItem.LATICINIO) response = await buscarLaticinios(0, 1000);
          else if (categoriaSelecionada === CategoriaItem.INSUMO) response = await buscarInsumos();
  
          if (response && response.data && Array.isArray(response.data.content)) {
            const listaDaApi = response.data.content;
            const produtosPadronizados = listaDaApi.map((p: any) => ({
              id: p.id,
              nome: p.nome || p.tipoProduto,
              unidadeDeMedida: p.unidadeMedida, // Só existe em Insumo, será undefined para outros
              preco: p.preco, // Só existe em Insumo
              quantidadeTotal: p.quantidadeTotal || p.quantidadeProduzida
            }));
            setProdutosOriginais(produtosPadronizados);
            setProdutos(produtosPadronizados);
          }
        } catch (error) {
          console.error("Erro ao carregar produtos:", error);
          setError("Erro ao carregar produtos.");
        } finally {
          setLoading(false);
        }
      }
      carregarProdutos();
    }, [categoriaSelecionada]);

  useEffect(() => {
    if (itemEdicao) {
        setCategoriaSelecionada(itemEdicao.categoria);
        setNomeProdutoBusca(itemEdicao.nome || ""); // Supondo que itemEdicao tenha nome
        setProduto(itemEdicao);
    }
  }, [itemEdicao]);

  const handleBuscaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const textoBusca = e.target.value;
    setNomeProdutoBusca(textoBusca);
    const produtoSelecionado = produtosOriginais.find(p => p.nome?.toLowerCase() === textoBusca.toLowerCase());

    if (produtoSelecionado) {
      setProduto(prev => ({
        ...prev,
        produtoId: produtoSelecionado.id,
        precoUnitario: produtoSelecionado.preco,
        unidadeDeMedida: produtoSelecionado.unidadeDeMedida,
      }));
      setEstoqueDisponivel(produtoSelecionado.quantidadeTotal);
      // Define as "travas" de edição
      setIsPrecoAutomatico(produtoSelecionado.preco != null);
      setIsUnidadeAutomatica(produtoSelecionado.unidadeDeMedida != null);
    } else {
      setProduto(prev => ({ 
        categoria: prev.categoria, 
        produtoId: undefined, 
        precoUnitario: undefined, 
        unidadeDeMedida: undefined,
        quantidade: undefined,
      }));
      setEstoqueDisponivel(null);
      // Libera as "travas"
      setIsPrecoAutomatico(false);
      setIsUnidadeAutomatica(false);
    }

    const filtered = produtosOriginais.filter(p => p.nome?.toLowerCase().includes(textoBusca.toLowerCase()));
    setProdutos(filtered);
  };
  
  const handleGenericChange = (campo: keyof ItemTransacao, valor: any) => {
    setProduto(prev => ({ ...prev, [campo]: valor }));
  };

  const validateQuantidade = (quantidade: number) => {
    if (produto.produtoId === undefined || estoqueDisponivel === null) return true;
    if (estoqueDisponivel < quantidade) {
      setQuantidadeError(`Quantidade excede o estoque: ${estoqueDisponivel}`);
      return false;
    }
    setQuantidadeError("");
    return true;
  };

  const handleSalvar = () => {
    // Validações
    if (!produto.produtoId || !produto.categoria || !produto.quantidade || !produto.precoUnitario || !produto.unidadeDeMedida) {
      toast.warn("Todos os campos do produto devem ser preenchidos.");
      return;
    }
    onSalvar(produto as ItemTransacao);
  };

  const handleCancelar = () => {
    onCancelar();
  };

  const produtoFoiSelecionado = !!produto.produtoId;
  const isPrecoReadOnly = produtoFoiSelecionado && produto.precoUnitario != null;
  const isUnidadeReadOnly = produtoFoiSelecionado && produto.unidadeDeMedida != null;

  console.log("Status dos campos:", { 
      produtoSelecionado: produtoFoiSelecionado, 
      isPrecoReadOnly, 
      isUnidadeReadOnly, 
      preco: produto.precoUnitario,
      unidade: produto.unidadeDeMedida
  });

  return (
    <div className="formulario-produto">
      <h3 className="formulario-produto__titulo">{itemEdicao ? "Editar Produto" : "Adicionar Produto"}</h3>
      
      <div className="formulario-produto__campos">
        <div className="formulario-produto__coluna">
          <Campo label="Categoria" type="select" disabled={!!itemEdicao}
            options={Object.values(CategoriaItem).map(c => ({ label: c, value: c }))} value={categoriaSelecionada || ""}
            selectFunction={(e) => {
              setCategoriaSelecionada(e.target.value as CategoriaItem);
              setNomeProdutoBusca("");
              setProduto({ categoria: e.target.value as CategoriaItem });
              setEstoqueDisponivel(null);
              setIsPrecoAutomatico(false);
              setIsUnidadeAutomatica(false);
            }}
          />
          <Campo label="Produto" type="text" disabled={!categoriaSelecionada || loading} value={nomeProdutoBusca}
            inputFunction={handleBuscaChange} placeHolder={categoriaSelecionada ? "Digite para buscar" : "Selecione uma categoria"} list="produtos-lista" />
          <datalist id="produtos-lista">{produtos.map(p => <option key={p.id} value={p.nome} />)}</datalist>
        </div>
        <div className="formulario-produto__coluna">
          <Campo
            label="Preço Unitário"
            type="number"
            readOnly={isPrecoAutomatico}
            value={produto.precoUnitario || ""}
            placeHolder={isPrecoAutomatico ? "Automático" : "Digite o preço"}
            inputFunction={(e) => {
              if (!isPrecoAutomatico) {
                const val = parseFloat(e.target.value);
                handleGenericChange('precoUnitario', isNaN(val) ? undefined : val);
              }
            }}
          />
          <Campo
            label="Unidade de Medida"
            type="text"
            readOnly={isUnidadeAutomatica}
            value={produto.unidadeDeMedida || ""}
            placeHolder={isUnidadeAutomatica ? "Automático" : "Ex: kg, L, g"}
            inputFunction={(e) => {
              if(!isUnidadeAutomatica) {
                handleGenericChange('unidadeDeMedida', e.target.value);
              }
            }}
          />
          <Campo label="Quantidade" type="number" value={produto.quantidade || ""} placeHolder="0"
            inputFunction={(e) => {
              const qtd = parseFloat(e.target.value);
              handleGenericChange('quantidade', isNaN(qtd) ? undefined : qtd);
            }}
          />
          {estoqueDisponivel !== null && <p className="formulario-produto__info-estoque">Disponível: {estoqueDisponivel}</p>}
        </div>
      </div>

      {loading && <div className="loading-container"><ClipLoader size={35} color="#0F306E" /></div>}
      {error && <p className="error-message">{error}</p>}
  
      <div className="formulario-produto__botoes">
        <Botao label="Cancelar" tipo="secondary" onClick={handleCancelar} htmlType={"button"} />
        <Botao
          label={itemEdicao ? "Confirmar Edição" : "Confirmar Produto"}
          tipo="primary"
          onClick={handleSalvar}
          disabled={isButtonDisabled || loading || !!quantidadeError}
          htmlType={"button"}
        />
      </div>
    </div>
  );
}