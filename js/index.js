function login(){
    console.log("empieza funcion")
    credenciales = {};
    credenciales.Nom_Vendedor = document.getElementById("Nom_Vendedor").value;
    credenciales.Contraseña = document.getElementById("Contraseña").value;

    console.log( credenciales)

<<<<<<< HEAD
  axios.post('https://backtiendita-production-9419.up.railway.app/api/login',credenciales)
  .then((response)=>{
      console.log(response.data.token);
      sessionStorage.setItem("tToken", response.data.token);
      console.log("login success");
  })
  .catch((error)=>{
      alert("error");
      console.log(error);
  });
=======
    axios
    .post("https://backtiendita-production-9419.up.railway.app/api/login/" + credenciales)
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    });
>>>>>>> f16e66622b39c3e0168d9d1b66922066c0af6fa2
}