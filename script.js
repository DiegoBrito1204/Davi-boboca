// Controle do Menu Mobile (Responsivo)
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Fechar menu ao clicar em qualquer link (Mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Lógica da Calculadora Hídrica
function calcularAgua() {
    const hectaresInput = document.getElementById('hectares').value;
    const resultado = document.getElementById('resultadoCalculo');
    
    if (hectaresInput > 0) {
        // Estimativa média: economia de 1.200.000 litros de água por hectare/ano com irrigação inteligente
        const economiaLitros = hectaresInput * 1200000;
        resultado.innerText = `Economia estimada de: ${economiaLitros.toLocaleString('pt-BR')} Litros de água por ano!`;
        resultado.style.color = "#000000";
    } else {
        resultado.innerText = "Por favor, insira um valor válido.";
        resultado.style.color = "red";
    }
}

// Lógica do Quiz de Sustentabilidade
function verificarQuiz(isCorrect) {
    const resultado = document.getElementById('resultadoQuiz');
    
    if (isCorrect) {
        resultado.innerText = "Correto! A irrigação inteligente monitora a umidade e evita desperdícios.";
        resultado.style.color = "#000000";
    } else {
        resultado.innerText = "Incorreto. Tente novamente!";
        resultado.style.color = "red";
    }
}