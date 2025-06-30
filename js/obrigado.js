// === FUNÇÕES DE ANIMAÇÃO ===
function showAtt1() {
    document.querySelector('.att1').style.opacity = '1';
    document.querySelector('.att1').style.translate = '0';
}

function showAtt2() {
    document.querySelector('.att2').style.opacity = '1';
    document.querySelector('.att2').style.translate = '0';
}

function showAtt3() {
    document.querySelector('.att3').style.opacity = '1';
    document.querySelector('.att3').style.translate = '0';
}

function showAtt4() {
    document.querySelector('.att4').style.opacity = '1';
    document.querySelector('.att4').style.translate = '0';
}

function showUp1() {
    document.querySelector('.up1').style.opacity = '1';        
}

function showUp2() {
    document.querySelector('.up2').style.opacity = '1';        
}

function showUp3() {
    document.querySelector('.up3').style.opacity = '1';        
}

function showUp4() {
    document.querySelector('.up4').style.opacity = '1';        
}

// === ANIMAÇÃO PRINCIPAL ===
function animation() {
    document.querySelector('h1').style.opacity = 1;
    
    setTimeout(() => {
        document.querySelector('h2').style.opacity = 1;
    }, 300);
    
    setTimeout(() => {
        showAtt1();
    }, 500);

    setTimeout(() => {
        showAtt2();
    }, 1000);

    setTimeout(() => {
        showAtt3();
    }, 1500);

    setTimeout(() => {
        showAtt4();
    }, 2000);

    setTimeout(() => {
        showUp1();
    }, 3000);

    setTimeout(() => {
        showUp2();
    }, 4000);

    setTimeout(() => {
        showUp3();
    }, 5000);

    setTimeout(() => {
        showUp4();
    }, 6000);

    setTimeout(() => {
        document.querySelector('button').style.opacity = '1';
    }, 7000);
}

// === MODAL PIX ===
function openPixModal() {
    const modal = document.getElementById('pixModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closePixModal() {
    const modal = document.getElementById('pixModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function copyPixKey() {
    const pixKey = "21974829676";
    
    // Tentar copiar para área de transferência
    if (navigator.clipboard) {
        navigator.clipboard.writeText(pixKey).then(function() {
            alert('🎉 Chave PIX copiada! Cole no seu app de pagamento.');
        }).catch(function() {
            // Fallback se clipboard API não funcionar
            copyTextFallback(pixKey);
        });
    } else {
        // Fallback para navegadores mais antigos
        copyTextFallback(pixKey);
    }
}

function copyTextFallback(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        alert('🎉 Chave PIX copiada! Cole no seu app de pagamento.');
    } catch (err) {
        console.error('Erro ao copiar:', err);
        alert('❌ Não foi possível copiar automaticamente. Chave PIX: ' + text);
    }
    
    document.body.removeChild(textArea);
}

// === EVENTOS ===
// Fechar modal clicando fora
window.onclick = function(event) {
    const pixModal = document.getElementById('pixModal');
    if (event.target === pixModal) {
        closePixModal();
    }
}

// === INICIALIZAÇÃO ===
setTimeout(() => {
    animation();            
}, 100); 