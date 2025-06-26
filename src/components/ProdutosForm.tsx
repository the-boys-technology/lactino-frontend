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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [quantidadeError, setQuantidadeError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    async function carregarProdutos() {
      if (!categoriaSelecionada) return;
      setLoading(true);
      setError("");
      try {
        let response;
        if (categoriaSelecionada === CategoriaItem.LEITE) response = await buscarLeites();
        else if (categoriaSelecionada === CategoriaItem.LATICINIO) response = await buscarLaticinios();
        else if (categoriaSelecionada === CategoriaItem.INSUMO) response = await buscarInsumos();

        if (response && response.data && Array.isArray(response.data.content)) {
          setProdutosOriginais(response.data.content);
          setProdutos(response.data.content);
        } else {
          setProdutosOriginais([]);
          setProdutos([]);
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
    if (itemEdicao && !categoriaSelecionada) {
      setCategoriaSelecionada(itemEdicao.categoria);
    }
    if (itemEdicao && produtosOriginais.length > 0) {
      const produtoExistente = produtosOriginais.find(p => p.id === itemEdicao.produtoId);
      if (produtoExistente) {
        setNomeProdutoBusca(produtoExistente.nome);
        setProduto(itemEdicao);
        setEstoqueDisponivel(produtoExistente.quantidadeTotal);
      }
    }
  }, [itemEdicao, produtosOriginais]);

  const handleBuscaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const textoBusca = e.target.value;
    setNomeProdutoBusca(textoBusca);
    const produtoSelecionado = produtosOriginais.find(p => p.nome.toLowerCase() === textoBusca.toLowerCase());

    if (produtoSelecionado) {
      setProduto(prev => ({
        ...prev,
        produtoId: produtoSelecionado.id,
        precoUnitario: produtoSelecionado.preco,
        unidadeDeMedida: produtoSelecionado.unidadeMedida,
      }));
      setEstoqueDisponivel(produtoSelecionado.quantidadeTotal);
    } else {
      setProduto(prev => ({ ...prev, produtoId: undefined, precoUnitario: undefined, unidadeDeMedida: undefined }));
      setEstoqueDisponivel(null);
    }

    const filtered = produtosOriginais.filter(p => p.nome.toLowerCase().includes(textoBusca.toLowerCase()));
    setProdutos(filtered);
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
    if (
      produto.produtoId != null &&
      produto.categoria &&
      produto.quantidade != null &&
      produto.precoUnitario != null &&
      produto.unidadeDeMedida &&
      validateQuantidade(produto.quantidade)
    ) {
      setIsButtonDisabled(true);
      onSalvar({
        id: itemEdicao?.id ?? Date.now(),
        transacaoId: 0,
        produtoId: produto.produtoId,
        categoria: produto.categoria,
        quantidade: produto.quantidade,
        precoUnitario: produto.precoUnitario,
        unidadeDeMedida: produto.unidadeDeMedida,
      });
    } else {
        toast.warn("Por favor, preencha todos os campos do produto corretamente.");
    }
  };

  const handleCancelar = () => {
    onCancelar();
  };

  return (
    <div className="formulario-produto">
      <h3 className="formulario-produto__titulo">{itemEdicao ? "Editar Produto" : "Adicionar Produto"}</h3>
      
      <div className="formulario-produto__campos">
        
        <div className="formulario-produto__coluna">
          <Campo
            label="Categoria"
            type="select"
            disabled={!!itemEdicao}
            options={Object.values(CategoriaItem).map(c => ({ label: c, value: c }))}
            value={categoriaSelecionada || ""}
            selectFunction={(e) => {
              setCategoriaSelecionada(e.target.value as CategoriaItem);
              setNomeProdutoBusca("");
              setProduto({ categoria: e.target.value as CategoriaItem });
              setEstoqueDisponivel(null);
            }}
          />
          <Campo
            label="Produto"
            type="text"
            disabled={!categoriaSelecionada || loading}
            value={nomeProdutoBusca}
            inputFunction={handleBuscaChange}
            placeHolder={categoriaSelecionada ? "Digite para buscar" : "Selecione uma categoria"}
            list="produtos-lista"
          />
          <datalist id="produtos-lista">
            {produtos.map(p => <option key={p.id} value={p.nome} />)}
          </datalist>
        </div>
  
        <div className="formulario-produto__coluna">
          <Campo
            label="Preço Unitário"
            type="text"
            readOnly
            value={produto.precoUnitario ? `R$ ${produto.precoUnitario.toFixed(2)}` : ""}
            placeHolder="Automático"
          />
          <Campo
            label="Unidade de Medida"
            type="text"
            readOnly
            value={produto.unidadeDeMedida || ""}
            placeHolder="Automático"
          />
          <Campo
            label="Quantidade"
            type="number"
            value={produto.quantidade || ""}
            placeHolder={`Ex: 10 (${produto.unidadeDeMedida || 'unid.'})`}
            inputFunction={(e) => {
              const qtd = parseFloat(e.target.value);
              setProduto(prev => ({ ...prev, quantidade: isNaN(qtd) ? undefined : qtd }));
              validateQuantidade(qtd);
            }}
          />
          {estoqueDisponivel !== null && (
            <p className="formulario-produto__info-estoque">
              Disponível: {estoqueDisponivel} {produto.unidadeDeMedida || ''}
            </p>
          )}
          {quantidadeError && <p className="error-message">{quantidadeError}</p>}
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