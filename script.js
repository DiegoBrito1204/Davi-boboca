// 1. GATILHOS DINÂMICOS DE ANIMAÇÃO (Intersection Observer)
const sections = document.querySelectorAll('.dynamic-section');

const observerOptions = {
    root: document.querySelector('.slides-container'),
    threshold: 0.4 // Ativa quando 40% do slide está visível
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Disparar ações internas específicas do slide visível
            if (entry.target.id === 'slide2') {
                animarGraficoERecurso();
            }
        }
    });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));


// 2. MAPEAR BARRA DE PROGRESSO E CONTADOR AUTOMÁTICO (Slide 2)
function animarGraficoERecurso() {
    // Crescer as barras do gráfico dinamicamente
    const bars = document.querySelectorAll('.chart-bar');
    bars.forEach(bar => {
        bar.style.width = bar.getAttribute('data-progress');
    });

    // Contador de números em efeito máquina de somar
    const pibCounter = document.getElementById('counter-pib');
    const target = parseInt(pibCounter.getAttribute('data-target'));
    let current = 0;
    
    // Evita reiniciar se já contou
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


// 3. ATUALIZADOR DE INDICADOR DE SLIDES (Bolinhas do Menu)
const container = document.querySelector('.slides-container');
const dots = document.querySelectorAll('.dot');

container.addEventListener('scroll', () => {
    sections.forEach(slide => {
        const slideTop = slide.offsetTop;
        if (container.scrollTop >= slideTop - window.innerHeight / 2) {
            const currentId = slide.getAttribute('id');
            dots.forEach(dot => {
                dot.classList.remove('active');
                if (dot.getAttribute('href') === `#${currentId}`) {
                    dot.classList.add('active');
                }
            });
        }
    });
});


// 4. CALCULADORA DINÂMICA (Resposta ao Digitar - Evento Input)
const hectaresInput = document.getElementById('hectares');
hectaresInput.addEventListener('input', () => {
    const value = hectaresInput.value;
    const res = document.getElementById('resultado-calc');
    res.style.display = "block";

    if (!value || value <= 0) {
        res.style.color = "#d90429";
        res.innerText = "Esperando uma área válida...";
        return;
    }

    const economiaCalculada = value * 15000 * 12;
    res.style.color = "#1a1a1a";
    res.innerHTML = `💧 Algoritmo rodando: Economia de <strong>${economiaCalculada.toLocaleString('pt-BR')}L</strong> por ano!`;
});


// 5. QUIZ INTERATIVO COM MANIPULAÇÃO DE CLASSES
const quizButtons = document.querySelectorAll('.btn-canva-opt');
quizButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const isCorrect = e.target.getAttribute('data-correct') === "true";
        const res = document.getElementById('resultado-quiz');
        res.style.display = "block";

        if (isCorrect) {
            res.style.color = "#06d6a0";
            res.innerText = "🎯 Resposta exata! A tecnologia evita a expansão de terras desnecessárias.";
        } else {
            res.style.color = "#ff5e62";
            res.innerText = "❌ Incorreto. O segredo atual está em aumentar a produção por hectare.";
        }
    });
});


// 6. FORMULÁRIO COM FEEDBACK ASSÍNCRONO SIMULADO
document.getElementById('dynamic-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalText = btn.innerText;
    
    // Efeito dinâmico de carregamento de dados
    btn.innerText = "Processando...";
    btn.disabled = true;

    setTimeout(() => {
        alert("✨ Dados sincronizados com sucesso! Seus resultados foram registrados.");
        btn.innerText = originalText;
        btn.disabled = false;
        document.getElementById('email').value = "";
    }, 1500);
});