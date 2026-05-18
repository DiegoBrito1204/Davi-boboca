// Listener de Scroll para atualizar o indicador de Slides (Estilo Canva)
const container = document.querySelector('.slides-container');
const dots = document.querySelectorAll('.dot');
const slides = document.querySelectorAll('.slide');

container.addEventListener('scroll', () => {
    let currentSlide = "";
    
    slides.forEach(slide => {
        const slideTop = slide.offsetTop;
        if (container.scrollTop >= slideTop - window.innerHeight / 2) {
            currentSlide = slide.getAttribute('id');
        }
    });

    dots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('href') === `#${currentSlide}`) {
            dot.classList.add('active');
        }
    });
});

// Calculadora Hídrica Inteligente
function calcularEconomia() {
    const hectares = document.getElementById('hectares').value;
    const res = document.getElementById('resultado-calc');
    
    if(!hectares || hectares <= 0) {
        res.style.color = "#d90429";
        res.innerText = "Por favor, digite uma quantidade de hectares válida.";
        return;
    }
    
    const economiaAnual = hectares * 15000 * 12;
    res.style.color = "#1f3c30";
    res.innerHTML = `✨ Sensacional! Uma automação hídrica pouparia cerca de <strong>${economiaAnual.toLocaleString('pt-BR')}L</strong> de água por ano nessa área.`;
}

// Quiz Inteligente
function responderQuiz(isCorrect) {
    const res = document.getElementById('resultado-quiz');
    if (isCorrect) {
        res.style.color = "#1f3c30";
        res.innerHTML = "🎯 Exato! A tecnologia otimiza o uso do solo e evita a abertura de novas áreas nativas.";
    } else {
        res.style.color = "#d90429";
        res.innerHTML = "❌ Não exatamente. Com inteligência e dados, conseguimos expandir a safra sem desmatar.";
    }
}

// Cadastro Simulado 
function enviarFormulario(e) {
    e.preventDefault();
    alert("Inscrição efetuada com sucesso! Você receberá os slides completos por e-mail.");
    document.getElementById('email').value = "";
}