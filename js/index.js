function Login() {
    const credenciales = {
      Nom_Vendedor: document.getElementById("user").value,
      Contraseña: document.getElementById("pass").value,
    };
  axios.post("http://localhost:3000/api/login", credenciales).then((response) => {
        localStorage.setItem("tToken", response.data.token);
        localStorage.setItem("vendedor", JSON.stringify(response.data.user));
        window.location.href = "./pages/menuPrincipal.html";
      }).catch((error) => {
        console.log(error);
      });
  }