class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    const cardapio = {
        cafe: { descricao: "Café", valor: 3.0 },
        chantily: { descricao: "Chantily (extra do Café)", valor: 1.5 },
        suco: { descricao: "Suco Natural", valor: 6.2 },
        sanduiche: { descricao: "Sanduíche", valor: 6.5 },
        queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.0 },
        salgado: { descricao: "Salgado", valor: 7.25 },
        combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.5 },
        combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.5 },
      };

    const itensPrincipais = new Set(["cafe", "sanduiche","suco","salgado"]);
    let valorTotal = 0;
    let possuiItemPrincipal = false;

    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }
    for (const item of itens) {
      const [codigo, quantidade] = item.split(",");

      if (!(codigo in cardapio)) {
        return "Item inválido!";
      }

      if (parseInt(quantidade) <= 0) {
        return "Quantidade inválida!";
      }

      valorTotal += cardapio[codigo].valor * parseInt(quantidade);

      if (itensPrincipais.has(codigo)) {
        possuiItemPrincipal = true;
      }
    }

    if (!possuiItemPrincipal) {
      return "Item extra não pode ser pedido sem o principal";
    }

    if (
      itens.some(
        (item) =>
          item.includes("chantily") &&
          !itens.some((subItem) => subItem.includes("cafe"))
      )
    ) {
      return "Item extra não pode ser pedido sem o principal";
    }

    if (
      itens.some(
        (item) =>
          item.includes("queijo") &&
          !itens.some((subItem) => subItem.includes("sanduiche"))
      )
    ) {
      return "Item extra não pode ser pedido sem o principal";
    }

    if (metodoDePagamento === "dinheiro") {
      valorTotal *= 0.95;
    } else if (metodoDePagamento === "credito") {
      valorTotal *= 1.03;
    } else if (metodoDePagamento !== "debito") {
      return "Forma de pagamento inválida!";
    }
    valorTotal = parseFloat(valorTotal.toFixed(2)); 
    return "R$ " + valorTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  }
}

export { CaixaDaLanchonete };
