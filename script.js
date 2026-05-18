// 1. MONITORAMENTO DE SEÇÕES (Intersection Observer para Rolagem)
const sections = document.querySelectorAll('.dynamic-section');

const observerOptions = {
    root: null, // Janela do navegador
    threshold: 0.2
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Ativa funções do Bloco de Dados Econômicos
            if (entry.target.id === 'producao') {
                animarElementosProducao();
            }
        }
    });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));


// 2. COMPORTAMENTO DOS COMPONENTES VISUAIS DA SEÇÃO 1
function animarElementosProducao() {
    // Alarga barra de progresso do gráfico estrutural
    const bar = document.querySelector('.chart-bar');
    if(bar) {
        bar.style.width = bar.getAttribute('data-progress');
    }

    // Máquina de somar numérica (0% a 25%)
    const pibCounter = document.getElementById('counter-pib');
    const target = parseInt(pibCounter.getAttribute('data-target'));
    let current = 0;
    
    if(pibCounter.innerText !== "0") return;

    const interval = setInterval(() => {
        if (current < target) {
            current++;
            pibCounter.innerText = current;
        } else {
            clearInterval(interval);
            pibCounter.innerText = target + "%";
        }
    }, 40);
}


// 3. DESAFIO COMPLEMENTAR: CALCULADORA HÍDRICA DINÂMICA
const hectaresInput = document.getElementById('hectares');
hectaresInput.addEventListener('input', () => {
    const value = hectaresInput.value;
    const res = document.getElementById('resultado-calc');
    res.style.display = "block";

    if (!value || value <= 0) {
        res.style.color = "#e63946";
        res.innerText = "Aguardando um tamanho em hectares...";
        return;
    }

    // Regra: 15.000 litros por hectare ao mês salvos
    const economiaCalculada = value * 15000 * 12;
    res.style.color = "#1a1a1a";
    res.innerHTML = `💧 <strong>${economiaCalculada.toLocaleString('pt-BR')} Litros</strong> poupados anualmente via sensores inteligentes!`;
});


// 4. DESAFIO COMPLEMENTAR: QUIZ DE RESPOSTA IMEDIATA
const quizButtons = document.querySelectorAll('.btn-canva-opt');
quizButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const isCorrect = e.target.getAttribute('data-correct') === "true";
        const res = document.getElementById('resultado-quiz');
        res.style.display = "block";

        if (isCorrect) {
            res.style.color = "#006400";
            res.innerText = "🎯 Certíssimo! A rotação preserva o solo e quebra o ciclo de pragas.";
        } else {
            res.style.color = "#e63946";
            res.innerText = "❌ Incorreto. Ela é uma das bases mais baratas e eficazes da sustentabilidade.";
        }
    });
});


// 5. MENSAGEM FINAL / FORMULÁRIO DE CONSCIENTIZAÇÃO
document.getElementById('dynamic-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const btn = e.target.querySelector('button');
    
    btn.innerText = "Processando Informações...";
    btn.disabled = true;

    setTimeout(() => {
        alert(`Obrigado pela participação, ${username}! Seu e-mail foi cadastrado no radar sustentável.`);
        btn.innerText = "Enviar Mensagem";
        btn.disabled = false;
        document.getElementById('username').value = "";
        document.getElementById('email').value = "";
    }, 1200);
});