function login(){
    console.log("empieza funcion")
    credenciales = {};
    credenciales.Nom_Vendedor = document.getElementById("Nom_Vendedor").value;
    credenciales.Contraseña = document.getElementById("Contraseña").value;

    console.log( credenciales)

  axios.post('https://backtiendita-production.up.railway.app//Login',credenciales)
  .then((response)=>{
      console.log(response.data.token);
      sessionStorage.setItem("tToken", response.data.token);
      console.log("login success");
  })
  .catch((error)=>{
      alert("error");
      console.log(error);
  });

}