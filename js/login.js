const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const username = document.getElementById('user').value;
	const password = document.getElementById('pass').value;

	// Realice la solicitud POST al endpoint '/api/login' con los datos de inicio de sesión proporcionados por el usuario
	fetch('/api/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ username, password })
	})
	.then(response => response.json())
	.then(data => {
		// Si la solicitud es exitosa, el servidor devolverá un token JWT
		// Almacene el token en el almacenamiento local para usar en futuras solicitudes
		localStorage.setItem('token', data.token);

		// Redirigir al usuario a la página de publicaciones
		window.location.href = '/pagPrincipal.html';
	})
	.catch(error => {
		console.error('Error al iniciar sesión:', error);
	});
});