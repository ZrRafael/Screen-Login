const uname = document.getElementById('uname');
const pass = document.getElementById('pass');
const btn = document.getElementById('loginBtn');
const errorMsg = document.getElementById('errorMsg');
const successMsg = document.getElementById('successMsg');
const btnContainer = document.querySelector('.login-btn-container');

let escapeCooldown = false; // Evita fuga em excesso na segunda lógica (mousemove)

// Função responsável por movimentar o botão
function moveButtonAway() {
    const isUsernameEmpty = uname.value.trim() === '';
    const isPasswordEmpty = pass.value.trim() === '';

    if (isUsernameEmpty || isPasswordEmpty) {
        // Mostrar mensagem de erro
        errorMsg.style.display = 'block';
        successMsg.style.display = 'none';

        // Definir área segura
        const containerWidth = btnContainer.offsetWidth;
        const containerHeight = btnContainer.offsetHeight;
        const buttonWidth = btn.offsetWidth;
        const buttonHeight = btn.offsetHeight;
        const margin = 10;

        const maxLeft = containerWidth - buttonWidth - margin;
        const minLeft = margin;

        const maxTop = containerHeight - buttonHeight - margin;
        const minTop = margin;

        // Gera posições aleatórias válidas
        const randomLeftPx = Math.floor(Math.random() * (maxLeft - minLeft + 1)) + minLeft;
        const randomTopPx = Math.floor(Math.random() * (maxTop - minTop + 1)) + minTop;

        // Aplica a movimentação
        btn.style.left = `${randomLeftPx}px`;
        btn.style.top = `${randomTopPx}px`;
        btn.style.transform = 'translate(0, 0)';
    } else {
        // Campos válidos: centraliza botão e mostra sucesso
        errorMsg.style.display = 'none';
        successMsg.style.display = 'block';
        btn.style.left = '50%';
        btn.style.top = '0px';
        btn.style.transform = 'translateX(-50%)';
    }
}

// Lógica 1: mouse se aproxima do botão
btn.addEventListener('mouseover', moveButtonAway);

// Lógica 2: mouse está exatamente sobre o botão → fuga com cooldown
btnContainer.addEventListener('mousemove', (e) => {
    const isUsernameEmpty = uname.value.trim() === '';
    const isPasswordEmpty = pass.value.trim() === '';

    if (isUsernameEmpty || isPasswordEmpty) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const btnRect = btn.getBoundingClientRect();

        const isCursorOnButton =
            mouseX >= btnRect.left &&
            mouseX <= btnRect.right &&
            mouseY >= btnRect.top &&
            mouseY <= btnRect.bottom;

        if (isCursorOnButton && !escapeCooldown) {
            moveButtonAway();
            escapeCooldown = true;
            setTimeout(() => {
                escapeCooldown = false;
            }, 100); // Cooldown reduzido = resposta rápida
        }
    }
});

// Atualiza comportamento conforme usuário digita
uname.addEventListener('input', checkFields);
pass.addEventListener('input', checkFields);

function checkFields() {
    const isUsernameEmpty = uname.value.trim() === '';
    const isPasswordEmpty = pass.value.trim() === '';

    if (!isUsernameEmpty && !isPasswordEmpty) {
        errorMsg.style.display = 'none';
        successMsg.style.display = 'block';
        btn.style.left = '50%';
        btn.style.top = '0px';
        btn.style.transform = 'translateX(-50%)';
    } else {
        successMsg.style.display = 'none';
    }
}

// Validação final no clique
btn.addEventListener('click', (e) => {
    e.preventDefault(); // Previne o envio do formulário
    const isUsernameEmpty = uname.value.trim() === '';
    const isPasswordEmpty = pass.value.trim() === '';

    if (isUsernameEmpty || isPasswordEmpty) {
        errorMsg.style.display = 'block';
        successMsg.style.display = 'none';
    } else {
        // Verifica as credenciais
        if (uname.value === '123' && pass.value === '123') {
            errorMsg.style.display = 'none';
            successMsg.style.display = 'block';
            
            // Marca o usuário como logado
            sessionStorage.setItem('loggedIn', 'true');
            
            // Redireciona para a tela inicial após um breve delay
            setTimeout(() => {
                window.location.href = 'tela_inicial.html';
            }, 1000);
        } else {
            errorMsg.textContent = 'Usuário ou senha incorretos';
            errorMsg.style.display = 'block';
            successMsg.style.display = 'none';
        }
    }
});
