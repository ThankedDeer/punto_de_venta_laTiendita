function login(){
        credenciales ={};
        credenciales.email = document.getElementById("email").value;
        credenciales.password = document.getElementById("password").value;
        axios.post("https://backtiendita-production.up.railway.app/api/usuarios", credenciales)
        .then((response) => {
            console.log(response.data.token);
            sessionStorage.setItem("tToken", response.data.token);
            window.location.href="./pages/menuPrincipal.html";
        }).catch((error) => {
            alert("error");
            console.log(error);
        });
    }
