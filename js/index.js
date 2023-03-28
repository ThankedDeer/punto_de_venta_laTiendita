function login(){
    console.log("empieza funcion")
    credenciales = {};
    credenciales.Nom_Vendedor = document.getElementById("Nom_Vendedor").value;
    credenciales.Contraseña = document.getElementById("Contraseña").value;

    console.log(credenciales)

    axios
    .post("http://192.168.43.192:3000/api/api/login/"+ credenciales)
    .then((response) => {
        console.log(response);
        window.location.href = "./pages/menuPrincipal.html"; // Redirigir a otra página
    })
    .catch((error) => {
        console.log(error);
    });
}