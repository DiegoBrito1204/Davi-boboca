javascript// 1. ANIMAÇÕES DINÂMICAS AO ROLAR A TELA (Intersection Observer para Janela Geral)
const sections = document.querySelectorAll('.dynamic-section');

const observerOptions = {
    root: null, // Usa o scroll da janela global do navegador
    threshold: 0.2 // Dispara assim que 20% da seção aparece na tela
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Disparar o contador e gráfico do bloco de dados
            if (entry.target.id === 'economia') {
                animarGraficoERecurso();
            }
        }
    });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));


// 2. DISPARADORES VISUAIS DA SEÇÃO DE DADOS
function animarGraficoERecurso() {
    // Alarga as barras do gráfico de 0% para o valor final
    const bars = document.querySelectorAll('.chart-bar');
    bars.forEach(bar => {
        bar.style.width = bar.getAttribute('data-progress');
    });

    // Efeito numérico crescente (0 a 25)
    const pibCounter = document.getElementById('counter-pib');
    const target = parseInt(pibCounter.getAttribute('data-target'));
    let current = 0;
    
    if(pibCounter.innerText !== "0") return; // Impede que reinicie toda vez que passar o scroll

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


// 3. CALCULADORA INTERATIVA (Captura em Tempo Real ao digitar)
const hectaresInput = document.getElementById('hectares');
hectaresInput.addEventListener('input', () => {
    const value = hectaresInput.value;
    const res = document.getElementById('resultado-calc');
    res.style.display = "block";

    if (!value || value <= 0) {
        res.style.color = "#d90429";
        res.innerText = "Aguardando um tamanho válido...";
        return;
    }

    const economiaCalculada = value * 15000 * 12;
    res.style.color = "#1a1a1a";
    res.innerHTML = `💧 Resultado: Economia estimada de <strong>${economiaCalculada.toLocaleString('pt-BR')}L</strong> por ano!`;
});


// 4. LOGICA DO QUIZ DINÂMICO
const quizButtons = document.querySelectorAll('.btn-canva-opt');
quizButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const isCorrect = e.target.getAttribute('data-correct') === "true";
        const res = document.getElementById('resultado-quiz');
        res.style.display = "block";

        if (isCorrect) {
            res.style.color = "#006400";
            res.innerText = "🎯 Resposta exata! A tecnologia evita a expansão de terras desnecessárias.";
        } else {
            res.style.color = "#d90429";
            res.innerText = "❌ Incorreto. O segredo atual está em aumentar a produção por hectare.";
        }
    });
});


// 5. SUBMISSÃO DO FORMULÁRIO COM FEEDBACK
document.getElementById('dynamic-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.innerText = "Sincronizando...";
    btn.disabled = true;

    setTimeout(() => {
        alert("✨ Concluído! Seus dados de conscientização ecológica foram registrados.");
        btn.innerText = "Enviar Dados";
        btn.disabled = false;
        document.getElementById('email').value = "";
    }, 1200);
});
