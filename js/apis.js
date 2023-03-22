function login(){
        credenciales ={};
        credenciales.username = document.getElementById("user").value;
        credenciales.password = document.getElementById("pass").value;
        axios.post("backtiendita-production-9419.up.railway.app/api/usuarios", credenciales)
        .then((response) => {
            console.log(response.data.token);
            sessionStorage.setItem("tToken", response.data.token);
            window.location.href="./pages/menuPrincipal.html";
        }).catch((error) => {
            
            console.log(error);
        });
    }
    const loginBtn = document.getElementById('logear');
    loginBtn.addEventListener('click', login);