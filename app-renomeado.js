document.addEventListener("DOMContentLoaded", () => {
    const campoTexto = document.getElementById("entradaTexto");
    const botaoProcessar = document.getElementById("botaoExtrair");
    const listaResultado = document.getElementById("listaPalavras");

    function obterPalavrasChave(texto) {
        return texto
            .toLowerCase()
            .match(/\b\w+\b/g)
            .filter(palavra => palavra.length > 3)
            .filter((item, index, arr) => arr.indexOf(item) === index);
    }

    botaoProcessar.addEventListener("click", () => {
        listaResultado.innerHTML = "";
        const palavras = obterPalavrasChave(campoTexto.value);
        
        if (palavras.length === 0) {
            listaResultado.innerHTML = "<li>Nenhuma palavra encontrada.</li>";
            return;
        }
        
        palavras.forEach(p => {
            const item = document.createElement("li");
            item.textContent = p;
            listaResultado.appendChild(item);
        });
    });
});