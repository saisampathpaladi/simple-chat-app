let users = {};
let currentUser = null;
let messages = [];

function loadJSON(file, callback) {
    let xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open("GET", file, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(JSON.parse(xhr.responseText));
        }
    };
    xhr.send(null);
}

function loadUsers() {
    loadJSON('users.json', function(data) {
        users = data;
    });
}

function loadMessages() {
    loadJSON('messages.json', function(data) {
        messages = data;
        displayMessages();
    });
}

function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if (users[username] && users[username] === password) {
        currentUser = username;
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('chat-container').style.display = 'block';
        loadMessages();
    } else {
        alert('Invalid login credentials');
    }
}

function logout() {
    currentUser = null;
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('chat-container').style.display = 'none';
}

function sendMessage() {
    let message = document.getElementById('message').value;
    if (message.trim()) {
        messages.push({ user: currentUser, text: message });
        document.getElementById('message').value = '';
        displayMessages();
    }
}

function displayMessages() {
    let chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = '';
    messages.forEach(msg => {
        let msgDiv = document.createElement('div');
        msgDiv.innerText = `${msg.user}: ${msg.text}`;
        chatBox.appendChild(msgDiv);
    });
}

// Initialize
loadUsers();
