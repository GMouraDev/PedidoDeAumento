const botao = document.querySelector('#neg');

let moveX = 0;
let moveY = 0;
let isMoving = false;

function moverBotao() {
    if (isMoving) return;
    
    isMoving = true;
    
    // Diferente comportamento para mobile e desktop
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Mobile: movimento mais intenso
        const intensidade = clickAttempts < 3 ? 1.5 : 1;
        moveX = (Math.random() * 500 - 250) * intensidade; 
        moveY = (Math.random() * 400 - 200) * intensidade;
        
        // Limite do movimento mobile
        const limite = clickAttempts < 3 ? 200 : 120;
        moveX = Math.max(-limite, Math.min(limite, moveX));
        moveY = Math.max(-limite/2, Math.min(limite/2, moveY));
    } else {
        // Desktop: movimento moderado
        const intensidadeDesktop = clickAttempts < 2 ? 1.2 : 0.8;
        moveX = (Math.random() * 800 - 400) * intensidadeDesktop; 
        moveY = (Math.random() * 600 - 300) * intensidadeDesktop;
        
        const limiteDesktop = clickAttempts < 2 ? 250 : 150;
        moveX = Math.max(-limiteDesktop, Math.min(limiteDesktop, moveX));
        moveY = Math.max(-limiteDesktop/2, Math.min(limiteDesktop/2, moveY));
    }

    botao.style.transform = `translate(${moveX}px, ${moveY}px)`;
    
    setTimeout(() => {
        isMoving = false;
    }, 100);
}

// === EVENTOS PARA DESKTOP ===
botao.addEventListener("mouseover", function() {
    if (clickAttempts < 2 && Math.random() < 0.5) {
        moverBotao();
    }
});

botao.addEventListener("mouseenter", function() {
    if (clickAttempts < 2 && Math.random() < 0.4) {
        moverBotao();
    }
});

botao.addEventListener("mousedown", function() {
    if (clickAttempts < 3 && Math.random() < 0.6) {
        moverBotao();
    }
});

// === EVENTOS PARA MOBILE ===
let touchTimer;

botao.addEventListener("touchstart", function(event) {
    event.preventDefault(); 
    
    const chanceMovimento = clickAttempts < 3 ? 0.6 : 0.3; 
    if (Math.random() < chanceMovimento) {
        moverBotao();
    }
    
    touchTimer = setTimeout(() => {
        if (!isMoving) {
            moverBotao();
            console.log("🏃‍♂️ Botão fugiu - segurou muito tempo!");
        }
    }, 200);
});

botao.addEventListener("touchmove", function(event) {
    event.preventDefault(); 
    if (!isMoving && Math.random() < 0.3) {
        moverBotao();
    }
}); 

// === LÓGICA DE CLIQUES ===
let clickAttempts = 0;

function processarClique(event, tipo) {
    clickAttempts++;
    console.log(`🎯 ${tipo} ${clickAttempts} detectado!`);
    
    const isMobile = window.innerWidth <= 768;
    const tentativasNecessarias = isMobile ? 6 : 1; 
    
    if (clickAttempts <= tentativasNecessarias) {
        event.preventDefault();
        event.stopPropagation();
        moverBotao();
        
        botao.style.transform += ' scale(0.8)';
        setTimeout(() => {
            botao.style.transform = botao.style.transform.replace(' scale(0.8)', '');
        }, 200);
        
        console.log(`❌ Tentativa ${clickAttempts}/${tentativasNecessarias + 1} - Escapou! (${isMobile ? 'Mobile' : 'Desktop'})`);
        return false;
    } else {
        event.preventDefault();
        event.stopPropagation();
        console.log(`✅ Tentativa ${clickAttempts} - ABRINDO MODAL! (${isMobile ? 'Mobile' : 'Desktop'})`);
        
        const modal = document.getElementById('confirmModal');
        if (modal) {
            modal.style.display = 'block';
        }
        return false;
    }
}

botao.addEventListener("click", function(event) {
    processarClique(event, "Clique");
});

botao.addEventListener("touchend", function(event) {
    event.preventDefault();
    
    // Limpar timer de toque longo
    clearTimeout(touchTimer);
    
    if (navigator.vibrate) {
        navigator.vibrate(50); 
    }
    
    processarClique(event, "Touch");
});

// === EVENTOS EXTRAS ===
botao.addEventListener("contextmenu", function(event) {
    event.preventDefault();
    moverBotao();
    return false;
});

botao.addEventListener("focus", moverBotao);

// === PROXIMIDADE DO MOUSE ===
document.addEventListener("mousemove", function(event) {
    const rect = botao.getBoundingClientRect();
    const distance = Math.sqrt(
        Math.pow(event.clientX - (rect.left + rect.width/2), 2) + 
        Math.pow(event.clientY - (rect.top + rect.height/2), 2)
    );
    
    // Se muito perto, pode fugir
    if (distance < 30 && !isMoving && clickAttempts < 3 && Math.random() < 0.2) {
        moverBotao();
    }
});

// === PROXIMIDADE DO TOQUE ===
document.addEventListener("touchmove", function(event) {
    if (event.touches.length > 0) {
        const touch = event.touches[0];
        const rect = botao.getBoundingClientRect();
        const distance = Math.sqrt(
            Math.pow(touch.clientX - (rect.left + rect.width/2), 2) + 
            Math.pow(touch.clientY - (rect.top + rect.height/2), 2)
        );
        
        if (distance < 50 && !isMoving && clickAttempts < 3 && Math.random() < 0.3) {
            moverBotao();
        }
    }
});

// === FUNÇÕES DOS MODAIS ===
function closeModal() {
    document.getElementById('confirmModal').style.display = 'none';
    document.getElementById('sadModal').style.display = 'none';
}

// Função chamada pelo botão "NÃO 😤" do modal
function finalNao() {
    document.getElementById('confirmModal').style.display = 'none';
    document.getElementById('sadModal').style.display = 'block';
    
    // Fechar modal de tristeza automaticamente
    setTimeout(() => {
        closeModal();
    }, 4000);
}

// === FECHAR MODAIS CLICANDO FORA ===
window.onclick = function(event) {
    const confirmModal = document.getElementById('confirmModal');
    const sadModal = document.getElementById('sadModal');
    
    if (event.target === confirmModal || event.target === sadModal) {
        closeModal();
    }
} 