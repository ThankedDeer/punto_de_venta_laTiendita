function Login() {
    console.log("empieza funcion");
    const credenciales = {
      Nom_Vendedor: document.getElementById("user").value,
      Contraseña: document.getElementById("pass").value,
    };
  
    console.log(credenciales);
  
    axios
      .post("http://localhost:3000/api/login", credenciales)
      .then((response) => {
        console.log(response.data.token);
        localStorage.clear();
        localStorage.setItem("tToken", response.data.token);
        localStorage.setItem("vendedor", JSON.stringify(response.data.user));
        window.location.href = "./pages/menuPrincipal.html"; // Redirigir a otra página
      })
      .catch((error) => {
        console.log(error);
      });
  }
  