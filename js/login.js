const { default: axios } = require("axios");

const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('user');
const passwordInput = document.getElementById('pass');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', (event) => {
event.preventDefault();

const username = usernameInput.value;
const password = passwordInput.value;

  // Realizar la petición de inicio de sesión a la API
axios('/api/login', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
})
.then(response => {
    if (response.ok) {
      // Si la petición fue exitosa, obtener el token JWT y guardarlo en localStorage
    return response.json().then(data => {
        const token = data.token;
        localStorage.setItem('jwt', token);
        window.location.href = '/menuPrincipal.html'; // Redireccionar al dashboard
    });
    } else {
      // Si la petición no fue exitosa, mostrar un mensaje de error
    return response.json().then(data => {
        errorMessage.innerText = data.message;
    });
    }
})
.catch(error => {
    console.error('Error al realizar la petición:', error);
});
});