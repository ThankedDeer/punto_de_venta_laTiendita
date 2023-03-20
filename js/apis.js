function login(){
        credenciales ={};
        credenciales.username = document.getElementById("user").value;
        credenciales.password = document.getElementById("pass").value;
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
    const loginBtn = document.getElementById('logear');
    loginBtn.addEventListener('click', login);