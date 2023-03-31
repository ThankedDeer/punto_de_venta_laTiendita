function Login(){
    console.log("empieza funcion")
    credenciales = {};
    credenciales.Nom_Vendedor = document.getElementById("user").value;
    credenciales.Contraseña = document.getElementById("pass").value;

    console.log(credenciales)

    axios
    .post("http://localhost:3000/api/login/"+credenciales)
    .then((response) => {
        console.log(response.data.token);
        sessionStorage.setItem("tToken", response.data.token);
        window.location.href = "./pages/menuPrincipal.html"; // Redirigir a otra página
    })
    .catch((error) => {
        console.log(error);
    });
}