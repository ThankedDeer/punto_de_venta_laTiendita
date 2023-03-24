/* function login(){
    console.log("empieza funcion")
    credenciales = {};
    credenciales.Nom_Vendedor = document.getElementById("Nom_Vendedor").value;
    credenciales.Contraseña = document.getElementById("Contraseña").value;

    console.log( credenciales)


    axios
    .post("https://backtiendita-production-9419.up.railway.app/api/login/" + credenciales)
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    });
} */

function login() {
    console.log("empieza funcion");
    var Nom_Vendedor = document.getElementById("Nom_Vendedor").value;
    var Contraseña = document.getElementById("Contraseña").value;

    if (!Nom_Vendedor || !Contraseña) {
        console.log("Por favor, ingrese su nombre de usuario y contraseña.");
        return;
    }

    var credenciales = {
        Nom_Vendedor: Nom_Vendedor,
        Contraseña: Contraseña
    };

    fetch('https://backtiendita-production-9419.up.railway.app/api/login', {
        method: 'POST',
        body: JSON.stringify(credenciales),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');
    })
    .then((data) => {
        window.location.href = "./pages/menuPrincipal.html";
    })
    .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
    });
}