const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const messagesDiv = document.getElementById('messages');

const ws = new WebSocket('ws://localhost:3000');//connexion au server websocket

//fonction d'ajout  de message
function appendMessage(text, className = '') {
    const p = document.createElement('p');
    p.textContent = text;
    if (className) {
        p.classList.add(className);
    }
    messagesDiv.appendChild(p);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; 
}

ws.onopen = (event) => {
    appendMessage('Connexion établie avec le serveur WebSocket.', 'system');
    console.log('WebSocket Open:', event);
};

ws.onmessage = (event) => {
    appendMessage(`Reçu: ${event.data}`, 'message-received');
    console.log('WebSocket Message:', event.data);
};

ws.onclose = (event) => {
    appendMessage('Connexion au serveur WebSocket fermée.', 'system');
    console.log('WebSocket Close:', event);
};

ws.onerror = (error) => {
    appendMessage(`Erreur WebSocket: ${error.message}`, 'error');
    console.error('WebSocket Error:', error);
};

const sendMessage = () => {
    const message = messageInput.value.trim();
    if (message) {
        ws.send(message); 
        appendMessage(`Envoyé: ${message}`, 'message-sent');
        messageInput.value = ''; 
    }
};
sendButton.addEventListener('click', sendMessage)

messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
