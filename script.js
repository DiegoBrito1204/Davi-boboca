document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Menu Responsivo Toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    // Fecha o menu ao clicar em qualquer link (útil para mobile)
    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });
    });

    // 2. Animação de Rolagem (Fade-in das seções)
    const secoes = document.querySelectorAll(".fade-in");
    
    const checarScroll = () => {
        const gatilho = window.innerHeight * 0.85;
        secoes.forEach(secao => {
            const topoSecao = secao.getBoundingClientRect().top;
            if (topoSecao < gatilho) {
                secao.classList.add("visible");
            }
        });
    };

    window.addEventListener("scroll", checarScroll);
    checarScroll(); // Executa uma vez no início caso haja elementos visíveis

    // 3. Lógica do Quiz Interativo
    const dadosQuiz = {
        pergunta: "Qual das seguintes tecnologias tem como objetivo direto diminuir drasticamente o desperdício de recursos hídricos no campo?",
        opcoes: [
            "Drones de mapeamento térmico",
            "Sistemas de irrigação inteligente por gotejamento",
            "Uso de painéis solares em tratores",
            "Compactação mecânica do solo"
        ],
        correta: 1 // Índice do array da resposta certa
    };

    const containerPergunta = document.getElementById("quiz-pergunta");
    const containerOpcoes = document.getElementById("quiz-opcoes");
    const containerResultado = document.getElementById("quiz-resultado");

    function carregarQuiz() {
        containerPergunta.textContent = dadosQuiz.pergunta;
        containerOpcoes.innerHTML = ""; // Limpa botões antigos

        dadosQuiz.opcoes.forEach((opcao, indice) => {
            const botao = document.createElement("button");
            botao.textContent = opcao;
            botao.addEventListener("click", () => verificarResposta(indice));
            containerOpcoes.appendChild(botao);
        });
    }

    function verificarResposta(indiceSelecionado) {
        if (indiceSelecionado === dadosQuiz.correta) {
            containerResultado.textContent = "CORRETO! A irrigação inteligente direciona a água na quantidade certa para a raiz, evitando desperdícios.";
            containerResultado.style.color = "var(--primary)";
        } else {
            containerResultado.textContent = "Ops, resposta incorreta! Tente analisar qual tecnologia foca puramente no uso da água.";
            containerResultado.style.color = "var(--alert)";
        }
    }

    carregarQuiz();

    // 4. Envio do Formulário de Contato (Simulação)
    const form = document.getElementById("form-contato");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Obrigado pelo seu envio! Juntos construímos um agronegócio mais forte e sustentável.");
        form.reset();
    });
});