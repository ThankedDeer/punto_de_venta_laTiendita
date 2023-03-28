function login(){
    console.log("empieza funcion")
    credenciales = {};
    credenciales.Nom_Vendedor = document.getElementById("Nom_Vendedor").value;
    credenciales.Contraseña = document.getElementById("Contraseña").value;

    console.log(credenciales)

    axios
    .post("https://backtiendita-production-9419.up.railway.app/api/login/"+ credenciales)
    .then((response) => {
        console.log(response);
        window.location.href = "./pages/menuPrincipal.html"; // Redirigir a otra página
    })
    .catch((error) => {
        console.log(error);
    });
}